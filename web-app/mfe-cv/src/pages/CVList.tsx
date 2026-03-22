import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../api'
import type { PublicCV } from '../types'

function CVCard({ cv }: { cv: PublicCV }) {
  const name = cv.name ||
    (cv.personalInfo?.firstName && cv.personalInfo?.lastName
      ? `${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`
      : cv.personalInfo?.firstName || 'Anonimni kandidat')

  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const skills = cv.skills?.slice(0, 4) || []

  return (
    <Link
      to={`/cv/${cv.uid}`}
      className="card p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200 block group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors">
          <span className="text-indigo-700 font-bold text-sm">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">{name}</h3>
          {cv.personalInfo?.location && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {cv.personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {cv.summary && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{cv.summary}</p>
      )}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skills.map(skill => (
            <span key={skill} className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">
              {skill}
            </span>
          ))}
          {(cv.skills?.length || 0) > 4 && (
            <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
              +{(cv.skills?.length || 0) - 4} več
            </span>
          )}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {cv.experience?.length || 0} izkušenj
        </span>
        <span className="text-sm text-indigo-600 font-medium group-hover:underline">Preglej →</span>
      </div>
    </Link>
  )
}

export default function CVList() {
  const [cvs, setCvs] = useState<PublicCV[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    apiGet('/cvs', !!localStorage.getItem('token'))
      .then(data => {
        setCvs(Array.isArray(data) ? data : data.cvs || [])
        setLoading(false)
      })
      .catch(() => {
        setError('Napaka pri nalaganju CVjev.')
        setLoading(false)
      })
  }, [])

  const filtered = search
    ? cvs.filter(cv => {
        const name = cv.name || `${cv.personalInfo?.firstName || ''} ${cv.personalInfo?.lastName || ''}`.trim()
        const skillsText = (cv.skills || []).join(' ')
        const q = search.toLowerCase()
        return name.toLowerCase().includes(q) || skillsText.toLowerCase().includes(q) || (cv.summary || '').toLowerCase().includes(q)
      })
    : cvs

  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Življenjepisi</h1>
          <p className="text-gray-500 mt-1">
            {loading ? 'Nalagam...' : `${filtered.length} CVjev`}
          </p>
        </div>
        {user?.role === 'candidate' && (
          <Link to="/cv/builder" className="btn-primary gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Moj CV
          </Link>
        )}
      </div>

      <div className="relative mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Iščite po imenu, veščinah..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
          <p className="text-gray-400 text-sm">Nalagam CVje...</p>
        </div>
      ) : error ? (
        <div className="text-center py-24">
          <p className="text-gray-700 font-medium">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold text-lg mb-2">Ni najdenih CVjev</p>
          <p className="text-gray-500 text-sm">Poskusite z drugačnim iskalniam pogojem.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(cv => (
            <CVCard key={cv.uid} cv={cv} />
          ))}
        </div>
      )}
    </div>
  )
}
