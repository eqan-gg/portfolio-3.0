import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
<ToastContainer
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  toastClassName="dev-toast"
  bodyClassName="dev-toast-body"
  progressClassName="dev-toast-progress"
  transition={Bounce}
  icon={false}
/>
  </StrictMode>,
)
