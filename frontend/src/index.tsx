import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './context/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

//www.figma.com/file/yV0ktGUvoK3i7vuLPMSm18/Find-h-er?fuid=1303656757044373890&source=email_invite

root.render(
  <MantineProvider>
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </MantineProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
