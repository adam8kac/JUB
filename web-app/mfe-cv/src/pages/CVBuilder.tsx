import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiGet, apiPost, apiPatch, getApiBase } from '../api'
import type { CVData, CVExperience, CVEducation } from '../types'

const INITIAL_CV: CVData = {
  personalInfo: { firstName: '', lastName: '', email: '', phone: '', location: '', linkedIn: '', website: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
}

const EMPTY_EXP: CVExperience = { company: '', position: '', startDate: '', endDate: '', current: false, description: '' }
const EMPTY_EDU: CVEducation = { institution: '', degree: '', field: '', startDate: '', endDate: '', current: false }

type Tab = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'preview'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'personal', label: 'Osebni podatki', icon: '👤' },
  { id: 'summary', label: 'Povzetek', icon: '📝' },
  { id: 'experience', label: 'Izkušnje', icon: '💼' },
  { id: 'education', label: 'Izobrazba', icon: '🎓' },
  { id: 'skills', label: 'Veščine', icon: '⚡' },
  { id: 'preview', label: 'Predogled', icon: '👁️' },
]

export default function CVBuilder() {
  const navigate = useNavigate()
  const [cv, setCv] = useState<CVData>(INITIAL_CV)
  const [activeTab, setActiveTab] = useState<Tab>('personal')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [skillInput, setSkillInput] = useState('')
  const [isNew, setIsNew] = useState(false)

  const getUserFromStorage = () => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } }
  const user = getUserFromStorage()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const currentUser = getUserFromStorage()
    if (!currentUser || currentUser.role !== 'candidate') {
      navigate('/auth/login')
      return
    }
    const uid = currentUser.id
    apiGet(`/cv/${uid}`, true)
      .then(data => {
        setCv({
          uid: data.uid || uid,
          personalInfo: data.personalInfo || INITIAL_CV.personalInfo,
          summary: data.summary || '',
          experience: data.experience || [],
          education: data.education || [],
          skills: data.skills || [],
        })
        setIsNew(false)
        setLoading(false)
      })
      .catch(() => {
        setCv({ ...INITIAL_CV, uid: uid })
        setIsNew(true)
        setLoading(false)
      })
  }, [])

  const handleSave = useCallback(async () => {
    if (!user) return
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const uid = user.id
      if (isNew) {
        await apiPost(`/cv/save/${uid}`, cv, true)
        setIsNew(false)
      } else {
        await apiPatch(`/cv/${uid}`, cv, true)
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Napaka pri shranjevanju.')
    } finally {
      setSaving(false)
    }
  }, [cv, isNew, user])

  async function downloadPdf() {
    if (!user || !token) return
    try {
      const res = await fetch(`${getApiBase()}/cv/${user.id}/pdf`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `zivljenjepis-${user.id}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Napaka pri prenosu PDF.')
    }
  }

  function updatePersonal(field: keyof CVData['personalInfo'], value: string) {
    setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }))
  }

  function addExperience() {
    setCv(prev => ({ ...prev, experience: [...prev.experience, { ...EMPTY_EXP }] }))
  }

  function updateExperience(i: number, field: keyof CVExperience, value: string | boolean) {
    setCv(prev => {
      const exp = [...prev.experience]
      exp[i] = { ...exp[i], [field]: value }
      return { ...prev, experience: exp }
    })
  }

  function removeExperience(i: number) {
    setCv(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }))
  }

  function addEducation() {
    setCv(prev => ({ ...prev, education: [...prev.education, { ...EMPTY_EDU }] }))
  }

  function updateEducation(i: number, field: keyof CVEducation, value: string | boolean) {
    setCv(prev => {
      const edu = [...prev.education]
      edu[i] = { ...edu[i], [field]: value }
      return { ...prev, education: edu }
    })
  }

  function removeEducation(i: number) {
    setCv(prev => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }))
  }

  function addSkill() {
    const s = skillInput.trim()
    if (!s || cv.skills.includes(s)) return
    setCv(prev => ({ ...prev, skills: [...prev.skills, s] }))
    setSkillInput('')
  }

  function removeSkill(skill: string) {
    setCv(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Moj CV</h1>
          <p className="text-gray-500 text-sm mt-0.5">Urejajte in shranite vaš življenjepis</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Shranjeno
            </span>
          )}
          <button
            onClick={downloadPdf}
            className="btn-secondary gap-2 text-sm py-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Prenesi PDF
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary gap-2 text-sm py-2"
          >
            {saving ? (
              <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Shranjujem...</>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>Shrani</>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div className="flex gap-6">
        {/* Tabs sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'personal' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 text-lg mb-5">Osebni podatki</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Ime</label>
                  <input type="text" value={cv.personalInfo.firstName} onChange={e => updatePersonal('firstName', e.target.value)} className="input-field" placeholder="Jana" />
                </div>
                <div>
                  <label className="label">Priimek</label>
                  <input type="text" value={cv.personalInfo.lastName} onChange={e => updatePersonal('lastName', e.target.value)} className="input-field" placeholder="Novak" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input type="email" value={cv.personalInfo.email} onChange={e => updatePersonal('email', e.target.value)} className="input-field" placeholder="jana@primer.si" />
                </div>
                <div>
                  <label className="label">Telefon</label>
                  <input type="tel" value={cv.personalInfo.phone} onChange={e => updatePersonal('phone', e.target.value)} className="input-field" placeholder="+386 40 123 456" />
                </div>
                <div>
                  <label className="label">Lokacija</label>
                  <input type="text" value={cv.personalInfo.location} onChange={e => updatePersonal('location', e.target.value)} className="input-field" placeholder="Ljubljana, Slovenija" />
                </div>
                <div>
                  <label className="label">LinkedIn (neobvezno)</label>
                  <input type="url" value={cv.personalInfo.linkedIn || ''} onChange={e => updatePersonal('linkedIn', e.target.value)} className="input-field" placeholder="linkedin.com/in/..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Spletna stran (neobvezno)</label>
                  <input type="url" value={cv.personalInfo.website || ''} onChange={e => updatePersonal('website', e.target.value)} className="input-field" placeholder="https://moja-stran.si" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 text-lg mb-2">Povzetek / Profil</h2>
              <p className="text-sm text-gray-500 mb-4">Kratka predstavitev vaših kompetenc, ciljev in vrednosti, ki jih prinašate.</p>
              <textarea
                value={cv.summary}
                onChange={e => setCv(prev => ({ ...prev, summary: e.target.value }))}
                rows={8}
                className="input-field resize-none"
                placeholder="Sem izkušen razvijalec programske opreme z 5+ leti izkušenj v spletnem razvoju. Specializiran za React in Node.js. Iščem priložnost v dinamičnem okolju, kjer bom lahko reševal kompleksne tehnične izzive..."
              />
              <p className="mt-2 text-xs text-gray-400">{cv.summary.length} znakov</p>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              {cv.experience.map((exp, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Izkušnja #{i + 1}</h3>
                    <button
                      onClick={() => removeExperience(i)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Delovno mesto</label>
                      <input type="text" value={exp.position} onChange={e => updateExperience(i, 'position', e.target.value)} className="input-field" placeholder="Software Engineer" />
                    </div>
                    <div>
                      <label className="label">Podjetje</label>
                      <input type="text" value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} className="input-field" placeholder="Acme d.o.o." />
                    </div>
                    <div>
                      <label className="label">Začetek</label>
                      <input type="month" value={exp.startDate} onChange={e => updateExperience(i, 'startDate', e.target.value)} className="input-field" />
                    </div>
                    <div>
                      <label className="label">Konec</label>
                      <input type="month" value={exp.endDate} onChange={e => updateExperience(i, 'endDate', e.target.value)} className="input-field" disabled={exp.current} />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input type="checkbox" checked={exp.current} onChange={e => updateExperience(i, 'current', e.target.checked)} className="rounded text-indigo-600" />
                        <span className="text-sm text-gray-600">Trenutno delovno mesto</span>
                      </label>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Opis</label>
                      <textarea value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} rows={3} className="input-field resize-none" placeholder="Opišite vaše naloge in dosežke..." />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="w-full py-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Dodaj izkušnjo
              </button>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              {cv.education.map((edu, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Izobrazba #{i + 1}</h3>
                    <button onClick={() => removeEducation(i)} className="text-red-500 hover:text-red-700 p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="label">Izobraževalna ustanova</label>
                      <input type="text" value={edu.institution} onChange={e => updateEducation(i, 'institution', e.target.value)} className="input-field" placeholder="Univerza v Ljubljani" />
                    </div>
                    <div>
                      <label className="label">Stopnja izobrazbe</label>
                      <select value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} className="input-field">
                        <option value="">Izberi...</option>
                        <option>Srednja šola</option>
                        <option>Višja šola</option>
                        <option>Visoka šola (BSc)</option>
                        <option>Magistrska (MSc)</option>
                        <option>Doktorska (PhD)</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Smer / Področje</label>
                      <input type="text" value={edu.field} onChange={e => updateEducation(i, 'field', e.target.value)} className="input-field" placeholder="Računalništvo" />
                    </div>
                    <div>
                      <label className="label">Začetek</label>
                      <input type="month" value={edu.startDate} onChange={e => updateEducation(i, 'startDate', e.target.value)} className="input-field" />
                    </div>
                    <div>
                      <label className="label">Konec</label>
                      <input type="month" value={edu.endDate} onChange={e => updateEducation(i, 'endDate', e.target.value)} className="input-field" disabled={edu.current} />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input type="checkbox" checked={edu.current} onChange={e => updateEducation(i, 'current', e.target.checked)} className="rounded text-indigo-600" />
                        <span className="text-sm text-gray-600">Trenutno šolanje</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="w-full py-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Dodaj izobrazbo
              </button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 text-lg mb-2">Veščine in kompetence</h2>
              <p className="text-sm text-gray-500 mb-5">Dodajte vaše tehnične in mehke veščine.</p>

              <div className="flex gap-3 mb-5">
                <input
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="input-field"
                  placeholder="npr. React, Python, Komunikacija..."
                />
                <button onClick={addSkill} className="btn-primary flex-shrink-0">
                  Dodaj
                </button>
              </div>

              {cv.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {cv.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="text-indigo-400 hover:text-indigo-700">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">Zaenkrat ni dodanih veščin.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Preview header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 text-white">
                <h2 className="text-2xl font-bold">
                  {cv.personalInfo.firstName} {cv.personalInfo.lastName}
                </h2>
                <div className="flex flex-wrap gap-4 mt-3 text-indigo-100 text-sm">
                  {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
                  {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
                  {cv.personalInfo.location && <span>{cv.personalInfo.location}</span>}
                </div>
              </div>

              <div className="p-8 space-y-6">
                {cv.summary && (
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 pb-1 border-b border-gray-200">Povzetek</h3>
                    <p className="text-gray-600 leading-relaxed">{cv.summary}</p>
                  </div>
                )}

                {cv.skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-3 pb-1 border-b border-gray-200">Veščine</h3>
                    <div className="flex flex-wrap gap-2">
                      {cv.skills.map(s => (
                        <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {cv.experience.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-3 pb-1 border-b border-gray-200">Delovne izkušnje</h3>
                    <div className="space-y-4">
                      {cv.experience.map((exp, i) => (
                        <div key={i} className="pl-4 border-l-2 border-indigo-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-gray-900">{exp.position}</div>
                              <div className="text-indigo-600 text-sm font-medium">{exp.company}</div>
                            </div>
                            <span className="text-xs text-gray-400">{exp.startDate} – {exp.current ? 'Zdaj' : exp.endDate}</span>
                          </div>
                          {exp.description && <p className="text-gray-600 text-sm mt-1">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cv.education.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-3 pb-1 border-b border-gray-200">Izobrazba</h3>
                    <div className="space-y-3">
                      {cv.education.map((edu, i) => (
                        <div key={i} className="pl-4 border-l-2 border-green-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-gray-900">{edu.institution}</div>
                              <div className="text-green-700 text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>
                            </div>
                            <span className="text-xs text-gray-400">{edu.startDate} – {edu.current ? 'Zdaj' : edu.endDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
