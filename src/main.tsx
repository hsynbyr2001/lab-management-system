import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>,
)
