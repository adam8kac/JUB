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
async function apiPatch(path, body, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: getHeaders(auth),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
function getApiBase() {
  return API_BASE;
}

const {useState: useState$2,useEffect: useEffect$2} = await importShared('react');

const {Link: Link$1} = await importShared('react-router-dom');
function CVCard({ cv }) {
  const name = cv.name || (cv.personalInfo?.firstName && cv.personalInfo?.lastName ? `${cv.personalInfo.firstName} ${cv.personalInfo.lastName}` : cv.personalInfo?.firstName || "Anonimni kandidat");
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const skills = cv.skills?.slice(0, 4) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link$1,
    {
      to: `/cv/${cv.uid}`,
      className: "card p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200 block group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-700 font-bold text-sm", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate", children: name }),
            cv.personalInfo?.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-500 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
              ] }),
              cv.personalInfo.location
            ] })
          ] })
        ] }),
        cv.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed", children: cv.summary }),
        skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium", children: skill }, skill)),
          (cv.skills?.length || 0) > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full", children: [
            "+",
            (cv.skills?.length || 0) - 4,
            " več"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-gray-100 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
            cv.experience?.length || 0,
            " izkušenj"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-indigo-600 font-medium group-hover:underline", children: "Preglej →" })
        ] })
      ]
    }
  );
}
function CVList() {
  const [cvs, setCvs] = useState$2([]);
  const [loading, setLoading] = useState$2(true);
  const [error, setError] = useState$2("");
  const [search, setSearch] = useState$2("");
  useEffect$2(() => {
    apiGet("/cvs", !!localStorage.getItem("token")).then((data) => {
      setCvs(Array.isArray(data) ? data : data.cvs || []);
      setLoading(false);
    }).catch(() => {
      setError("Napaka pri nalaganju CVjev.");
      setLoading(false);
    });
  }, []);
  const filtered = search ? cvs.filter((cv) => {
    const name = cv.name || `${cv.personalInfo?.firstName || ""} ${cv.personalInfo?.lastName || ""}`.trim();
    const skillsText = (cv.skills || []).join(" ");
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || skillsText.toLowerCase().includes(q) || (cv.summary || "").toLowerCase().includes(q);
  }) : cvs;
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Življenjepisi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: loading ? "Nalagam..." : `${filtered.length} CVjev` })
      ] }),
      user?.role === "candidate" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link$1, { to: "/cv/builder", className: "btn-primary gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
        "Moj CV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Iščite po imenu, veščinah...",
          className: "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Nalagam CVje..." })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 font-medium", children: error }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 font-semibold text-lg mb-2", children: "Ni najdenih CVjev" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "Poskusite z drugačnim iskalniam pogojem." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: filtered.map((cv) => /* @__PURE__ */ jsxRuntimeExports.jsx(CVCard, { cv }, cv.uid)) })
  ] });
}

const {useState: useState$1,useEffect: useEffect$1} = await importShared('react');

