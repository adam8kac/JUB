import { Routes, Route, Navigate } from 'react-router-dom'
import JobsList from './pages/JobsList'
import JobDetail from './pages/JobDetail'
import JobForm from './pages/JobForm'
import './index.css'

export default function JobsApp() {
  return (
    <Routes>
      <Route path="/" element={<JobsList />} />
      <Route path="/new" element={<JobForm />} />
      <Route path="/edit/:id" element={<JobForm />} />
      <Route path="/:id" element={<JobDetail />} />
      <Route path="*" element={<Navigate to="/jobs" replace />} />
    </Routes>
  )
}
