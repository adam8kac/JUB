import { importShared } from './__federation_fn_import-BgoDX5MY.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const API_BASE = "http://localhost:3000";
function getHeaders(auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}
async function apiGet(path, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, { headers: getHeaders(auth) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function apiPost(path, body, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: getHeaders(auth),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function apiPut(path, body, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: getHeaders(auth),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function apiDelete(path, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: getHeaders(auth)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const WORK_TYPE_LABELS = {
  FULL_TIME: "Polni delovni čas",
  PART_TIME: "Skrajšani delovni čas",
  CONTRACT: "Projektno delo",
  INTERNSHIP: "Pripravništvo",
  VOLUNTEER: "Prostovoljstvo"
  // fallback - if already slovenian, pass through
};
const EXPERIENCE_LABELS = {
  ENTRY: "Brez izkušenj",
  JUNIOR: "Junior",
  MID: "Mid-level",
  SENIOR: "Senior",
  LEAD: "Vodstveni položaj"
};
function getWorkTypeLabel(val) {
  if (!val) return "Ni določeno";
  return WORK_TYPE_LABELS[val] || val;
}
function getExperienceLabel(val) {
  if (!val) return "";
  return EXPERIENCE_LABELS[val] || val;
}
function getCategory(job) {
  return job.jobCategory || job.category || "";
}

const {useState: useState$2,useEffect: useEffect$2,useCallback} = await importShared('react');

const {Link: Link$2,useSearchParams} = await importShared('react-router-dom');
const CATEGORIES$1 = ["", "IT", "Finance", "Marketing", "Law", "Healthcare", "Education", "Logistics", "Hospitality", "Other"];
const WORK_TYPES$1 = [
  { value: "", label: "Vse vrste" },
  { value: "FULL_TIME", label: "Polni delovni čas" },
  { value: "PART_TIME", label: "Skrajšani delovni čas" },
  { value: "CONTRACT", label: "Projektno delo" },
  { value: "INTERNSHIP", label: "Pripravništvo" }
];
const EXPERIENCE_LEVELS$1 = [
  { value: "", label: "Vse ravni" },
  { value: "ENTRY", label: "Brez izkušenj" },
  { value: "JUNIOR", label: "Junior" },
  { value: "MID", label: "Mid-level" },
  { value: "SENIOR", label: "Senior" },
  { value: "LEAD", label: "Vodstveni položaj" }
];
function JobCard({ job }) {
  const workTypeColors = {
    "FULL_TIME": "bg-green-100 text-green-700",
    "PART_TIME": "bg-blue-100 text-blue-700",
    "CONTRACT": "bg-purple-100 text-purple-700",
    "INTERNSHIP": "bg-amber-100 text-amber-700"
  };
  const colorClass = workTypeColors[job.workType || ""] || "bg-gray-100 text-gray-700";
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = /* @__PURE__ */ new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / (1e3 * 60 * 60 * 24));
    if (diff === 0) return "Danes";
    if (diff === 1) return "Včeraj";
    if (diff < 7) return `Pred ${diff} dnevi`;
    return d.toLocaleDateString("sl-SI");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link$2,
    {
      to: `/jobs/${job.id}`,
      className: "card p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200 block group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2.5 py-1 rounded-full font-medium ${colorClass}`, children: getWorkTypeLabel(job.workType) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1 text-lg leading-tight", children: job.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-indigo-600 font-medium mb-3", children: job.companyName || "Podjetje" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-sm text-gray-500 mb-4", children: [
          job.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
            ] }),
            job.location
          ] }),
          job.experienceLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }) }),
            getExperienceLabel(job.experienceLevel)
          ] }),
          getCategory(job) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" }) }),
            getCategory(job)
          ] })
        ] }),
        (job.salaryMin || job.salaryMax) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-900", children: job.salaryMin && job.salaryMax ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} €/mesec` : job.salaryMin ? `Od ${job.salaryMin.toLocaleString()} €/mesec` : `Do ${job.salaryMax?.toLocaleString()} €/mesec` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: formatDate(job.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-indigo-600 font-medium group-hover:underline", children: "Več →" })
        ] })
      ]
    }
  );
}
function JobsList() {
  const [jobs, setJobs] = useState$2([]);
  const [loading, setLoading] = useState$2(true);
  const [error, setError] = useState$2("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState$2(searchParams.get("category") || "");
  const [workType, setWorkType] = useState$2(searchParams.get("workType") || "");
  const [location, setLocation] = useState$2(searchParams.get("location") || "");
  const [experienceLevel, setExperienceLevel] = useState$2(searchParams.get("experienceLevel") || "");
  const [searchText, setSearchText] = useState$2("");
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (workType) params.set("workType", workType);
      if (location) params.set("location", location);
      if (experienceLevel) params.set("experienceLevel", experienceLevel);
      const query = params.toString();
      const data = await apiGet(`/jobs${query ? "?" + query : ""}`);
      setJobs(Array.isArray(data) ? data : data.jobs || []);
    } catch (err) {
      setError("Napaka pri nalaganju razpisov.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, workType, location, experienceLevel]);
  useEffect$2(() => {
    fetchJobs();
  }, [fetchJobs]);
  useEffect$2(() => {
    const params = {};
    if (category) params.category = category;
    if (workType) params.workType = workType;
    if (location) params.location = location;
    if (experienceLevel) params.experienceLevel = experienceLevel;
    setSearchParams(params);
  }, [category, workType, location, experienceLevel, setSearchParams]);
  const filteredJobs = searchText ? jobs.filter(
    (j) => j.title.toLowerCase().includes(searchText.toLowerCase()) || (j.companyName || "").toLowerCase().includes(searchText.toLowerCase()) || (j.description || "").toLowerCase().includes(searchText.toLowerCase())
  ) : jobs;
  function clearFilters() {
    setCategory("");
    setWorkType("");
    setLocation("");
    setExperienceLevel("");
    setSearchText("");
  }
  const hasFilters = category || workType || location || experienceLevel || searchText;
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Razpisi za zaposlitev" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: loading ? "Nalagam..." : `${filteredJobs.length} razpisov` })
      ] }),
      user?.role === "employer" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link$2, { to: "/jobs/new", className: "btn-primary gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
        "Nov razpis"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchText,
          onChange: (e) => setSearchText(e.target.value),
          placeholder: "Iščite po naslovu, podjetju ali opisu...",
          className: "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-4 mb-8 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-xs uppercase tracking-wide text-gray-400", children: "Kategorija" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: category,
              onChange: (e) => setCategory(e.target.value),
              className: "input-field",
              children: CATEGORIES$1.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c || "Vse kategorije" }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-xs uppercase tracking-wide text-gray-400", children: "Vrsta dela" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: workType,
              onChange: (e) => setWorkType(e.target.value),
              className: "input-field",
              children: WORK_TYPES$1.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: w.value, children: w.label }, w.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-xs uppercase tracking-wide text-gray-400", children: "Lokacija" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: location,
              onChange: (e) => setLocation(e.target.value),
              placeholder: "npr. Ljubljana",
              className: "input-field"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label text-xs uppercase tracking-wide text-gray-400", children: "Izkušnje" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: experienceLevel,
              onChange: (e) => setExperienceLevel(e.target.value),
              className: "input-field",
              children: EXPERIENCE_LEVELS$1.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l.value, children: l.label }, l.value))
            }
          )
        ] })
      ] }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: clearFilters,
          className: "text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }),
            "Počisti filtre"
          ]
        }
      ) })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Nalagam razpise..." })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 font-medium mb-2", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchJobs, className: "btn-primary mt-4", children: "Poskusi znova" })
    ] }) : filteredJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 font-semibold text-lg mb-2", children: "Ni najdenih razpisov" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mb-4", children: "Poskusite z drugimi filtri ali iskalnima pogoji." }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearFilters, className: "btn-secondary", children: "Počisti filtre" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: filteredJobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job }, job.id)) })
  ] });
}