const {useParams,Link} = await importShared('react-router-dom');
function Section({ title, icon, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4 pb-3 border-b border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 text-lg", children: title })
    ] }),
    children
  ] });
}
function CVDetail() {
  const { uid } = useParams();
  const [cv, setCv] = useState$1(null);
  const [loading, setLoading] = useState$1(true);
  const [error, setError] = useState$1("");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const token = localStorage.getItem("token");
  useEffect$1(() => {
    if (!uid) return;
    apiGet(`/cvs/${uid}`, true).then((data) => {
      setCv(data);
      setLoading(false);
    }).catch(() => {
      setError("CV ni bil najden.");
      setLoading(false);
    });
  }, [uid]);
  async function downloadPdf() {
    if (!uid || !token) return;
    try {
      const res = await fetch(`${getApiBase()}/cv/${uid}/pdf`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Napaka pri prenosu PDF.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv-${uid}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Napaka pri prenosu PDF.");
    }
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }) });
  }
  if (error || !cv) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 font-medium mb-4", children: error || "CV ni bil najden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cv", className: "btn-primary", children: "Nazaj na CVje" })
    ] });
  }
  const { personalInfo, summary, experience, education, skills } = cv;
  const fullName = personalInfo ? `${personalInfo.firstName} ${personalInfo.lastName}`.trim() : "Kandidat";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-gray-500 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cv", className: "hover:text-indigo-600", children: "CVji" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 font-medium", children: fullName })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white mb-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-white", children: fullName.split(" ").map((n) => n[0]).join("").slice(0, 2) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-1", children: fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-indigo-100 text-sm mt-2", children: [
          personalInfo?.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
            personalInfo.email
          ] }),
          personalInfo?.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
            personalInfo.phone
          ] }),
          personalInfo?.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
            ] }),
            personalInfo.location
          ] })
        ] })
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: downloadPdf,
          className: "flex-shrink-0 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
            "PDF"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      summary && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Section,
        {
          title: "Povzetek",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed", children: summary })
        }
      ),
      skills && skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Section,
        {
          title: "Veščine",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium", children: skill }, skill)) })
        }
      ),
      experience && experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Section,
        {
          title: "Delovne izkušnje",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: experience.map((exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-5 border-l-2 border-indigo-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-[5px] top-1 w-2.5 h-2.5 bg-indigo-400 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900", children: exp.position }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-600 font-medium text-sm", children: exp.company })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 flex-shrink-0", children: [
                exp.startDate,
                " – ",
                exp.current ? "Zdaj" : exp.endDate
              ] })
            ] }),
            exp.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm leading-relaxed mt-2", children: exp.description })
          ] }, i)) })
        }
      ),
      education && education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Section,
        {
          title: "Izobrazba",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 14l9-5-9-5-9 5 9 5z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" })
          ] }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: education.map((edu, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-5 border-l-2 border-green-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-[5px] top-1 w-2.5 h-2.5 bg-green-400 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900", children: edu.institution }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-700 text-sm font-medium", children: [
                  edu.degree,
                  edu.field ? `, ${edu.field}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 flex-shrink-0", children: [
                edu.startDate,
                " – ",
                edu.current ? "Zdaj" : edu.endDate
              ] })
            ] })
          ] }, i)) })
        }
      )
    ] }),
    user?.role === "employer" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-indigo-50 rounded-2xl border border-indigo-200 p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-700 font-medium mb-3", children: "Zainteresirani za tega kandidata?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/hub/inbox",
          className: "btn-primary",
          children: "Pošlji povabilo"
        }
      )
    ] })
  ] });
}

const {useState,useEffect,useCallback} = await importShared('react');

const {useNavigate} = await importShared('react-router-dom');
const INITIAL_CV = {
  personalInfo: { firstName: "", lastName: "", email: "", phone: "", location: "", linkedIn: "", website: "" },
  summary: "",
  experience: [],
  education: [],
  skills: []
};
const EMPTY_EXP = { company: "", position: "", startDate: "", endDate: "", current: false, description: "" };
const EMPTY_EDU = { institution: "", degree: "", field: "", startDate: "", endDate: "", current: false };
const TABS = [
  { id: "personal", label: "Osebni podatki", icon: "👤" },
  { id: "summary", label: "Povzetek", icon: "📝" },
  { id: "experience", label: "Izkušnje", icon: "💼" },
  { id: "education", label: "Izobrazba", icon: "🎓" },
  { id: "skills", label: "Veščine", icon: "⚡" },
  { id: "preview", label: "Predogled", icon: "👁️" }
];
function CVBuilder() {
  const navigate = useNavigate();
  const [cv, setCv] = useState(INITIAL_CV);
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [isNew, setIsNew] = useState(false);
  const getUserFromStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  };
  const user = getUserFromStorage();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const currentUser = getUserFromStorage();
    if (!currentUser || currentUser.role !== "candidate") {
      navigate("/auth/login");
      return;
    }
    const uid = currentUser.id;
    apiGet(`/cv/${uid}`, true).then((data) => {
      setCv({
        uid: data.uid || uid,
        personalInfo: data.personalInfo || INITIAL_CV.personalInfo,
        summary: data.summary || "",
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || []
      });
      setIsNew(false);
      setLoading(false);
    }).catch(() => {
      setCv({ ...INITIAL_CV, uid });
      setIsNew(true);
      setLoading(false);
    });
  }, []);
  const handleSave = useCallback(async () => {
    if (!user) return;
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const uid = user.id;
      if (isNew) {
        await apiPost(`/cv/save/${uid}`, cv, true);
        setIsNew(false);
      } else {
        await apiPatch(`/cv/${uid}`, cv, true);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3e3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Napaka pri shranjevanju.");
    } finally {
      setSaving(false);
    }
  }, [cv, isNew, user]);
  async function downloadPdf() {
    if (!user || !token) return;
    try {
      const res = await fetch(`${getApiBase()}/cv/${user.id}/pdf`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zivljenjepis-${user.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Napaka pri prenosu PDF.");
    }
  }
  function updatePersonal(field, value) {
    setCv((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  }
  function addExperience() {
    setCv((prev) => ({ ...prev, experience: [...prev.experience, { ...EMPTY_EXP }] }));
  }
  function updateExperience(i, field, value) {
    setCv((prev) => {
      const exp = [...prev.experience];
      exp[i] = { ...exp[i], [field]: value };
      return { ...prev, experience: exp };
    });
  }
  function removeExperience(i) {
    setCv((prev) => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }));
  }
  function addEducation() {
    setCv((prev) => ({ ...prev, education: [...prev.education, { ...EMPTY_EDU }] }));
  }
  function updateEducation(i, field, value) {
    setCv((prev) => {
      const edu = [...prev.education];
      edu[i] = { ...edu[i], [field]: value };
      return { ...prev, education: edu };
    });
  }
  function removeEducation(i) {
    setCv((prev) => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }));
  }
  function addSkill() {
    const s = skillInput.trim();
    if (!s || cv.skills.includes(s)) return;
    setCv((prev) => ({ ...prev, skills: [...prev.skills, s] }));
    setSkillInput("");
  }
  function removeSkill(skill) {
    setCv((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Moj CV" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-0.5", children: "Urejajte in shranite vaš življenjepis" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-green-600 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          "Shranjeno"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: downloadPdf,
            className: "btn-secondary gap-2 text-sm py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
              "Prenesi PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSave,
            disabled: saving,
            className: "btn-primary gap-2 text-sm py-2",
            children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin w-4 h-4", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Shranjujem..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" }) }),
              "Shrani"
            ] })
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: `w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.icon }),
            tab.label
          ]
        },
        tab.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        activeTab === "personal" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 text-lg mb-5", children: "Osebni podatki" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Ime" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: cv.personalInfo.firstName, onChange: (e) => updatePersonal("firstName", e.target.value), className: "input-field", placeholder: "Jana" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Priimek" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: cv.personalInfo.lastName, onChange: (e) => updatePersonal("lastName", e.target.value), className: "input-field", placeholder: "Novak" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: cv.personalInfo.email, onChange: (e) => updatePersonal("email", e.target.value), className: "input-field", placeholder: "jana@primer.si" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Telefon" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: cv.personalInfo.phone, onChange: (e) => updatePersonal("phone", e.target.value), className: "input-field", placeholder: "+386 40 123 456" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Lokacija" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: cv.personalInfo.location, onChange: (e) => updatePersonal("location", e.target.value), className: "input-field", placeholder: "Ljubljana, Slovenija" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "LinkedIn (neobvezno)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", value: cv.personalInfo.linkedIn || "", onChange: (e) => updatePersonal("linkedIn", e.target.value), className: "input-field", placeholder: "linkedin.com/in/..." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Spletna stran (neobvezno)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", value: cv.personalInfo.website || "", onChange: (e) => updatePersonal("website", e.target.value), className: "input-field", placeholder: "https://moja-stran.si" })
            ] })
          ] })
        ] }),
        activeTab === "summary" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 text-lg mb-2", children: "Povzetek / Profil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Kratka predstavitev vaših kompetenc, ciljev in vrednosti, ki jih prinašate." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: cv.summary,
              onChange: (e) => setCv((prev) => ({ ...prev, summary: e.target.value })),
              rows: 8,
              className: "input-field resize-none",
              placeholder: "Sem izkušen razvijalec programske opreme z 5+ leti izkušenj v spletnem razvoju. Specializiran za React in Node.js. Iščem priložnost v dinamičnem okolju, kjer bom lahko reševal kompleksne tehnične izzive..."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-gray-400", children: [
            cv.summary.length,
            " znakov"
          ] })
        ] }),
        activeTab === "experience" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          cv.experience.map((exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-gray-900", children: [
                "Izkušnja #",
                i + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => removeExperience(i),
                  className: "text-red-500 hover:text-red-700 p-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Delovno mesto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: exp.position, onChange: (e) => updateExperience(i, "position", e.target.value), className: "input-field", placeholder: "Software Engineer" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Podjetje" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: exp.company, onChange: (e) => updateExperience(i, "company", e.target.value), className: "input-field", placeholder: "Acme d.o.o." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Začetek" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", value: exp.startDate, onChange: (e) => updateExperience(i, "startDate", e.target.value), className: "input-field" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Konec" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", value: exp.endDate, onChange: (e) => updateExperience(i, "endDate", e.target.value), className: "input-field", disabled: exp.current }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 mt-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: exp.current, onChange: (e) => updateExperience(i, "current", e.target.checked), className: "rounded text-indigo-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Trenutno delovno mesto" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Opis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: exp.description, onChange: (e) => updateExperience(i, "description", e.target.value), rows: 3, className: "input-field resize-none", placeholder: "Opišite vaše naloge in dosežke..." })
              ] })
            ] })
          ] }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: addExperience,
              className: "w-full py-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
                "Dodaj izkušnjo"
              ]
            }
          )
        ] }),
        activeTab === "education" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          cv.education.map((edu, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-gray-900", children: [
                "Izobrazba #",
                i + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeEducation(i), className: "text-red-500 hover:text-red-700 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Izobraževalna ustanova" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: edu.institution, onChange: (e) => updateEducation(i, "institution", e.target.value), className: "input-field", placeholder: "Univerza v Ljubljani" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Stopnja izobrazbe" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: edu.degree, onChange: (e) => updateEducation(i, "degree", e.target.value), className: "input-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Izberi..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Srednja šola" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Višja šola" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Visoka šola (BSc)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Magistrska (MSc)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Doktorska (PhD)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Smer / Področje" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: edu.field, onChange: (e) => updateEducation(i, "field", e.target.value), className: "input-field", placeholder: "Računalništvo" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Začetek" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", value: edu.startDate, onChange: (e) => updateEducation(i, "startDate", e.target.value), className: "input-field" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Konec" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", value: edu.endDate, onChange: (e) => updateEducation(i, "endDate", e.target.value), className: "input-field", disabled: edu.current }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 mt-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: edu.current, onChange: (e) => updateEducation(i, "current", e.target.checked), className: "rounded text-indigo-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Trenutno šolanje" })
                ] })
              ] })
            ] })
          ] }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: addEducation,
              className: "w-full py-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
                "Dodaj izobrazbo"
              ]
            }
          )
        ] }),
        activeTab === "skills" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 text-lg mb-2", children: "Veščine in kompetence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-5", children: "Dodajte vaše tehnične in mehke veščine." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: skillInput,
                onChange: (e) => setSkillInput(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && (e.preventDefault(), addSkill()),
                className: "input-field",
                placeholder: "npr. React, Python, Komunikacija..."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addSkill, className: "btn-primary flex-shrink-0", children: "Dodaj" })
          ] }),
          cv.skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: cv.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium", children: [
            skill,
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeSkill(skill), className: "text-indigo-400 hover:text-indigo-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }, skill)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Zaenkrat ni dodanih veščin." }) })
        ] }),
        activeTab === "preview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold", children: [
              cv.personalInfo.firstName,
              " ",
              cv.personalInfo.lastName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 mt-3 text-indigo-100 text-sm", children: [
              cv.personalInfo.email && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cv.personalInfo.email }),
              cv.personalInfo.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cv.personalInfo.phone }),
              cv.personalInfo.location && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cv.personalInfo.location })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-6", children: [
            cv.summary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-lg mb-2 pb-1 border-b border-gray-200", children: "Povzetek" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed", children: cv.summary })
            ] }),
            cv.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-lg mb-3 pb-1 border-b border-gray-200", children: "Veščine" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: cv.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium", children: s }, s)) })
            ] }),
            cv.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-lg mb-3 pb-1 border-b border-gray-200", children: "Delovne izkušnje" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: cv.experience.map((exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 border-l-2 border-indigo-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900", children: exp.position }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-indigo-600 text-sm font-medium", children: exp.company })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                    exp.startDate,
                    " – ",
                    exp.current ? "Zdaj" : exp.endDate
                  ] })
                ] }),
                exp.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm mt-1", children: exp.description })
              ] }, i)) })
            ] }),
            cv.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-lg mb-3 pb-1 border-b border-gray-200", children: "Izobrazba" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cv.education.map((edu, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-4 border-l-2 border-green-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900", children: edu.institution }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-green-700 text-sm", children: [
                    edu.degree,
                    edu.field ? `, ${edu.field}` : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                  edu.startDate,
                  " – ",
                  edu.current ? "Zdaj" : edu.endDate
                ] })
              ] }) }, i)) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

const {Routes,Route,Navigate} = await importShared('react-router-dom');
function CVApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CVList, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/builder", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CVBuilder, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/:uid", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CVDetail, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/cv", replace: true }) })
  ] });
}

export { CVApp as default, jsxRuntimeExports as j };
