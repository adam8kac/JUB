import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiGet, apiPatch } from '../api'

interface Request {
  id: string
  jobId?: string
  jobTitle?: string
  candidateId?: string
  candidateName?: string
  employerId?: string
  employerName?: string
  message?: string
  status: 'pending' | 'accepted' | 'declined'
  type?: string
  createdAt?: string
  senderId?: string
  receiverId?: string
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'V obravnavi',
  accepted: 'Sprejeta',
  declined: 'Zavrnjena',
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  accepted: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-700',
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Danes'
  if (diff === 1) return 'Včeraj'
  if (diff < 7) return `Pred ${diff} dnevi`
  return d.toLocaleDateString('sl-SI')
}

export default function Inbox() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all')

  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    fetchInbox()
  }, [])

  async function fetchInbox() {
    setLoading(true)
    setError('')
    try {
      const data = await apiGet(`/inbox/${user.id}`, true)
      const raw: Request[] = Array.isArray(data) ? data : data.requests || data.inbox || []
      setRequests(raw.map(r => ({
        ...r,
        status: r.status ?? (
          (r as unknown as { isAccepted: boolean | null }).isAccepted === true ? 'accepted' :
          (r as unknown as { isAccepted: boolean | null }).isAccepted === false ? 'declined' :
          'pending'
        ),
      })))
    } catch {
      setError('Napaka pri nalaganju predalnika.')
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: 'accepted' | 'declined') {
    setUpdating(id)
    try {
      await apiPatch(`/requests/${id}`, { accepted: status === 'accepted' }, true)
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    } catch {
      alert('Napaka pri posodabljanju statusa.')
    } finally {
      setUpdating(null)
    }
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Predalnik</h1>
          <p className="text-gray-500 mt-0.5 text-sm">Prijave in sporočila</p>
        </div>
        <button
          onClick={fetchInbox}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Osveži
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-xl border border-gray-200 p-1.5 w-fit">
        {(['all', 'pending', 'accepted', 'declined'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f === 'all' ? 'Vsi' : STATUS_LABELS[f]}
            <span className={`ml-1.5 text-xs ${filter === f ? 'text-indigo-200' : 'text-gray-400'}`}>
              ({f === 'all' ? requests.length : requests.filter(r => r.status === f).length})
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-gray-700 mb-4">{error}</p>
          <button onClick={fetchInbox} className="btn-primary">Poskusi znova</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Predalnik je prazen</p>
          <p className="text-gray-400 text-sm mt-1">
            {user.role === 'candidate' ? 'Pošljite prijave na razpise, ki vas zanimajo.' : 'Ko prejmete prijave, bodo prikazane tukaj.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(req => (
            <div key={req.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {req.candidateName || req.employerName || `Pošiljatelj ${req.senderId?.slice(0, 8) || ''}`}
                    </div>
                    {req.jobTitle && (
                      <div className="text-sm text-indigo-600 font-medium">{req.jobTitle}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[req.status] || 'bg-gray-100 text-gray-600'}`}>
                    {STATUS_LABELS[req.status] || req.status}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(req.createdAt)}</span>
                </div>
              </div>

              {req.message && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{req.message}</p>
                </div>
              )}

              {req.status === 'pending' && req.receiverId === user.id && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(req.id, 'accepted')}
                    disabled={updating === req.id}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {updating === req.id ? 'Shranjujem...' : 'Sprejmi'}
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, 'declined')}
                    disabled={updating === req.id}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 border border-red-200 transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Zavrni
                  </button>
                </div>
              )}

              {req.status === 'accepted' && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prijava je bila sprejeta
                </div>
              )}

              {req.status === 'declined' && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prijava je bila zavrnjena
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
