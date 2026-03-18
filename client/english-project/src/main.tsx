import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserLevelProvider } from './context/UserLevelContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserLevelProvider>
      <App />
    </UserLevelProvider>
  </StrictMode>,
)
