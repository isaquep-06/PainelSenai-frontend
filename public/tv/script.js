(function () {
  "use strict";

  var API_BASE_URL =
    (window.__PAINEL_API_URL__ ||
      localStorage.getItem("PainelSenai:ApiUrl") ||
      "https://painelsenai-production.up.railway.app/").replace(/\/+$/, "");
  var POLL_INTERVAL = 10000;
  var RELOAD_INTERVAL = 30 * 60 * 1000;
  var IMAGE_ROTATION_INTERVAL = 30000;
  var RESIZE_BREAKPOINT = 1180;
  var GA_MEASUREMENT_ID =
    window.__PAINEL_GA_MEASUREMENT_ID__ || "G-GELPBKTEQS";
  var PRESENCE_HEARTBEAT_INTERVAL = 15000;
  var PRESENCE_TTL = 45000;
  var PRESENCE_STORAGE_KEY = "PainelSenai:tvPresence";

  var state = {
    turno: getCurrentTurno(),
    autoTurno: true,
    dashboardRows: [],
    salas: [],
    uploads: [],
    currentMediaIndex: 0,
    fetchInFlight: false,
    controller: null,
    pollTimer: 0,
    reloadTimer: 0,
    clockTimer: 0,
    turnoTimer: 0,
    countdownTimer: 0,
    mediaTimer: 0,
    resizeTimer: 0,
    presenceTimer: 0,
    reloadAt: Date.now() + RELOAD_INTERVAL,
    lastKnownLayout: "",
    lastMediaKey: "",
    mediaLoadToken: 0,
    lastUpdateText: "Aguardando dados...",
    sessionId: createSessionId(),
    activeViewers: 1,
    offline: false,
    initialized: false,
  };

  var els = {
    currentDate: document.getElementById("currentDate"),
    currentTime: document.getElementById("currentTime"),
    modeBadge: document.getElementById("modeBadge"),
    apiStatus: document.getElementById("apiStatus"),
    statusMessage: document.getElementById("statusMessage"),
    viewerCounter: document.getElementById("viewerCounter"),
    drawerStatus: document.getElementById("drawerStatus"),
    presenceText: document.getElementById("presenceText"),
    lastUpdateText: document.getElementById("lastUpdateText"),
    reloadCountdown: document.getElementById("reloadCountdown"),
    tablesArea: document.getElementById("tablesArea"),
    tableCardLeft: document.getElementById("tableCardLeft"),
    tableCardRight: document.getElementById("tableCardRight"),
    tableBodyLeft: document.getElementById("tableBodyLeft"),
    tableBodyRight: document.getElementById("tableBodyRight"),
    tableFallback: document.getElementById("tableFallback"),
    mediaStage: document.getElementById("mediaStage"),
    mediaEmpty: document.getElementById("mediaEmpty"),
    mediaImage: document.getElementById("mediaImage"),
    mediaVideo: document.getElementById("mediaVideo"),
    qrCard: document.getElementById("qrCard"),
    infoDrawer: document.getElementById("infoDrawer"),
    drawerOverlay: document.getElementById("drawerOverlay"),
    toggleInfo: document.getElementById("toggleInfo"),
    closeInfo: document.getElementById("closeInfo"),
    turnoButtons: document.querySelectorAll("[data-turno]"),
  };

  function init() {
    if (state.initialized) {
      return;
    }

    state.initialized = true;

    bindEvents();
    updateClock();
    renderMode();
    renderTurnoButtons();
    updateReloadCountdown();
    initializeAnalytics();
    trackTvPageView();
    updatePresence();
    renderTableRows([], els.tableBodyLeft);
    renderTableRows([], els.tableBodyRight);
    scheduleClock();
    scheduleTurnoCheck();
    scheduleReload();
    scheduleCountdown();
    schedulePresence();
    fetchCycle(true);
  }

  function bindEvents() {
    var i;

    for (i = 0; i < els.turnoButtons.length; i += 1) {
      els.turnoButtons[i].addEventListener("click", onTurnoClick, false);
    }

    els.toggleInfo.addEventListener("click", openDrawer, false);
    els.closeInfo.addEventListener("click", closeDrawer, false);
    els.drawerOverlay.addEventListener("click", closeDrawer, false);
    window.addEventListener("resize", onResize, false);
    window.addEventListener("error", onGlobalError, false);
    window.addEventListener("unhandledrejection", onUnhandledRejection, false);
    window.addEventListener("beforeunload", cleanupBeforeUnload, false);
    window.addEventListener("pagehide", cleanupPresence, false);
    window.addEventListener("storage", onPresenceStorageChange, false);
  }

  function onTurnoClick(event) {
    var turno = event.currentTarget.getAttribute("data-turno");

    if (!turno || turno === state.turno) {
      return;
    }

    state.autoTurno = false;
    state.turno = turno;
    renderMode();
    renderTurnoButtons();
    fetchCycle(true);
  }

  function onResize() {
    clearTimeout(state.resizeTimer);
    state.resizeTimer = window.setTimeout(function () {
      var layout = getLayoutMode();
      if (layout !== state.lastKnownLayout) {
        renderDashboard(state.dashboardRows);
      }
    }, 120);
  }

  function onGlobalError() {
    setOfflineState(true, "Erro inesperado. Tentando recuperar a tela...");
  }

  function onUnhandledRejection() {
    setOfflineState(true, "Falha inesperada na sincronizacao. Nova tentativa em breve.");
  }

  function openDrawer() {
    els.infoDrawer.classList.add("is-open");
    els.infoDrawer.setAttribute("aria-hidden", "false");
    els.drawerOverlay.hidden = false;
  }

  function closeDrawer() {
    els.infoDrawer.classList.remove("is-open");
    els.infoDrawer.setAttribute("aria-hidden", "true");
    els.drawerOverlay.hidden = true;
  }

  function scheduleClock() {
    clearInterval(state.clockTimer);
    state.clockTimer = window.setInterval(updateClock, 1000);
  }

  function scheduleTurnoCheck() {
    clearInterval(state.turnoTimer);
    state.turnoTimer = window.setInterval(function () {
      if (!state.autoTurno) {
        return;
      }

      var turnoAtual = getCurrentTurno();
      if (turnoAtual !== state.turno) {
        state.turno = turnoAtual;
        renderTurnoButtons();
        fetchCycle(true);
      }
    }, 60000);
  }

  function scheduleReload() {
    clearTimeout(state.reloadTimer);
    state.reloadAt = Date.now() + RELOAD_INTERVAL;
    state.reloadTimer = window.setTimeout(reloadPageSafely, RELOAD_INTERVAL);
  }

  function scheduleCountdown() {
    clearInterval(state.countdownTimer);
    state.countdownTimer = window.setInterval(updateReloadCountdown, 1000);
  }

  function schedulePolling() {
    clearTimeout(state.pollTimer);
    state.pollTimer = window.setTimeout(function () {
      fetchCycle(false);
    }, POLL_INTERVAL);
  }

  function schedulePresence() {
    clearInterval(state.presenceTimer);
    state.presenceTimer = window.setInterval(updatePresence, PRESENCE_HEARTBEAT_INTERVAL);
  }

  function fetchCycle(forceStatusMessage) {
    if (state.fetchInFlight) {
      return;
    }

    state.fetchInFlight = true;
    state.controller = typeof AbortController !== "undefined"
      ? new AbortController()
      : null;

    if (forceStatusMessage) {
      setStatusMessage("Sincronizando dados...");
    }

    Promise.allSettled([
      fetchJson("/dashboard?turno=" + encodeURIComponent(state.turno)),
      fetchJson("/sala"),
      fetchJson("/upload"),
      fetchJson("/dashboard/ultima-atualizacao"),
    ])
      .then(function (results) {
        var dashboardResult = results[0];
        var salasResult = results[1];
        var uploadsResult = results[2];
        var lastUpdateResult = results[3];
        var dashboardPayload = [];
        var hasDashboard = dashboardResult.status === "fulfilled";
        var salasPayload = [];

        if (salasResult.status === "fulfilled") {
          salasPayload = normalizeSalasPayload(salasResult.value);
          state.salas = salasPayload;
        }

        if (hasDashboard) {
          dashboardPayload = normalizeDashboardPayload(dashboardResult.value);
          state.dashboardRows = sortDashboardRows(
            enrichDashboardRows(dashboardPayload, state.salas)
          );
          renderDashboard(state.dashboardRows);
          setOfflineState(false, "Dados atualizados automaticamente a cada 10 segundos.");
        } else if (!state.dashboardRows.length) {
          renderDashboard([]);
          setOfflineState(true, "API indisponivel. Tentando reconectar sem recarregar a tela.");
        } else {
          setOfflineState(true, "API indisponivel. Mantendo os ultimos dados em tela.");
        }

        if (uploadsResult.status === "fulfilled") {
          state.uploads = normalizeUploadsPayload(uploadsResult.value);
          syncMediaIndex();
          renderMedia();
        }

        if (lastUpdateResult.status === "fulfilled") {
          state.lastUpdateText = formatLastUpdate(lastUpdateResult.value);
          els.lastUpdateText.textContent = state.lastUpdateText;
        }

        if (!hasDashboard && !state.lastUpdateText) {
          els.lastUpdateText.textContent = "Sem sincronizacao recente";
        }
      })
      .catch(function () {
        setOfflineState(true, "Falha inesperada na sincronizacao.");
      })
      .finally(function () {
        state.fetchInFlight = false;
        state.controller = null;
        schedulePolling();
      });
  }

  function fetchJson(path) {
    var headers = buildHeaders();

    return fetch(API_BASE_URL + path, {
      method: "GET",
      headers: headers,
      cache: "no-store",
      signal: state.controller ? state.controller.signal : undefined,
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      return response.json();
    });
  }

  function buildHeaders() {
    var headers = { Accept: "application/json" };
    var rawUser = localStorage.getItem("PainelSenai:DataUser");

    if (!rawUser) {
      return headers;
    }

    try {
      var parsed = JSON.parse(rawUser);
      if (parsed && parsed.token) {
        headers.Authorization = "Bearer " + parsed.token;
      }
    } catch (error) {
      return headers;
    }

    return headers;
  }

  function normalizeDashboardPayload(payload) {
    return Array.isArray(payload) ? payload : [];
  }

  function normalizeSalasPayload(payload) {
    return Array.isArray(payload) ? payload : [];
  }

  function normalizeUploadsPayload(payload) {
    var list = [];
    var i;
    var item;

    if (Array.isArray(payload)) {
      list = payload;
    } else if (payload && Array.isArray(payload.midias)) {
      list = payload.midias;
    }

    var normalized = [];
    for (i = 0; i < list.length; i += 1) {
      item = list[i];
      if (!item || typeof item !== "object") {
        continue;
      }

      normalized.push({
        id: item.id || item._id || String(i),
        type: item.type === "video" ? "video" : "image",
        url: item.url || item.src || "",
        active: item.active === true,
      });
    }

    return normalized.filter(function (entry) {
      return entry.active && entry.url;
    });
  }

  function enrichDashboardRows(rows, salas) {
    var salaMap = createSalaMap(salas);

    return rows.map(function (row) {
      var normalizedSalaName = normalizeText(row.sala);
      var matchedSala = salaMap[normalizedSalaName] || null;

      return {
        turma: row.turma,
        sala: row.sala,
        sala_type: normalizeSalaType(
          row.sala_type || row.type || (matchedSala && matchedSala.type)
        ),
      };
    });
  }

  function sortDashboardRows(rows) {
    var typePriority = {
      comum: 0,
      laboratorio: 1,
      especial: 2,
    };

    return rows.slice().sort(function (left, right) {
      var leftType = normalizeSalaType(left.sala_type);
      var rightType = normalizeSalaType(right.sala_type);
      var leftPriority = hasOwn(typePriority, leftType) ? typePriority[leftType] : 3;
      var rightPriority = hasOwn(typePriority, rightType) ? typePriority[rightType] : 3;
      var salaCompare;

      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }

      if (leftType === "comum" && rightType === "comum") {
        salaCompare = normalizeText(left.sala).localeCompare(
          normalizeText(right.sala),
          "pt-BR",
          { numeric: true }
        );
      } else {
        salaCompare = normalizeText(left.sala).localeCompare(
          normalizeText(right.sala),
          "pt-BR"
        );
      }

      if (salaCompare !== 0) {
        return salaCompare;
      }

      return normalizeText(left.turma).localeCompare(
        normalizeText(right.turma),
        "pt-BR",
        { numeric: true }
      );
    });
  }

  function createSalaMap(salas) {
    var map = {};
    var index;
    var sala;

    for (index = 0; index < salas.length; index += 1) {
      sala = salas[index];

      if (!sala || !sala.name) {
        continue;
      }

      map[normalizeText(sala.name)] = sala;
    }

    return map;
  }

  function normalizeSalaType(type) {
    var normalized = normalizeText(type);

    if (normalized === "laboratorio" || normalized === "laboratorios") {
      return "laboratorio";
    }

    if (normalized === "especial" || normalized === "especiais") {
      return "especial";
    }

    if (normalized === "comum" || normalized === "comuns") {
      return "comum";
    }

    return normalized || "comum";
  }

  function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  function renderDashboard(rows) {
    var layout = getLayoutMode();
    var splitIndex;
    var leftRows;
    var rightRows;

    state.lastKnownLayout = layout;
    els.tablesArea.classList.toggle("is-single", layout === "single");

    if (layout === "single") {
      leftRows = rows;
      rightRows = [];
    } else {
      splitIndex = Math.ceil(rows.length / 2);
      leftRows = rows.slice(0, splitIndex);
      rightRows = rows.slice(splitIndex);
    }

    renderTableRows(leftRows, els.tableBodyLeft);
    renderTableRows(rightRows, els.tableBodyRight);

    var hasRows = rows.length > 0;
    els.tableFallback.hidden = hasRows || !state.offline;
    toggleQrCard(hasRows && rows.length <= 16);
  }

  function renderTableRows(rows, tbody) {
    var existingRows = tbody.children;
    var index;
    var row;
    var tr;
    var turmaCell;
    var salaCell;

    for (index = existingRows.length - 1; index >= rows.length; index -= 1) {
      tbody.removeChild(existingRows[index]);
    }

    for (index = 0; index < rows.length; index += 1) {
      row = rows[index];
      tr = existingRows[index];

      if (!tr) {
        tr = document.createElement("tr");
        turmaCell = document.createElement("td");
        salaCell = document.createElement("td");
        tr.appendChild(turmaCell);
        tr.appendChild(salaCell);
        tbody.appendChild(tr);
      } else {
        turmaCell = tr.children[0];
        salaCell = tr.children[1];
      }

      updateCellText(turmaCell, row.turma || "--");
      updateCellText(salaCell, (row.sala || "--").trim().toUpperCase());
      tr.classList.toggle("is-highlight", index % 4 === 0);
    }
  }

  function updateCellText(cell, value) {
    if (cell.textContent !== value) {
      cell.textContent = value;
    }
  }

  function syncMediaIndex() {
    var activeMedia = state.uploads;
    var current = activeMedia[state.currentMediaIndex];
    var currentId = current ? current.id : null;
    var nextIndex;

    clearTimeout(state.mediaTimer);

    if (!activeMedia.length) {
      state.currentMediaIndex = 0;
      return;
    }

    if (!currentId) {
      state.currentMediaIndex = Math.min(state.currentMediaIndex, activeMedia.length - 1);
      return;
    }

    nextIndex = findIndexById(activeMedia, currentId);
    state.currentMediaIndex = nextIndex >= 0 ? nextIndex : 0;
  }

  function renderMedia() {
    var media = state.uploads[state.currentMediaIndex];
    var mediaKey = media ? media.id + ":" + media.type + ":" + media.url : "";

    clearTimeout(state.mediaTimer);

    if (!media) {
      state.lastMediaKey = "";
      showEmptyMedia();
      return;
    }

    if (state.lastMediaKey === mediaKey) {
      scheduleMediaAdvance(media);
      return;
    }

    state.lastMediaKey = mediaKey;

    if (media.type === "video") {
      showVideoMedia(media.url);
    } else {
      showImageMedia(media.url);
    }
  }

  function showEmptyMedia() {
    state.mediaLoadToken += 1;
    resetVideoNode();
    els.mediaImage.removeAttribute("src");
    els.mediaImage.classList.remove("is-visible");
    els.mediaVideo.classList.remove("is-visible");
    els.mediaEmpty.hidden = false;
  }

  function showImageMedia(url) {
    var token = state.mediaLoadToken + 1;
    var loader = new Image();

    state.mediaLoadToken = token;
    resetVideoNode();
    els.mediaVideo.classList.remove("is-visible");
    els.mediaEmpty.hidden = false;

    loader.decoding = "async";
    loader.onload = function () {
      if (token !== state.mediaLoadToken) {
        return;
      }

      els.mediaImage.src = url;
      els.mediaImage.classList.add("is-visible");
      els.mediaVideo.classList.remove("is-visible");
      els.mediaEmpty.hidden = true;
      scheduleMediaAdvance({ type: "image" });
    };
    loader.onerror = function () {
      if (token !== state.mediaLoadToken) {
        return;
      }

      showEmptyMedia();
    };
    loader.src = url;
  }

  function showVideoMedia(url) {
    state.mediaLoadToken += 1;
    els.mediaImage.classList.remove("is-visible");
    els.mediaImage.removeAttribute("src");
    els.mediaEmpty.hidden = false;

    resetVideoNode();
    els.mediaVideo.onloadeddata = function () {
      els.mediaVideo.classList.add("is-visible");
      els.mediaEmpty.hidden = true;
      safePlayVideo();
    };
    els.mediaVideo.onended = advanceMedia;
    els.mediaVideo.onerror = function () {
      advanceMedia();
    };
    els.mediaVideo.src = url;
    els.mediaVideo.load();
  }

  function scheduleMediaAdvance(media) {
    if (!media || media.type !== "image") {
      return;
    }

    state.mediaTimer = window.setTimeout(advanceMedia, IMAGE_ROTATION_INTERVAL);
  }

  function advanceMedia() {
    if (!state.uploads.length) {
      return;
    }

    state.currentMediaIndex = (state.currentMediaIndex + 1) % state.uploads.length;
    renderMedia();
  }

  function updateClock() {
    var now = new Date();
    els.currentDate.textContent = now.toLocaleDateString("pt-BR");
    els.currentTime.textContent = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function renderMode() {
    els.modeBadge.textContent = state.autoTurno ? "Turno automatico" : "Turno manual";
    els.modeBadge.classList.toggle("is-manual", !state.autoTurno);
  }

  function renderTurnoButtons() {
    var i;
    var button;
    var turno;

    for (i = 0; i < els.turnoButtons.length; i += 1) {
      button = els.turnoButtons[i];
      turno = button.getAttribute("data-turno");
      button.classList.toggle("is-active", turno === state.turno);
    }
  }

  function setOfflineState(isOffline, message) {
    state.offline = isOffline;
    els.apiStatus.textContent = isOffline ? "Offline" : "Online";
    els.apiStatus.classList.toggle("status-pill--offline", isOffline);
    els.apiStatus.classList.toggle("status-pill--online", !isOffline);
    els.drawerStatus.textContent = isOffline ? "API offline" : "API online";
    setStatusMessage(message);
    els.tableFallback.hidden = state.dashboardRows.length > 0 || !isOffline;
  }

  function setStatusMessage(message) {
    if (message) {
      els.statusMessage.textContent = message;
    }
  }

  function updatePresence() {
    var registry = prunePresenceRegistry(readPresenceRegistry());

    upsertPresenceEntry(registry, {
      id: state.sessionId,
      ts: Date.now(),
      path: window.location.pathname,
    });

    writePresenceRegistry(registry);
    renderPresence(registry.length);
  }

  function onPresenceStorageChange(event) {
    if (event.key && event.key !== PRESENCE_STORAGE_KEY) {
      return;
    }

    renderPresence(prunePresenceRegistry(readPresenceRegistry()).length || 1);
  }

  function cleanupPresence() {
    var registry = readPresenceRegistry().filter(function (entry) {
      return entry && entry.id && entry.id !== state.sessionId;
    });

    writePresenceRegistry(prunePresenceRegistry(registry));
  }

  function renderPresence(count) {
    var safeCount = Math.max(1, count || 1);

    state.activeViewers = safeCount;
    els.viewerCounter.textContent = "Acessos ativos: " + safeCount;
    els.presenceText.textContent = "Acessos ativos nesta origem: " + safeCount;
  }

  function updateReloadCountdown() {
    var remaining = Math.max(0, state.reloadAt - Date.now());
    var minutes = Math.floor(remaining / 60000);
    var seconds = Math.floor((remaining % 60000) / 1000);
    els.reloadCountdown.textContent =
      minutes + "m " + String(seconds).padStart(2, "0") + "s restantes";
  }

  function initializeAnalytics() {
    if (typeof window === "undefined") {
      return;
    }

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    if (typeof window.gtag !== "function") {
      window.gtag = function gtagFallback() {
        window.dataLayer.push(arguments);
      };
      devLog("gtag indisponivel; fallback local ativado");
    }

    if (!window.__PAINEL_GA_CONFIGURED__) {
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
        transport_type: "beacon",
      });
      window.__PAINEL_GA_CONFIGURED__ = true;
    }
  }

  function trackTvPageView() {
    var pagePath = window.location.pathname + window.location.search + window.location.hash;
    var eventKey = pagePath + "|" + document.title + "|" + window.location.href;

    if (window.__PAINEL_TV_LAST_GA_PAGE_VIEW__ === eventKey) {
      devLog("page_view duplicado ignorado", eventKey);
      return;
    }

    if (typeof window.gtag !== "function") {
      devLog("page_view ignorado; gtag nao carregado");
      return;
    }

    window.__PAINEL_TV_LAST_GA_PAGE_VIEW__ = eventKey;
    window.gtag("event", "page_view", {
      page_title: document.title || "Painel SENAI TV",
      page_path: pagePath,
      page_location: window.location.href,
    });
    devLog("page_view enviado", { page_path: pagePath });
  }

  async function reloadPageSafely() {
    cleanupTimers();
    cleanupPresence();

    if (state.controller) {
      state.controller.abort();
      state.controller = null;
    }

    // Fecha vídeos corretamente
    clearMediaNode();

    // Fecha drawer
    closeDrawer();

    // Limpa localStorage
    try {
      localStorage.clear();
    } catch (error) { }

    // Limpa sessionStorage
    try {
      sessionStorage.clear();
    } catch (error) { }

    // Limpa Cache API
    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();


        await Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );

        console.log("✅ Cache API limpa");
      }


    } catch (error) {
      console.warn("Erro ao limpar Cache API", error);
    }

    // Remove service workers
    try {
      if ("serviceWorker" in navigator) {
        const registrations =
          await navigator.serviceWorker.getRegistrations();


        await Promise.all(
          registrations.map((registration) =>
            registration.unregister()
          )
        );

        console.log("✅ Service Workers removidos");
      }


    } catch (error) {
      console.warn("Erro ao remover service workers", error);
    }

    // Pequena pausa para liberar memória
    setTimeout(() => {
      // Hard reload anti-cache
      window.location.href =
        window.location.pathname +
        "?tv-refresh=" +
        Date.now();
    }, 1500);
  }


  function cleanupBeforeUnload() {
    cleanupTimers();
    cleanupPresence();

    if (state.controller) {
      state.controller.abort();
    }
  }

  function cleanupTimers() {
    clearTimeout(state.pollTimer);
    clearTimeout(state.reloadTimer);
    clearTimeout(state.mediaTimer);
    clearTimeout(state.resizeTimer);
    clearInterval(state.clockTimer);
    clearInterval(state.turnoTimer);
    clearInterval(state.countdownTimer);
    clearInterval(state.presenceTimer);
  }

  function clearMediaNode() {
    var node = els.mediaStage.querySelector("video, img");
    if (node && node.tagName === "VIDEO") {
      node.pause();
      node.removeAttribute("src");
      node.load();
    }
    els.mediaStage.innerHTML = "";
  }

  function getLayoutMode() {
    return window.innerWidth <= RESIZE_BREAKPOINT ? "single" : "dual";
  }

  function getCurrentTurno() {
    var hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return "matutino";
    }
    if (hour >= 12 && hour < 18) {
      return "vespertino";
    }
    return "noturno";
  }

  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[-_/]/g, " ")
      .replace(/\b0+(\d+)\b/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  function formatLastUpdate(payload) {
    if (!payload || typeof payload !== "object") {
      return "Ainda nao houve nenhuma alteracao publicada no sistema.";
    }

    var raw = payload.timestamp || payload.updated_at || payload.updatedAt;
    var parsed = raw ? new Date(raw) : null;

    if (parsed && !isNaN(parsed.getTime())) {
      return "Atualizado em " + parsed.toLocaleDateString("pt-BR") +
        " as " + parsed.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
    }

    if (payload.data || payload.horario) {
      return "Atualizado em " + (payload.data || "--") + " as " + (payload.horario || "--");
    }

    return "Ainda nao houve nenhuma alteracao publicada no sistema.";
  }

  function findIndexById(list, id) {
    var index;
    for (index = 0; index < list.length; index += 1) {
      if (list[index].id === id) {
        return index;
      }
    }
    return -1;
  }

  function readPresenceRegistry() {
    try {
      var raw = localStorage.getItem(PRESENCE_STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writePresenceRegistry(registry) {
    try {
      localStorage.setItem(PRESENCE_STORAGE_KEY, JSON.stringify(registry));
    } catch (error) { }
  }

  function prunePresenceRegistry(registry) {
    var now = Date.now();

    return registry.filter(function (entry) {
      return entry && entry.id && typeof entry.ts === "number" && now - entry.ts <= PRESENCE_TTL;
    });
  }

  function upsertPresenceEntry(registry, entry) {
    var index;

    for (index = 0; index < registry.length; index += 1) {
      if (registry[index] && registry[index].id === entry.id) {
        registry[index] = entry;
        return;
      }
    }

    registry.push(entry);
  }

  function createSessionId() {
    return "tv-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function devLog(message, payload) {
    var isDevHost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!isDevHost) {
      return;
    }

    if (payload !== undefined) {
      console.info("[GA4 TV] " + message, payload);
      return;
    }

    console.info("[GA4 TV] " + message);
  }

  init();
})();
