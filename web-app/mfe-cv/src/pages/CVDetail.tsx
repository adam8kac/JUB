import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiGet, getApiBase } from '../api'
import type { CVData } from '../types'

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <h2 className="font-semibold text-gray-900 text-lg">{title}</h2>
      </div>
      {children}
    </div>
  )
}

export default function CVDetail() {
  const { uid } = useParams<{ uid: string }>()
  const [cv, setCv] = useState<CVData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!uid) return
    apiGet(`/cvs/${uid}`, true)
      .then(data => { setCv(data); setLoading(false) })
      .catch(() => { setError('CV ni bil najden.'); setLoading(false) })
  }, [uid])

  async function downloadPdf() {
    if (!uid || !token) return
    try {
      const res = await fetch(`${getApiBase()}/cv/${uid}/pdf`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Napaka pri prenosu PDF.')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cv-${uid}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Napaka pri prenosu PDF.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
      </div>
    )
  }

  if (error || !cv) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-700 font-medium mb-4">{error || 'CV ni bil najden'}</p>
        <Link to="/cv" className="btn-primary">Nazaj na CVje</Link>
      </div>
    )
  }

  const { personalInfo, summary, experience, education, skills } = cv
  const fullName = personalInfo ? `${personalInfo.firstName} ${personalInfo.lastName}`.trim() : 'Kandidat'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/cv" className="hover:text-indigo-600">CVji</Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{fullName}</span>
      </nav>

      {/* Profile header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white mb-6 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-white">
              {fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{fullName}</h1>
            <div className="flex flex-wrap gap-4 text-indigo-100 text-sm mt-2">
              {personalInfo?.email && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {personalInfo.email}
                </span>
              )}
              {personalInfo?.phone && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo?.location && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {personalInfo.location}
                </span>
              )}
            </div>
          </div>
          {user && (
            <button
              onClick={downloadPdf}
              className="flex-shrink-0 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Summary */}
        {summary && (
          <Section
            title="Povzetek"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          >
            <p className="text-gray-600 leading-relaxed">{summary}</p>
          </Section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <Section
            title="Veščine"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
          >
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <Section
            title="Delovne izkušnje"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          >
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-5 border-l-2 border-indigo-200">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-indigo-400 rounded-full"></div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-indigo-600 font-medium text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {exp.startDate} – {exp.current ? 'Zdaj' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <Section
            title="Izobrazba"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
          >
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="relative pl-5 border-l-2 border-green-200">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                      <p className="text-green-700 text-sm font-medium">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {edu.startDate} – {edu.current ? 'Zdaj' : edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* Contact CTA */}
      {user?.role === 'employer' && (
        <div className="mt-8 bg-indigo-50 rounded-2xl border border-indigo-200 p-6 text-center">
          <p className="text-indigo-700 font-medium mb-3">Zainteresirani za tega kandidata?</p>
          <Link
            to="/hub/inbox"
            className="btn-primary"
          >
            Pošlji povabilo
          </Link>
        </div>
      )}
    </div>
  )
}
