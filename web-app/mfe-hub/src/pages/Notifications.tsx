import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../api'

interface Notification {
  id: string
  message: string
  type?: string
  read?: boolean
  createdAt?: string
  data?: Record<string, unknown>
}

function formatDate(dateStr?: string) {
  if (!dateStr) return 'Pravkar'
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'Pravkar'
  if (diffMin < 60) return `Pred ${diffMin} min`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24) return `Pred ${diffH}h`
  return d.toLocaleDateString('sl-SI')
}

const TYPE_ICONS: Record<string, string> = {
  application: '📨',
  accepted: '✅',
  declined: '❌',
  new_job: '💼',
  message: '💬',
  default: '🔔',
}

const TYPE_COLORS: Record<string, string> = {
  application: 'border-blue-200 bg-blue-50',
  accepted: 'border-green-200 bg-green-50',
  declined: 'border-red-200 bg-red-50',
  new_job: 'border-indigo-200 bg-indigo-50',
  message: 'border-purple-200 bg-purple-50',
  default: 'border-gray-200 bg-gray-50',
}

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')
  const esRef = useRef<EventSource | null>(null)
  const token = localStorage.getItem('token')

  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
      return
    }

    connectSSE()

    return () => {
      esRef.current?.close()
    }
  }, [])

  function connectSSE() {
    if (esRef.current) {
      esRef.current.close()
    }

    setError('')
    const url = `${API_BASE}/notifications/stream/${user.id}${token ? `?token=${token}` : ''}`

    try {
      const es = new EventSource(url)
      esRef.current = es

      es.onopen = () => {
        setConnected(true)
        setError('')
      }

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'ping' || data.type === 'connected') return
          const notification: Notification = {
            id: data.id || Date.now().toString(),
            message: data.message || data.text || JSON.stringify(data),
            type: data.type,
            read: false,
            createdAt: data.createdAt || new Date().toISOString(),
            data,
          }
          setNotifications(prev => [notification, ...prev].slice(0, 50))
        } catch {
          // Non-JSON or ping message
        }
      }

      es.addEventListener('notification', (event) => {
        try {
          const data = JSON.parse(event.data)
          const notification: Notification = {
            id: data.id || Date.now().toString(),
            message: data.message || data.text || 'Novo obvestilo',
            type: data.type || 'default',
            read: false,
            createdAt: new Date().toISOString(),
          }
          setNotifications(prev => [notification, ...prev].slice(0, 50))
        } catch {
          // ignore
        }
      })

      es.onerror = () => {
        setConnected(false)
        setError('Povezava prekinjena. Poskušam znova...')
        es.close()
        // Reconnect after 5 seconds
        setTimeout(connectSSE, 5000)
      }
    } catch (err) {
      setError('Napaka pri vzpostavljanju SSE povezave.')
    }
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function clearAll() {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Obvestila
            {unreadCount > 0 && (
              <span className="text-sm px-2.5 py-1 bg-indigo-600 text-white rounded-full font-normal">
                {unreadCount} novih
              </span>
            )}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <p className="text-sm text-gray-500">
              {connected ? 'Povezan v realnem času' : 'Ni povezave'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <>
              <button
                onClick={markAllRead}
                className="text-sm text-gray-500 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all"
              >
                Označi kot prebrane
              </button>
              <button
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
              >
                Počisti
              </button>
            </>
          )}
          <button
            onClick={connectSSE}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Poveži
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-amber-700 text-sm">{error}</p>
        </div>
      )}

      {/* SSE Connection info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${connected ? 'bg-green-100' : 'bg-gray-100'}`}>
            <svg className={`w-6 h-6 ${connected ? 'text-green-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {connected ? 'Aktivna SSE povezava' : 'Vzpostavljam SSE povezavo...'}
            </div>
            <div className="text-sm text-gray-500">
              Posluša: /notifications/stream/{user.id}
            </div>
          </div>
          <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {connected ? 'Aktivno' : 'Ni povezave'}
          </div>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            {connected && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            )}
          </div>
          <h3 className="font-semibold text-gray-700 text-lg mb-2">Ni novih obvestil</h3>
          <p className="text-gray-400 text-sm">
            {connected
              ? 'Čakam na nova obvestila v realnem času...'
              : 'Vzpostavljam povezavo s strežnikom...'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notif => {
            const icon = TYPE_ICONS[notif.type || 'default'] || TYPE_ICONS.default
            const colorClass = TYPE_COLORS[notif.type || 'default'] || TYPE_COLORS.default
            return (
              <div
                key={notif.id}
                className={`rounded-xl border p-5 transition-all ${colorClass} ${!notif.read ? 'shadow-sm' : 'opacity-70'}`}
                onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-gray-800 font-medium leading-snug">{notif.message}</p>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-1.5"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-500">{formatDate(notif.createdAt)}</span>
                      {notif.type && notif.type !== 'default' && (
                        <span className="text-xs text-gray-400 capitalize">{notif.type}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
