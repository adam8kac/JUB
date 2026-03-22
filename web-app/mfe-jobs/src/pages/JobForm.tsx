import { useState, useEffect, FormEvent } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { apiGet, apiPost, apiPut } from '../api'
import type { JobFormData } from '../types'

const CATEGORIES = ['Tehnologija', 'Finance', 'Marketing', 'Pravo', 'Zdravstvo', 'Izobraževanje', 'Logistika', 'Gostinstvo', 'Drugo']
const WORK_TYPES = ['Polni delovni čas', 'Skrajšani delovni čas', 'Projektno delo', 'Pripravništvo', 'Prostovoljstvo']
const EXPERIENCE_LEVELS = ['Brez izkušenj', 'Junior', 'Mid-level', 'Senior', 'Vodstveni položaj']

const INITIAL_FORM: JobFormData = {
  title: '',
  description: '',
  jobCategory: "IT",
  workType: 'Polni delovni čas',
  location: '',
  experienceLevel: 'Junior',
  salaryMin: '',
  salaryMax: '',
}

export default function JobForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = !!id

  const [form, setForm] = useState<JobFormData>(INITIAL_FORM)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()

  useEffect(() => {
    const currentUser = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()
    if (!currentUser || currentUser.role !== 'employer') {
      navigate('/auth/employer/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isEdit) return
    apiGet(`/jobs/${id}`)
      .then(data => {
        setForm({
          title: data.title || '',
          description: data.description || '',
          jobCategory: data.jobCategory || data.category || "IT",
          workType: data.workType || 'Polni delovni čas',
          location: data.location || '',
          experienceLevel: data.experienceLevel || 'Junior',
          salaryMin: data.salaryMin?.toString() || '',
          salaryMax: data.salaryMax?.toString() || '',
        })
        setLoading(false)
      })
      .catch(() => {
        setError('Razpis ni bil najden.')
        setLoading(false)
      })
  }, [id, isEdit])

  function update(field: keyof JobFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) { setError('Naslov je obvezen.'); return }
    if (!form.description.trim()) { setError('Opis je obvezen.'); return }
    if (!form.location.trim()) { setError('Lokacija je obvezna.'); return }

    setSaving(true)
    setError('')
    try {
      const payload = {
        title: form.title,
        description: form.description,
        jobCategory: form.jobCategory,
        workType: form.workType,
        location: form.location,
        experienceLevel: form.experienceLevel,
        salaryMin: form.salaryMin ? parseInt(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? parseInt(form.salaryMax) : undefined,
        employerId: user?.id,
      }

      if (isEdit) {
        await apiPut(`/jobs/${id}`, payload, true)
        navigate(`/jobs/${id}`)
      } else {
        const created = await apiPost('/jobs', payload, true)
        navigate(`/jobs/${created.id || ''}`)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Napaka pri shranjevanju.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/jobs" className="hover:text-indigo-600">Razpisi</Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{isEdit ? 'Uredi razpis' : 'Nov razpis'}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEdit ? 'Uredi razpis' : 'Objavi nov razpis'}
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Naziv delovnega mesta *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => update('title', e.target.value)}
              className="input-field"
              placeholder="npr. Senior Software Engineer"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Kategorija *</label>
              <select value={form.jobCategory} onChange={e => update("jobCategory", e.target.value)} className="input-field">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Vrsta dela *</label>
              <select value={form.workType} onChange={e => update('workType', e.target.value)} className="input-field">
                {WORK_TYPES.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Lokacija *</label>
              <input
                type="text"
                value={form.location}
                onChange={e => update('location', e.target.value)}
                className="input-field"
                placeholder="npr. Ljubljana / Delo od doma"
                required
              />
            </div>
            <div>
              <label className="label">Zahtevane izkušnje *</label>
              <select value={form.experienceLevel} onChange={e => update('experienceLevel', e.target.value)} className="input-field">
                {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Min. plača (€/mesec)</label>
              <input
                type="number"
                value={form.salaryMin}
                onChange={e => update('salaryMin', e.target.value)}
                className="input-field"
                placeholder="npr. 2000"
                min="0"
              />
            </div>
            <div>
              <label className="label">Max. plača (€/mesec)</label>
              <input
                type="number"
                value={form.salaryMax}
                onChange={e => update('salaryMax', e.target.value)}
                className="input-field"
                placeholder="npr. 3500"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="label">Opis delovnega mesta *</label>
            <textarea
              value={form.description}
              onChange={e => update('description', e.target.value)}
              rows={10}
              className="input-field resize-none"
              placeholder="Opišite delovno mesto, zahteve, naloge, prednosti zaposlitve pri vas..."
              required
            />
            <p className="mt-1.5 text-xs text-gray-400">{form.description.length} znakov</p>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 py-3">
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Shranjujem...
                </span>
              ) : isEdit ? 'Shrani spremembe' : 'Objavi razpis'}
            </button>
            <Link to={isEdit ? `/jobs/${id}` : '/jobs'} className="btn-secondary flex-1 py-3 text-center">
              Prekliči
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
