import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './css/globals.css'
import App from './App.tsx'
import Spinner from './views/admin/spinner/Spinner.tsx'
import { AuthProvider } from './middleware/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </AuthProvider>
)