const {useState: useState$1,useEffect: useEffect$1} = await importShared('react');

const {useParams: useParams$1,useNavigate: useNavigate$1,Link: Link$1} = await importShared('react-router-dom');
function JobDetail() {
  const { id } = useParams$1();
  const navigate = useNavigate$1();
  const [job, setJob] = useState$1(null);
  const [loading, setLoading] = useState$1(true);
  const [error, setError] = useState$1("");
  const [applying, setApplying] = useState$1(false);
  const [applied, setApplied] = useState$1(false);
  const [applyError, setApplyError] = useState$1("");
  const [deleting, setDeleting] = useState$1(false);
  const [message, setMessage] = useState$1("");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const isCandidate = user?.role === "candidate";
  const isEmployer = user?.role === "employer";
  const isOwner = isEmployer && job?.employerId === user?.id;
  useEffect$1(() => {
    if (!id) return;
    setLoading(true);
    apiGet(`/jobs/${id}`).then((data) => {
      setJob(data);
      setLoading(false);
    }).catch(() => {
      setError("Razpis ni bil najden.");
      setLoading(false);
    });
  }, [id]);
  async function handleApply() {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    setApplying(true);
    setApplyError("");
    try {
      await apiPost("/requests", {
        receiverId: String(job?.employerId || ""),
        jobPostingId: Number(id),
        senderType: "CANDIDATE",
        message
      }, true);
      setApplied(true);
    } catch (err) {
      setApplyError(err instanceof Error ? err.message : "Napaka pri pošiljanju prijave.");
    } finally {
      setApplying(false);
    }
  }
  async function handleDelete() {
    if (!confirm("Ali ste prepričani, da želite izbrisati ta razpis?")) return;
    setDeleting(true);
    try {
      await apiDelete(`/jobs/${id}`, true);
      navigate("/jobs");
    } catch {
      alert("Napaka pri brisanju razpisa.");
      setDeleting(false);
    }
  }
  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("sl-SI", { day: "numeric", month: "long", year: "numeric" });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Nalagam razpis..." })
    ] });
  }
  if (error || !job) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: error || "Razpis ni bil najden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: "/jobs", className: "btn-primary mt-4", children: "Nazaj na razpise" })
    ] });
  }
  const workTypeColors = {
    "FULL_TIME": "bg-green-100 text-green-700",
    "PART_TIME": "bg-blue-100 text-blue-700",
    "CONTRACT": "bg-purple-100 text-purple-700",
    "INTERNSHIP": "bg-amber-100 text-amber-700"
  };
  const colorClass = workTypeColors[job.workType || ""] || "bg-gray-100 text-gray-700";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-gray-500 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: "/jobs", className: "hover:text-indigo-600 transition-colors", children: "Razpisi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 font-medium truncate", children: job.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-1", children: job.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-600 font-semibold text-lg", children: job.companyName || "Podjetje" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-6", children: [
          job.workType && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm px-3 py-1.5 rounded-full font-medium ${colorClass}`, children: getWorkTypeLabel(job.workType) }),
          getCategory(job) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm px-3 py-1.5 rounded-full font-medium bg-indigo-50 text-indigo-700", children: getCategory(job) }),
          job.experienceLevel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm px-3 py-1.5 rounded-full font-medium bg-gray-100 text-gray-700", children: getExperienceLabel(job.experienceLevel) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-3", children: "Opis delovnega mesta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-600 leading-relaxed whitespace-pre-wrap", children: job.description })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Podatki o razpisu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            job.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-4 h-4 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Lokacija" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: job.location })
              ] })
            ] }),
            (job.salaryMin || job.salaryMax) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Plača" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-green-700", children: job.salaryMin && job.salaryMax ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} €` : job.salaryMin ? `Od ${job.salaryMin.toLocaleString()} €` : `Do ${job.salaryMax?.toLocaleString()} €` })
              ] })
            ] }),
            job.createdAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Objavljeno" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: formatDate(job.createdAt) })
              ] })
            ] })
          ] })
        ] }),
        isCandidate && !applied && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Pošlji prijavo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: message,
              onChange: (e) => setMessage(e.target.value),
              rows: 4,
              className: "input-field mb-3 resize-none",
              placeholder: "Kratko sporočilo delodajalcu (neobvezno)..."
            }
          ),
          applyError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600 mb-3", children: applyError }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleApply,
              disabled: applying,
              className: "btn-primary w-full",
              children: applying ? "Pošiljam..." : "Pošlji prijavo"
            }
          )
        ] }),
        isCandidate && applied && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 rounded-2xl border border-green-200 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-green-800", children: "Prijava poslana!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-green-600", children: "Delodajalec bo pregledal vašo prijavo." })
          ] })
        ] }) }),
        !user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50 rounded-2xl border border-indigo-200 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-indigo-700 mb-3", children: "Prijavite se, da pošljete prijavo." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: "/auth/login", className: "btn-primary w-full text-sm", children: "Prijava" })
        ] }),
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "Upravljanje razpisa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link$1,
            {
              to: `/jobs/edit/${job.id}`,
              className: "btn-secondary w-full flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }),
                "Uredi razpis"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleDelete,
              disabled: deleting,
              className: "w-full py-2.5 px-6 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 border border-red-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }),
                deleting ? "Brišem..." : "Izbriši razpis"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}

