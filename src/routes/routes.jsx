import { Navigate, createBrowserRouter } from "react-router-dom";

//Pages
import Login from "../pages/login/index.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import PageError from "../pages/error/index.jsx";

// Private routes
import PrivateRoute from "./privateRoutes.jsx";
import SalaPage from "../pages/salaPage/index.jsx";
import TurmaPage from "../pages/turmaPage/index.jsx";
import DashboardAdmin from "../pages/dashboardAdmin/index.jsx";
import AnuncioPage from "../pages/anuncio/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dashboard-admin",
    element: <PrivateRoute><DashboardAdmin /></PrivateRoute>
  },
  {
    path: "/atualizar-turmas",
    element: <PrivateRoute><TurmaPage /></PrivateRoute>
  },
  {
    path: "/atualizar-salas",
    element: <PrivateRoute><SalaPage /></PrivateRoute>
  },
  {
    path: "/atualizar-anuncio",
    element: <PrivateRoute><AnuncioPage /></PrivateRoute>
  },
  {
    path: "*",
    element: <PageError />
  }
]);

export default router;
