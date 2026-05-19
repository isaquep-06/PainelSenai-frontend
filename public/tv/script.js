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
    reloadAt: Date.now() + RELOAD_INTERVAL,
    lastKnownLayout: "",
    lastMediaKey: "",
    lastUpdateText: "Aguardando dados...",
    offline: false,
    initialized: false,
  };

  var els = {
    currentDate: document.getElementById("currentDate"),
    currentTime: document.getElementById("currentTime"),
    modeBadge: document.getElementById("modeBadge"),
    apiStatus: document.getElementById("apiStatus"),
    statusMessage: document.getElementById("statusMessage"),
    drawerStatus: document.getElementById("drawerStatus"),
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
    renderTableRows([], els.tableBodyLeft);
    renderTableRows([], els.tableBodyRight);
    scheduleClock();
    scheduleTurnoCheck();
    scheduleReload();
    scheduleCountdown();
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
    els.qrCard.hidden = !hasRows || rows.length > 16;
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
    var node;

    clearTimeout(state.mediaTimer);

    if (!media) {
      state.lastMediaKey = "";
      els.mediaStage.innerHTML = "";
      els.mediaStage.appendChild(els.mediaEmpty);
      els.mediaEmpty.hidden = false;
      return;
    }

    if (state.lastMediaKey === mediaKey) {
      scheduleMediaAdvance(media);
      return;
    }

    state.lastMediaKey = mediaKey;
    els.mediaStage.innerHTML = "";
    els.mediaEmpty.hidden = true;

    if (media.type === "video") {
      node = document.createElement("video");
      node.autoplay = true;
      node.muted = true;
      node.playsInline = true;
      node.preload = "metadata";
      node.onended = advanceMedia;
      node.src = media.url;
    } else {
      node = document.createElement("img");
      node.alt = "anuncio";
      node.loading = "eager";
      node.decoding = "async";
      node.src = media.url;
      scheduleMediaAdvance(media);
    }

    els.mediaStage.appendChild(node);
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

  function updateReloadCountdown() {
    var remaining = Math.max(0, state.reloadAt - Date.now());
    var minutes = Math.floor(remaining / 60000);
    var seconds = Math.floor((remaining % 60000) / 1000);
    els.reloadCountdown.textContent =
      minutes + "m " + String(seconds).padStart(2, "0") + "s restantes";
  }

  async function reloadPageSafely() {
    cleanupTimers();

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

  init();
})();