const {useState,useEffect} = await importShared('react');

const {useParams,useNavigate,Link} = await importShared('react-router-dom');
const CATEGORIES = ["Tehnologija", "Finance", "Marketing", "Pravo", "Zdravstvo", "Izobraževanje", "Logistika", "Gostinstvo", "Drugo"];
const WORK_TYPES = ["Polni delovni čas", "Skrajšani delovni čas", "Projektno delo", "Pripravništvo", "Prostovoljstvo"];
const EXPERIENCE_LEVELS = ["Brez izkušenj", "Junior", "Mid-level", "Senior", "Vodstveni položaj"];
const INITIAL_FORM = {
  title: "",
  description: "",
  jobCategory: "IT",
  workType: "Polni delovni čas",
  location: "",
  experienceLevel: "Junior",
  salaryMin: "",
  salaryMax: ""
};
function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  useEffect(() => {
    const currentUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        return null;
      }
    })();
    if (!currentUser || currentUser.role !== "employer") {
      navigate("/auth/employer/login");
    }
  }, []);
  useEffect(() => {
    if (!isEdit) return;
    apiGet(`/jobs/${id}`).then((data) => {
      setForm({
        title: data.title || "",
        description: data.description || "",
        jobCategory: data.jobCategory || data.category || "IT",
        workType: data.workType || "Polni delovni čas",
        location: data.location || "",
        experienceLevel: data.experienceLevel || "Junior",
        salaryMin: data.salaryMin?.toString() || "",
        salaryMax: data.salaryMax?.toString() || ""
      });
      setLoading(false);
    }).catch(() => {
      setError("Razpis ni bil najden.");
      setLoading(false);
    });
  }, [id, isEdit]);
  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Naslov je obvezen.");
      return;
    }
    if (!form.description.trim()) {
      setError("Opis je obvezen.");
      return;
    }
    if (!form.location.trim()) {
      setError("Lokacija je obvezna.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        description: form.description,
        jobCategory: form.jobCategory,
        workType: form.workType,
        location: form.location,
        experienceLevel: form.experienceLevel,
        salaryMin: form.salaryMin ? parseInt(form.salaryMin) : void 0,
        salaryMax: form.salaryMax ? parseInt(form.salaryMax) : void 0,
        employerId: user?.id
      };
      if (isEdit) {
        await apiPut(`/jobs/${id}`, payload, true);
        navigate(`/jobs/${id}`);
      } else {
        const created = await apiPost("/jobs", payload, true);
        navigate(`/jobs/${created.id || ""}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Napaka pri shranjevanju.");
    } finally {
      setSaving(false);
    }
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-gray-500 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", className: "hover:text-indigo-600", children: "Razpisi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 font-medium", children: isEdit ? "Uredi razpis" : "Nov razpis" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-8 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-6", children: isEdit ? "Uredi razpis" : "Objavi nov razpis" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Naziv delovnega mesta *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: form.title,
              onChange: (e) => update("title", e.target.value),
              className: "input-field",
              placeholder: "npr. Senior Software Engineer",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Kategorija *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.jobCategory, onChange: (e) => update("jobCategory", e.target.value), className: "input-field", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Vrsta dela *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.workType, onChange: (e) => update("workType", e.target.value), className: "input-field", children: WORK_TYPES.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: w, children: w }, w)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Lokacija *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: form.location,
                onChange: (e) => update("location", e.target.value),
                className: "input-field",
                placeholder: "npr. Ljubljana / Delo od doma",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Zahtevane izkušnje *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.experienceLevel, onChange: (e) => update("experienceLevel", e.target.value), className: "input-field", children: EXPERIENCE_LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l, children: l }, l)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Min. plača (€/mesec)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: form.salaryMin,
                onChange: (e) => update("salaryMin", e.target.value),
                className: "input-field",
                placeholder: "npr. 2000",
                min: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Max. plača (€/mesec)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: form.salaryMax,
                onChange: (e) => update("salaryMax", e.target.value),
                className: "input-field",
                placeholder: "npr. 3500",
                min: "0"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Opis delovnega mesta *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: form.description,
              onChange: (e) => update("description", e.target.value),
              rows: 10,
              className: "input-field resize-none",
              placeholder: "Opišite delovno mesto, zahteve, naloge, prednosti zaposlitve pri vas...",
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-gray-400", children: [
            form.description.length,
            " znakov"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "btn-primary flex-1 py-3", children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin w-4 h-4", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
            ] }),
            "Shranjujem..."
          ] }) : isEdit ? "Shrani spremembe" : "Objavi razpis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: isEdit ? `/jobs/${id}` : "/jobs", className: "btn-secondary flex-1 py-3 text-center", children: "Prekliči" })
        ] })
      ] })
    ] })
  ] });
}

const {Routes,Route,Navigate} = await importShared('react-router-dom');
function JobsApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(JobsList, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/new", element: /* @__PURE__ */ jsxRuntimeExports.jsx(JobForm, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/edit/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(JobForm, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(JobDetail, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/jobs", replace: true }) })
  ] });
}

export { JobsApp as default, jsxRuntimeExports as j };
