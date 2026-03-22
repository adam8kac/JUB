import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Inbox from './pages/Inbox'
import Notifications from './pages/Notifications'
import './index.css'

export default function HubApp() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/" element={<Navigate to="/hub/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/hub/dashboard" replace />} />
    </Routes>
  )
}
