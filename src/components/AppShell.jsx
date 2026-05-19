import { Outlet } from "react-router-dom";
import AnalyticsTracker from "./AnalyticsTracker.jsx";

function AppShell() {
  return (
    <>
      <AnalyticsTracker />
      <Outlet />
    </>
  );
}

export default AppShell;
