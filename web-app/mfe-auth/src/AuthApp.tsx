import { Routes, Route, Navigate } from 'react-router-dom'
import CandidateLogin from './pages/CandidateLogin'
import CandidateRegister from './pages/CandidateRegister'
import EmployerLogin from './pages/EmployerLogin'
import EmployerRegister from './pages/EmployerRegister'
import './index.css'

export default function AuthApp() {
  return (
    <Routes>
      <Route path="/login" element={<CandidateLogin />} />
      <Route path="/register" element={<CandidateRegister />} />
      <Route path="/employer/login" element={<EmployerLogin />} />
      <Route path="/employer/register" element={<EmployerRegister />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}
