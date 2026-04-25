import { createBrowserRouter } from "react-router-dom";

//Pages
import Login from "../pages/login/index.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import PageError from "../pages/error/index.jsx";

// Private routes
import PrivateRoute from "./privateRoutes.jsx";
import SalaPage from "../pages/salaPage/index.jsx";
import TurmaPage from "../pages/turmaPage/index.jsx";
import DashboardAdmin from "../pages/dashboardAdmin/index.jsx";
import Anucio from "../pages/Anucio/index.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/dashboard',
    element:
      <Dashboard />
  },
  {
    path: '/not-found',
    element: <PageError />
  },
  {
    path: '/dashboardAdmin',
    element: <PrivateRoute><DashboardAdmin /></PrivateRoute>
  },
  {
    path: '/atualizar-turmas',
    element: <PrivateRoute><TurmaPage /></PrivateRoute>
  },
  {
    path: '/atualizar-salas',
    element: <PrivateRoute><SalaPage /></PrivateRoute>
  },
  {
    path: '/atualizar-anucio',
    element: <PrivateRoute><Anucio /></PrivateRoute>
  }
])

export default router;