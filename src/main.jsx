import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { StyledToastContainer } from './styles/toastStyle.js'
import router from './routes/routes.jsx'
// GlovalSyle
import GlobalStyles from "./styles/globalStyle.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledToastContainer
      position="bottom-center"
      closeOnClick
      pauseOnHover
      draggable />
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>,
)