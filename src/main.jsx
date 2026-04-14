import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import router from './routes/routes.jsx'
// GlovalSyle
import GlobalStyles from "./styles/globalStyle.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position='bottom-right' />
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>,
)