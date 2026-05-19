import { useEffect } from "react";
import {
  useLocation,
} from "react-router-dom";
import {
  initAnalytics,
  trackPageView,
} from "../services/analytics.js";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      trackPageView({
        page_title: document.title || "Painel SENAI",
        page_path:
          `${location.pathname}${location.search}${location.hash}`,
        page_location: window.location.href,
      });
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [location.hash, location.pathname, location.search]);

  return null;
}

export default AnalyticsTracker;
