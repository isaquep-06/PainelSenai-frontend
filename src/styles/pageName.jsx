import { useEffect } from "react";

const APP_NAME = "Senai";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${APP_NAME} | ${title}`
      : APP_NAME;
  }, [title]);
}
