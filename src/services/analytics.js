const GA_MEASUREMENT_ID =
  window.__PAINEL_GA_MEASUREMENT_ID__ || "G-GELPBKTEQS";

const isDev =
  Boolean(import.meta.env.DEV);

let isInitialized = false;
let lastPageViewKey = "";
let lastPageViewAt = 0;

function devLog(message, payload) {
  if (!isDev) {
    return;
  }

  if (payload !== undefined) {
    console.info(`[GA4] ${message}`, payload);
    return;
  }

  console.info(`[GA4] ${message}`);
}

function getSafeGtag() {
  if (typeof window === "undefined") {
    return null;
  }

  if (typeof window.gtag === "function") {
    return window.gtag;
  }

  return null;
}

export function initAnalytics() {
  if (typeof window === "undefined") {
    return false;
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

  if (isInitialized) {
    return true;
  }

  if (!window.__PAINEL_GA_CONFIGURED__) {
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      transport_type: "beacon",
    });
    window.__PAINEL_GA_CONFIGURED__ = true;
  }

  isInitialized = true;
  devLog("analytics inicializado", { measurementId: GA_MEASUREMENT_ID });
  return true;
}

export function trackPageView({
  page_title,
  page_path,
  page_location,
}) {
  initAnalytics();

  const gtag = getSafeGtag();

  if (!gtag) {
    devLog("page_view ignorado; gtag nao carregado");
    return false;
  }

  const payload = {
    page_title,
    page_path,
    page_location,
  };

  const eventKey = `${page_path}|${page_title}|${page_location}`;
  const now = Date.now();

  if (
    lastPageViewKey === eventKey &&
    now - lastPageViewAt < 1000
  ) {
    devLog("page_view duplicado ignorado", payload);
    return false;
  }

  lastPageViewKey = eventKey;
  lastPageViewAt = now;

  gtag("event", "page_view", payload);
  devLog("page_view enviado", payload);
  return true;
}

export { GA_MEASUREMENT_ID };
