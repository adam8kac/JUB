import { Link } from 'react-router-dom'

const stats = [
  { label: 'Aktivnih razpisov', value: '1,200+' },
  { label: 'Registriranih kandidatov', value: '8,500+' },
  { label: 'Delodajalcev', value: '340+' },
  { label: 'Uspešnih zaposlitev', value: '2,100+' },
]

const candidateFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Iščite razpise',
    desc: 'Filtrirajte po kategoriji, lokaciji, vrsti dela in izkušnjah.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Ustvarite CV',
    desc: 'Profesionalen življenjepis z možnostjo izvoza v PDF.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Obvestila v realnem času',
    desc: 'Bodite med prvimi obveščeni o novih priložnostih.',
  },
]

const employerFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    title: 'Objavljajte razpise',
    desc: 'Hitro in enostavno objavite prostá delovna mesta.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Pregledujte CVje',
    desc: 'Dostop do baze kandidatov in njihovih življenjepisov.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Komunikacija',
    desc: 'Pošiljajte povabila in upravljajte prijave iz enega mesta.',
  },
]

const categories = [
  { name: 'Tehnologija', count: 234, icon: '💻' },
  { name: 'Finance', count: 87, icon: '📊' },
  { name: 'Marketing', count: 112, icon: '📣' },
  { name: 'Pravo', count: 45, icon: '⚖️' },
  { name: 'Zdravstvo', count: 98, icon: '🏥' },
  { name: 'Izobraževanje', count: 67, icon: '📚' },
]

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              1,200+ aktivnih razpisov
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Najdi svojo naslednjo{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                priložnost
              </span>
            </h1>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
              Povežite se z najboljšimi delodajalci v Sloveniji.
              Ustvarite profesionalen CV, iščite razpise in začnite novo poglavje vaše kariere danes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Išči delo
              </Link>
              <Link
                to="/auth/employer/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Objavi razpis
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Poiščite delo po kategorijah</h2>
            <p className="text-gray-500 text-lg">Izberite področje, ki vas zanima</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="bg-white rounded-xl p-5 text-center hover:shadow-md hover:border-indigo-200 border border-gray-200 transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-gray-900 group-hover:text-indigo-600 text-sm mb-1 transition-colors">{cat.name}</div>
                <div className="text-xs text-gray-400">{cat.count} razpisov</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features - two columns */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For candidates */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Za kandidate
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Vaša kariera se začne tukaj</h2>
              <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                Ustvarite izstopajočo kandidaturo in se povežite z delodajalci, ki iščejo prav vas.
              </p>
              <div className="space-y-6 mb-8">
                {candidateFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{f.title}</div>
                      <div className="text-gray-500 text-sm">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link to="/auth/register" className="btn-primary">
                  Registriraj se brezplačno
                </Link>
                <Link to="/jobs" className="btn-secondary">
                  Preglej razpise
                </Link>
              </div>
            </div>

            {/* For employers */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Za delodajalce
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Najdite idealne kandidate</h2>
              <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                Dostopajte do bazena talentov in poiščite prave ljudi za vašo ekipo.
              </p>
              <div className="space-y-6 mb-8">
                {employerFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{f.title}</div>
                      <div className="text-gray-500 text-sm">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link to="/auth/employer/register" className="btn-primary">
                  Začnite iskati talente
                </Link>
                <Link to="/cv" className="btn-secondary">
                  Preglej CVje
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Pripravljeni za naslednji korak?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Pridružite se tisočim, ki so že našli svojo naslednjo priložnost na JUB Jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg"
            >
              Ustvari račun
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              Preglej razpise
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">JUB Jobs</span>
            </div>
            <p className="text-sm">© 2024 JUB Jobs. Vse pravice pridržane.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Pogoji uporabe</a>
              <a href="#" className="hover:text-white transition-colors">Zasebnost</a>
              <a href="#" className="hover:text-white transition-colors">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
