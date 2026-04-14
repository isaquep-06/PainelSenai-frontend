import { createBrowserRouter } from "react-router-dom";

//Pages
import Login from "../pages/login/index.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import AtualizarDados from "../pages/telaAtualizarDados/index.jsx";

// Private routes
import PrivateRoute from "./privateRoutes.jsx";
import PageError from "../pages/error/index.jsx";

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
    path: '/atualizar-sistema',
    element: <PrivateRoute><AtualizarDados /></PrivateRoute>
  }
])

export default router;