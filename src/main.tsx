import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import ThemeProvider from '@sw-app/providers/theme-provider'
import { RoutesProvider } from '@sw-app/providers/route-provider'
import store from '@sw-app/stores/redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RoutesProvider />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
