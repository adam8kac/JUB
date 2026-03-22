import { Routes, Route, Navigate } from 'react-router-dom'
import CVList from './pages/CVList'
import CVDetail from './pages/CVDetail'
import CVBuilder from './pages/CVBuilder'
import './index.css'

export default function CVApp() {
  return (
    <Routes>
      <Route path="/" element={<CVList />} />
      <Route path="/builder" element={<CVBuilder />} />
      <Route path="/:uid" element={<CVDetail />} />
      <Route path="*" element={<Navigate to="/cv" replace />} />
    </Routes>
  )
}
