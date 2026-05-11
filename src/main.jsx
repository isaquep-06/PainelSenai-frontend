import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { StyledToastContainer } from './styles/toastStyle.js'
import router from './routes/routes.jsx'
// GlobalStyle
import GlobalStyles from "./styles/globalStyle.js";
// Error Boundary
import GlobalErrorBoundary from './components/GlobalErrorBoundary.jsx';
// Intl Compatibility
import './utils/intlCompat.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <StyledToastContainer
        position="top-center"
        autoClose={2500}
        newestOnTop
        closeOnClick
      />
      <GlobalStyles />
      <RouterProvider router={router} />
    </GlobalErrorBoundary>
  </StrictMode>,
)