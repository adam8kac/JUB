import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { apiGet, apiPost, apiDelete } from '../api'
import type { Job } from '../types'
import { getWorkTypeLabel, getExperienceLabel, getCategory } from '../types'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [applyError, setApplyError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState('')

  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()
  const isCandidate = user?.role === 'candidate'
  const isEmployer = user?.role === 'employer'
  const isOwner = isEmployer && job?.employerId === user?.id

  useEffect(() => {
    if (!id) return
    setLoading(true)
    apiGet(`/jobs/${id}`)
      .then(data => { setJob(data); setLoading(false) })
      .catch(() => { setError('Razpis ni bil najden.'); setLoading(false) })
  }, [id])

  async function handleApply() {
    if (!user) { navigate('/auth/login'); return }
    setApplying(true)
    setApplyError('')
    try {
      await apiPost('/requests', {
        receiverId: String(job?.employerId || ''),
        jobPostingId: Number(id),
        senderType: 'CANDIDATE',
        message,
      }, true)
      setApplied(true)
    } catch (err: unknown) {
      setApplyError(err instanceof Error ? err.message : 'Napaka pri pošiljanju prijave.')
    } finally {
      setApplying(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Ali ste prepričani, da želite izbrisati ta razpis?')) return
    setDeleting(true)
    try {
      await apiDelete(`/jobs/${id}`, true)
      navigate('/jobs')
    } catch {
      alert('Napaka pri brisanju razpisa.')
      setDeleting(false)
    }
  }

  function formatDate(dateStr?: string) {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
        <p className="text-gray-400">Nalagam razpis...</p>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{error || 'Razpis ni bil najden'}</h2>
        <Link to="/jobs" className="btn-primary mt-4">Nazaj na razpise</Link>
      </div>
    )
  }

  const workTypeColors: Record<string, string> = {
    'FULL_TIME': 'bg-green-100 text-green-700',
    'PART_TIME': 'bg-blue-100 text-blue-700',
    'CONTRACT': 'bg-purple-100 text-purple-700',
    'INTERNSHIP': 'bg-amber-100 text-amber-700',
  }
  const colorClass = workTypeColors[job.workType || ''] || 'bg-gray-100 text-gray-700'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/jobs" className="hover:text-indigo-600 transition-colors">Razpisi</Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium truncate">{job.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                <p className="text-indigo-600 font-semibold text-lg">{job.companyName || 'Podjetje'}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {job.workType && (
                <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${colorClass}`}>{getWorkTypeLabel(job.workType)}</span>
              )}
              {getCategory(job) && (
                <span className="text-sm px-3 py-1.5 rounded-full font-medium bg-indigo-50 text-indigo-700">{getCategory(job)}</span>
              )}
              {job.experienceLevel && (
                <span className="text-sm px-3 py-1.5 rounded-full font-medium bg-gray-100 text-gray-700">{getExperienceLabel(job.experienceLevel)}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Opis delovnega mesta</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Job info card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Podatki o razpisu</h3>
            <div className="space-y-3">
              {job.location && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Lokacija</div>
                    <div className="font-medium text-gray-900">{job.location}</div>
                  </div>
                </div>
              )}
              {(job.salaryMin || job.salaryMax) && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Plača</div>
                    <div className="font-semibold text-green-700">
                      {job.salaryMin && job.salaryMax
                        ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} €`
                        : job.salaryMin
                        ? `Od ${job.salaryMin.toLocaleString()} €`
                        : `Do ${job.salaryMax?.toLocaleString()} €`}
                    </div>
                  </div>
                </div>
              )}
              {job.createdAt && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Objavljeno</div>
                    <div className="font-medium text-gray-900">{formatDate(job.createdAt)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Apply / Edit */}
          {isCandidate && !applied && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Pošlji prijavo</h3>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                className="input-field mb-3 resize-none"
                placeholder="Kratko sporočilo delodajalcu (neobvezno)..."
              />
              {applyError && (
                <p className="text-sm text-red-600 mb-3">{applyError}</p>
              )}
              <button
                onClick={handleApply}
                disabled={applying}
                className="btn-primary w-full"
              >
                {applying ? 'Pošiljam...' : 'Pošlji prijavo'}
              </button>
            </div>
          )}

          {isCandidate && applied && (
            <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-semibold text-green-800">Prijava poslana!</div>
                  <div className="text-sm text-green-600">Delodajalec bo pregledal vašo prijavo.</div>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-6">
              <p className="text-sm text-indigo-700 mb-3">Prijavite se, da pošljete prijavo.</p>
              <Link to="/auth/login" className="btn-primary w-full text-sm">Prijava</Link>
            </div>
          )}

          {isOwner && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
              <h3 className="font-semibold text-gray-900 mb-1">Upravljanje razpisa</h3>
              <Link
                to={`/jobs/edit/${job.id}`}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Uredi razpis
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full py-2.5 px-6 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 border border-red-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {deleting ? 'Brišem...' : 'Izbriši razpis'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
