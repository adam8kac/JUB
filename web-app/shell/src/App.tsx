import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import Landing from './pages/Landing'
import { ErrorBoundary } from './components/ErrorBoundary'

const AuthApp = React.lazy(() => import('mfe_auth/AuthApp'))
const JobsApp = React.lazy(() => import('mfe_jobs/JobsApp'))
const CVApp = React.lazy(() => import('mfe_cv/CVApp'))
const HubApp = React.lazy(() => import('mfe_hub/HubApp'))

function MFEWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/auth/*"
                element={
                  <MFEWrapper>
                    <AuthApp />
                  </MFEWrapper>
                }
              />
              <Route
                path="/jobs/*"
                element={
                  <MFEWrapper>
                    <JobsApp />
                  </MFEWrapper>
                }
              />
              <Route
                path="/cv/*"
                element={
                  <MFEWrapper>
                    <CVApp />
                  </MFEWrapper>
                }
              />
              <Route
                path="/hub/*"
                element={
                  <MFEWrapper>
                    <HubApp />
                  </MFEWrapper>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
