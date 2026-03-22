import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiGet } from '../api'

interface Job {
  id: string
  title: string
  location?: string
  workType?: string
  createdAt?: string
}

interface PublicCV {
  uid: string
  name?: string
  personalInfo?: { firstName?: string; lastName?: string; location?: string }
  skills?: string[]
}

export default function Dashboard() {
  const navigate = useNavigate()
  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()
  const [recentJobs, setRecentJobs] = useState<Job[]>([])
  const [recentCVs, setRecentCVs] = useState<PublicCV[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
      return
    }

    const fetchData = async () => {
      try {
        if (user.role === 'candidate') {
          const jobs = await apiGet('/jobs')
          setRecentJobs((Array.isArray(jobs) ? jobs : jobs.jobs || []).slice(0, 4))
        } else if (user.role === 'employer') {
          const [jobs, cvs] = await Promise.allSettled([
            apiGet('/jobs'),
            apiGet('/cvs', true),
          ])
          if (jobs.status === 'fulfilled') {
            const allJobs = Array.isArray(jobs.value) ? jobs.value : jobs.value.jobs || []
            setRecentJobs(allJobs.filter((j: Job) => j).slice(0, 4))
          }
          if (cvs.status === 'fulfilled') {
            setRecentCVs((Array.isArray(cvs.value) ? cvs.value : cvs.value.cvs || []).slice(0, 4))
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (!user) return null

  const isCandidate = user.role === 'candidate'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Dobro jutro' : hour < 18 ? 'Dober dan' : 'Dober večer'

  const quickLinks = isCandidate ? [
    { to: '/jobs', label: 'Preglej razpise', icon: '🔍', desc: 'Iščite delo po kategorijah' },
    { to: '/cv/builder', label: 'Uredi CV', icon: '📝', desc: 'Posodobite vaš življenjepis' },
    { to: '/hub/inbox', label: 'Predalnik', icon: '📬', desc: 'Sporočila in povabila' },
    { to: '/hub/notifications', label: 'Obvestila', icon: '🔔', desc: 'Novosti v realnem času' },
  ] : [
    { to: '/jobs/new', label: 'Nov razpis', icon: '➕', desc: 'Objavite prosto delovno mesto' },
    { to: '/cv', label: 'Preglej CVje', icon: '📋', desc: 'Brskajte po kandidatih' },
    { to: '/hub/inbox', label: 'Predalnik', icon: '📬', desc: 'Upravljajte prijave' },
    { to: '/hub/notifications', label: 'Obvestila', icon: '🔔', desc: 'Novosti v realnem času' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-1">{greeting},</p>
            <h1 className="text-3xl font-bold mb-2">
              {user.name || user.email}
            </h1>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                isCandidate ? 'bg-green-500/20 text-green-200' : 'bg-amber-500/20 text-amber-200'
              }`}>
                <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                {isCandidate ? 'Kandidat' : 'Delodajalec'}
              </span>
            </div>
          </div>
          <div className="hidden lg:block w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-4xl">
            {isCandidate ? '👤' : '🏢'}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 group"
          >
            <div className="text-2xl mb-3">{link.icon}</div>
            <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">{link.label}</div>
            <div className="text-xs text-gray-400">{link.desc}</div>
          </Link>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {isCandidate ? 'Najnovejši razpisi' : 'Razpisi na platformi'}
              </h2>
              <Link to="/jobs" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Vsi razpisi →
              </Link>
            </div>
            {recentJobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-400 text-sm">Ni razpisov za prikaz.</p>
                {!isCandidate && (
                  <Link to="/jobs/new" className="btn-primary mt-4 text-sm py-2">Objavi prvi razpis</Link>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map(job => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm hover:border-indigo-200 transition-all"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location || 'Lokacija ni določena'}</div>
                    </div>
                    {job.workType && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex-shrink-0">{job.workType}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CVs / My profile */}
          <div>
            {isCandidate ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Moj profil</h2>
                  <Link to="/cv/builder" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Uredi →
                  </Link>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <span className="text-indigo-700 font-bold text-lg">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{user.name || 'Vaše ime'}</div>
                      <div className="text-gray-500 text-sm">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to="/cv/builder"
                      className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-indigo-700">Uredi življenjepis</span>
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      to="/hub/inbox"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">Preglej predalnik</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      to="/hub/notifications"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">Obvestila v realnem času</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Najnovejši CVji</h2>
                  <Link to="/cv" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Vsi CVji →
                  </Link>
                </div>
                {recentCVs.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <p className="text-gray-400 text-sm">Ni CVjev za prikaz.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentCVs.map(cv => {
                      const name = cv.name || `${cv.personalInfo?.firstName || ''} ${cv.personalInfo?.lastName || ''}`.trim() || 'Anonimni kandidat'
                      return (
                        <Link
                          key={cv.uid}
                          to={`/cv/${cv.uid}`}
                          className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm hover:border-indigo-200 transition-all"
                        >
                          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-indigo-700 font-bold text-sm">
                              {name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{name}</div>
                            <div className="text-sm text-gray-500">
                              {cv.personalInfo?.location || cv.skills?.slice(0, 2).join(', ') || 'Kandidat'}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
