import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { UserLevelProvider } from './context/UserLevelContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserLevelProvider>
        <App />
      </UserLevelProvider>
    </Provider>
  </StrictMode>,
)
