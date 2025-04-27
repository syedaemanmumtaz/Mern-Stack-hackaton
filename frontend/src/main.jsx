import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { TaskProvider } from './contexts/TaskContext.jsx';
// import { AuthProvider } from './contexts/AuthContext.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { TaskProvider } from './contexts/TaskContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>,
)