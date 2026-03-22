import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiPost } from '../api'

export default function EmployerRegister() {
  const navigate = useNavigate()
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function validate() {
    if (!companyRegistrationNumber.trim()) return 'Vnesite davčno/matično številko podjetja.'
    if (!email.includes('@')) return 'Prosimo vnesite veljaven email.'
    if (password.length < 6) return 'Geslo mora imeti vsaj 6 znakov.'
    if (password !== confirmPassword) return 'Gesli se ne ujemata.'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const validationError = validate()
    if (validationError) { setError(validationError); return }
    setLoading(true)
    try {
      const data = await apiPost('/employer/register', { companyRegistrationNumber, email, password })
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken)
        if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
        const userInfo = { id: data.id || data.userId || '', email, role: 'employer' as const, name: data.companyName || email }
        localStorage.setItem('user', JSON.stringify(userInfo))
        window.dispatchEvent(new Event('auth-change'))
        navigate('/hub/dashboard')
      } else if (data.id || data.userId) {
        navigate('/auth/employer/login')
      } else {
        setError('Registracija ni uspela.')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Napaka pri registraciji.'
      setError(msg.includes('{') ? 'Napaka pri registraciji. Email morda že obstaja.' : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-4">
            <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Registracija podjetja</h1>
          <p className="text-gray-500 mt-1">Začnite iskati talente danes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Davčna/matična številka podjetja</label>
              <input
                type="text"
                value={companyRegistrationNumber}
                onChange={e => setCompanyRegistrationNumber(e.target.value)}
                className="input-field"
                placeholder="npr. SI12345678"
                required
              />
              <p className="mt-1.5 text-xs text-gray-400">Vnesite davčno številko vašega podjetja</p>
            </div>

            <div>
              <label className="label">Email naslov podjetja</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="info@podjetje.si"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="label">Geslo</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Vsaj 6 znakov"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="label">Potrdi geslo</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`input-field ${confirmPassword && confirmPassword !== password ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="Ponovi geslo"
                autoComplete="new-password"
                required
              />
              {confirmPassword && confirmPassword !== password && (
                <p className="mt-1.5 text-xs text-red-600">Gesli se ne ujemata</p>
              )}
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-xs text-amber-700">
                Z registracijo se strinjate s pogoji uporabe platforme JUB Jobs. Vaši podatki bodo varno shranjeni.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registriram...
                </span>
              ) : 'Registracija podjetja'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center space-y-3">
          <p className="text-gray-600 text-sm">
            Že imate račun?{' '}
            <Link to="/auth/employer/login" className="text-amber-600 font-medium hover:text-amber-700">
              Prijavite se
            </Link>
          </p>
          <p className="text-gray-500 text-sm">
            Iščete zaposlitev?{' '}
            <Link to="/auth/register" className="text-indigo-600 font-medium hover:text-indigo-700">
              Registracija za kandidate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
