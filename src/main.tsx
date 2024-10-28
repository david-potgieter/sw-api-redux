import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import ThemeProvider from './providers/theme-provider'
import { RoutesProvider } from './providers/route-provider'

import store from './stores/redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RoutesProvider />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
