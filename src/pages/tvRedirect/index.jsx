import { useEffect } from "react";

function TvRedirect() {
  useEffect(() => {
    window.location.replace("/tv/index.html");
  }, []);

  return null;
}

export default TvRedirect;
