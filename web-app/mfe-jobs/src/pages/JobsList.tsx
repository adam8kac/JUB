import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiGet } from '../api'
import type { Job } from '../types'
import { getWorkTypeLabel, getExperienceLabel, getCategory } from '../types'

const CATEGORIES = ['', 'IT', 'Finance', 'Marketing', 'Law', 'Healthcare', 'Education', 'Logistics', 'Hospitality', 'Other']
const WORK_TYPES = [
  { value: '', label: 'Vse vrste' },
  { value: 'FULL_TIME', label: 'Polni delovni čas' },
  { value: 'PART_TIME', label: 'Skrajšani delovni čas' },
  { value: 'CONTRACT', label: 'Projektno delo' },
  { value: 'INTERNSHIP', label: 'Pripravništvo' },
]
const EXPERIENCE_LEVELS = [
  { value: '', label: 'Vse ravni' },
  { value: 'ENTRY', label: 'Brez izkušenj' },
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'MID', label: 'Mid-level' },
  { value: 'SENIOR', label: 'Senior' },
  { value: 'LEAD', label: 'Vodstveni položaj' },
]

function JobCard({ job }: { job: Job }) {
  const workTypeColors: Record<string, string> = {
    'FULL_TIME': 'bg-green-100 text-green-700',
    'PART_TIME': 'bg-blue-100 text-blue-700',
    'CONTRACT': 'bg-purple-100 text-purple-700',
    'INTERNSHIP': 'bg-amber-100 text-amber-700',
  }
  const colorClass = workTypeColors[job.workType || ''] || 'bg-gray-100 text-gray-700'

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

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="card p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200 block group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${colorClass}`}>
          {getWorkTypeLabel(job.workType)}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1 text-lg leading-tight">
        {job.title}
      </h3>
      <p className="text-sm text-indigo-600 font-medium mb-3">
        {job.companyName || 'Podjetje'}
      </p>

      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
        {job.location && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
        )}
        {job.experienceLevel && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            {getExperienceLabel(job.experienceLevel)}
          </span>
        )}
        {getCategory(job) && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {getCategory(job)}
          </span>
        )}
      </div>

      {(job.salaryMin || job.salaryMax) && (
        <div className="mb-3">
          <span className="text-sm font-semibold text-gray-900">
            {job.salaryMin && job.salaryMax
              ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} €/mesec`
              : job.salaryMin
              ? `Od ${job.salaryMin.toLocaleString()} €/mesec`
              : `Do ${job.salaryMax?.toLocaleString()} €/mesec`}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{formatDate(job.createdAt)}</span>
        <span className="text-sm text-indigo-600 font-medium group-hover:underline">Več →</span>
      </div>
    </Link>
  )
}

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [workType, setWorkType] = useState(searchParams.get('workType') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [experienceLevel, setExperienceLevel] = useState(searchParams.get('experienceLevel') || '')
  const [searchText, setSearchText] = useState('')

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      if (workType) params.set('workType', workType)
      if (location) params.set('location', location)
      if (experienceLevel) params.set('experienceLevel', experienceLevel)
      const query = params.toString()
      const data = await apiGet(`/jobs${query ? '?' + query : ''}`)
      setJobs(Array.isArray(data) ? data : data.jobs || [])
    } catch (err: unknown) {
      setError('Napaka pri nalaganju razpisov.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [category, workType, location, experienceLevel])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  useEffect(() => {
    const params: Record<string, string> = {}
    if (category) params.category = category
    if (workType) params.workType = workType
    if (location) params.location = location
    if (experienceLevel) params.experienceLevel = experienceLevel
    setSearchParams(params)
  }, [category, workType, location, experienceLevel, setSearchParams])

  const filteredJobs = searchText
    ? jobs.filter(j =>
        j.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (j.companyName || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (j.description || '').toLowerCase().includes(searchText.toLowerCase())
      )
    : jobs

  function clearFilters() {
    setCategory('')
    setWorkType('')
    setLocation('')
    setExperienceLevel('')
    setSearchText('')
  }

  const hasFilters = category || workType || location || experienceLevel || searchText
  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Razpisi za zaposlitev</h1>
          <p className="text-gray-500 mt-1">{loading ? 'Nalagam...' : `${filteredJobs.length} razpisov`}</p>
        </div>
        {user?.role === 'employer' && (
          <Link to="/jobs/new" className="btn-primary gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nov razpis
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Iščite po naslovu, podjetju ali opisu..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="label text-xs uppercase tracking-wide text-gray-400">Kategorija</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c || 'Vse kategorije'}</option>
              ))}
            </select>

          </div>
          <div>
            <label className="label text-xs uppercase tracking-wide text-gray-400">Vrsta dela</label>
            <select
              value={workType}
              onChange={e => setWorkType(e.target.value)}
              className="input-field"
            >
              {WORK_TYPES.map(w => (
                <option key={w.value} value={w.value}>{w.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label text-xs uppercase tracking-wide text-gray-400">Lokacija</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="npr. Ljubljana"
              className="input-field"
            />
          </div>
          <div>
            <label className="label text-xs uppercase tracking-wide text-gray-400">Izkušnje</label>
            <select
              value={experienceLevel}
              onChange={e => setExperienceLevel(e.target.value)}
              className="input-field"
            >
              {EXPERIENCE_LEVELS.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>
        {hasFilters && (
          <div className="mt-3 flex items-center justify-end">
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Počisti filtre
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
          <p className="text-gray-400 text-sm">Nalagam razpise...</p>
        </div>
      ) : error ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-700 font-medium mb-2">{error}</p>
          <button onClick={fetchJobs} className="btn-primary mt-4">Poskusi znova</button>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold text-lg mb-2">Ni najdenih razpisov</p>
          <p className="text-gray-500 text-sm mb-4">Poskusite z drugimi filtri ali iskalnima pogoji.</p>
          {hasFilters && (
            <button onClick={clearFilters} className="btn-secondary">Počisti filtre</button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
