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
async function apiPatch(path, body, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: getHeaders(auth),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const {useState: useState$2,useEffect: useEffect$2} = await importShared('react');

const {Link,useNavigate: useNavigate$2} = await importShared('react-router-dom');
function Dashboard() {
  const navigate = useNavigate$2();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const [recentJobs, setRecentJobs] = useState$2([]);
  const [recentCVs, setRecentCVs] = useState$2([]);
  const [loading, setLoading] = useState$2(true);
  useEffect$2(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    const fetchData = async () => {
      try {
        if (user.role === "candidate") {
          const jobs = await apiGet("/jobs");
          setRecentJobs((Array.isArray(jobs) ? jobs : jobs.jobs || []).slice(0, 4));
        } else if (user.role === "employer") {
          const [jobs, cvs] = await Promise.allSettled([
            apiGet("/jobs"),
            apiGet("/cvs", true)
          ]);
          if (jobs.status === "fulfilled") {
            const allJobs = Array.isArray(jobs.value) ? jobs.value : jobs.value.jobs || [];
            setRecentJobs(allJobs.filter((j) => j).slice(0, 4));
          }
          if (cvs.status === "fulfilled") {
            setRecentCVs((Array.isArray(cvs.value) ? cvs.value : cvs.value.cvs || []).slice(0, 4));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (!user) return null;
  const isCandidate = user.role === "candidate";
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Dobro jutro" : hour < 18 ? "Dober dan" : "Dober večer";
  const quickLinks = isCandidate ? [
    { to: "/jobs", label: "Preglej razpise", icon: "🔍", desc: "Iščite delo po kategorijah" },
    { to: "/cv/builder", label: "Uredi CV", icon: "📝", desc: "Posodobite vaš življenjepis" },
    { to: "/hub/inbox", label: "Predalnik", icon: "📬", desc: "Sporočila in povabila" },
    { to: "/hub/notifications", label: "Obvestila", icon: "🔔", desc: "Novosti v realnem času" }
  ] : [
    { to: "/jobs/new", label: "Nov razpis", icon: "➕", desc: "Objavite prosto delovno mesto" },
    { to: "/cv", label: "Preglej CVje", icon: "📋", desc: "Brskajte po kandidatih" },
    { to: "/hub/inbox", label: "Predalnik", icon: "📬", desc: "Upravljajte prijave" },
    { to: "/hub/notifications", label: "Obvestila", icon: "🔔", desc: "Novosti v realnem času" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-indigo-200 text-sm font-medium mb-1", children: [
          greeting,
          ","
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: user.name || user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${isCandidate ? "bg-green-500/20 text-green-200" : "bg-amber-500/20 text-amber-200"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-current rounded-full" }),
          isCandidate ? "Kandidat" : "Delodajalec"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-4xl", children: isCandidate ? "👤" : "🏢" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: quickLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: link.to,
        className: "bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-3", children: link.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1", children: link.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: link.desc })
        ]
      },
      link.to
    )) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: isCandidate ? "Najnovejši razpisi" : "Razpisi na platformi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", className: "text-sm text-indigo-600 hover:text-indigo-700 font-medium", children: "Vsi razpisi →" })
        ] }),
        recentJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Ni razpisov za prikaz." }),
          !isCandidate && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/new", className: "btn-primary mt-4 text-sm py-2", children: "Objavi prvi razpis" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recentJobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: `/jobs/${job.id}`,
            className: "flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm hover:border-indigo-200 transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900 truncate", children: job.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: job.location || "Lokacija ni določena" })
              ] }),
              job.workType && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex-shrink-0", children: job.workType })
            ]
          },
          job.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isCandidate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Moj profil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cv/builder", className: "text-sm text-indigo-600 hover:text-indigo-700 font-medium", children: "Uredi →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-700 font-bold text-lg", children: (user.name || user.email).charAt(0).toUpperCase() }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900", children: user.name || "Vaše ime" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500 text-sm", children: user.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/cv/builder",
                className: "flex items-center justify-between p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-indigo-700", children: "Uredi življenjepis" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/hub/inbox",
                className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Preglej predalnik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/hub/notifications",
                className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Obvestila v realnem času" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                ]
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Najnovejši CVji" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cv", className: "text-sm text-indigo-600 hover:text-indigo-700 font-medium", children: "Vsi CVji →" })
        ] }),
        recentCVs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-200 p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Ni CVjev za prikaz." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recentCVs.map((cv) => {
          const name = cv.name || `${cv.personalInfo?.firstName || ""} ${cv.personalInfo?.lastName || ""}`.trim() || "Anonimni kandidat";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: `/cv/${cv.uid}`,
              className: "flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm hover:border-indigo-200 transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-700 font-bold text-sm", children: name.split(" ").map((n) => n[0]).join("").slice(0, 2) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900 truncate", children: name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: cv.personalInfo?.location || cv.skills?.slice(0, 2).join(", ") || "Kandidat" })
                ] })
              ]
            },
            cv.uid
          );
        }) })
      ] }) })
    ] })
  ] });
}

const {useState: useState$1,useEffect: useEffect$1} = await importShared('react');

const {useNavigate: useNavigate$1} = await importShared('react-router-dom');
const STATUS_LABELS = {
  pending: "V obravnavi",
  accepted: "Sprejeta",
  declined: "Zavrnjena"
};
const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700"
};
function formatDate$1(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / (1e3 * 60 * 60 * 24));
  if (diff === 0) return "Danes";
  if (diff === 1) return "Včeraj";
  if (diff < 7) return `Pred ${diff} dnevi`;
  return d.toLocaleDateString("sl-SI");
}
function Inbox() {
  const navigate = useNavigate$1();
  const [requests, setRequests] = useState$1([]);
  const [loading, setLoading] = useState$1(true);
  const [error, setError] = useState$1("");
  const [updating, setUpdating] = useState$1(null);
  const [filter, setFilter] = useState$1("all");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  useEffect$1(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    fetchInbox();
  }, []);
  async function fetchInbox() {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet(`/inbox/${user.id}`, true);
      const raw = Array.isArray(data) ? data : data.requests || data.inbox || [];
      setRequests(raw.map((r) => ({
        ...r,
        status: r.status ?? (r.isAccepted === true ? "accepted" : r.isAccepted === false ? "declined" : "pending")
      })));
    } catch {
      setError("Napaka pri nalaganju predalnika.");
    } finally {
      setLoading(false);
    }
  }
  async function updateStatus(id, status) {
    setUpdating(id);
    try {
      await apiPatch(`/requests/${id}`, { accepted: status === "accepted" }, true);
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    } catch {
      alert("Napaka pri posodabljanju statusa.");
    } finally {
      setUpdating(null);
    }
  }
  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Predalnik" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-0.5 text-sm", children: "Prijave in sporočila" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: fetchInbox,
          className: "flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }),
            "Osveži"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-6 bg-white rounded-xl border border-gray-200 p-1.5 w-fit", children: ["all", "pending", "accepted", "declined"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setFilter(f),
        className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`,
        children: [
          f === "all" ? "Vsi" : STATUS_LABELS[f],
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `ml-1.5 text-xs ${filter === f ? "text-indigo-200" : "text-gray-400"}`, children: [
            "(",
            f === "all" ? requests.length : requests.filter((r) => r.status === f).length,
            ")"
          ] })
        ]
      },
      f
    )) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchInbox, className: "btn-primary", children: "Poskusi znova" })
    ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 font-medium", children: "Predalnik je prazen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: user.role === "candidate" ? "Pošljite prijave na razpise, ki vas zanimajo." : "Ko prejmete prijave, bodo prikazane tukaj." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filtered.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900", children: req.candidateName || req.employerName || `Pošiljatelj ${req.senderId?.slice(0, 8) || ""}` }),
            req.jobTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-indigo-600 font-medium", children: req.jobTitle })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[req.status] || "bg-gray-100 text-gray-600"}`, children: STATUS_LABELS[req.status] || req.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: formatDate$1(req.createdAt) })
        ] })
      ] }),
      req.message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: req.message }) }),
      req.status === "pending" && req.receiverId === user.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => updateStatus(req.id, "accepted"),
            disabled: updating === req.id,
            className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
              updating === req.id ? "Shranjujem..." : "Sprejmi"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => updateStatus(req.id, "declined"),
            disabled: updating === req.id,
            className: "flex items-center gap-2 px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 border border-red-200 transition-colors disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }),
              "Zavrni"
            ]
          }
        )
      ] }),
      req.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-600 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        "Prijava je bila sprejeta"
      ] }),
      req.status === "declined" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-red-600 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        "Prijava je bila zavrnjena"
      ] })
    ] }, req.id)) })
  ] });
}

const {useState,useEffect,useRef} = await importShared('react');

const {useNavigate} = await importShared('react-router-dom');
function formatDate(dateStr) {
  if (!dateStr) return "Pravkar";
  const d = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 6e4);
  if (diffMin < 1) return "Pravkar";
  if (diffMin < 60) return `Pred ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Pred ${diffH}h`;
  return d.toLocaleDateString("sl-SI");
}
const TYPE_ICONS = {
  application: "📨",
  accepted: "✅",
  declined: "❌",
  new_job: "💼",
  message: "💬",
  default: "🔔"
};
const TYPE_COLORS = {
  application: "border-blue-200 bg-blue-50",
  accepted: "border-green-200 bg-green-50",
  declined: "border-red-200 bg-red-50",
  new_job: "border-indigo-200 bg-indigo-50",
  message: "border-purple-200 bg-purple-50",
  default: "border-gray-200 bg-gray-50"
};
function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const esRef = useRef(null);
  const token = localStorage.getItem("token");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    connectSSE();
    return () => {
      esRef.current?.close();
    };
  }, []);
  function connectSSE() {
    if (esRef.current) {
      esRef.current.close();
    }
    setError("");
    const url = `${API_BASE}/notifications/stream/${user.id}${token ? `?token=${token}` : ""}`;
    try {
      const es = new EventSource(url);
      esRef.current = es;
      es.onopen = () => {
        setConnected(true);
        setError("");
      };
      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "ping" || data.type === "connected") return;
          const notification = {
            id: data.id || Date.now().toString(),
            message: data.message || data.text || JSON.stringify(data),
            type: data.type,
            read: false,
            createdAt: data.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
            data
          };
          setNotifications((prev) => [notification, ...prev].slice(0, 50));
        } catch {
        }
      };
      es.addEventListener("notification", (event) => {
        try {
          const data = JSON.parse(event.data);
          const notification = {
            id: data.id || Date.now().toString(),
            message: data.message || data.text || "Novo obvestilo",
            type: data.type || "default",
            read: false,
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          setNotifications((prev) => [notification, ...prev].slice(0, 50));
        } catch {
        }
      });
      es.onerror = () => {
        setConnected(false);
        setError("Povezava prekinjena. Poskušam znova...");
        es.close();
        setTimeout(connectSSE, 5e3);
      };
    } catch (err) {
      setError("Napaka pri vzpostavljanju SSE povezave.");
    }
  }
  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }
  function clearAll() {
    setNotifications([]);
  }
  const unreadCount = notifications.filter((n) => !n.read).length;
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-3", children: [
          "Obvestila",
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm px-2.5 py-1 bg-indigo-600 text-white rounded-full font-normal", children: [
            unreadCount,
            " novih"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: connected ? "Povezan v realnem času" : "Ni povezave" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: markAllRead,
              className: "text-sm text-gray-500 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all",
              children: "Označi kot prebrane"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: clearAll,
              className: "text-sm text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all",
              children: "Počisti"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: connectSSE,
            className: "flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }),
              "Poveži"
            ]
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-amber-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-700 text-sm", children: error })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center ${connected ? "bg-green-100" : "bg-gray-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: `w-6 h-6 ${connected ? "text-green-600" : "text-gray-400"}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: connected ? "Aktivna SSE povezava" : "Vzpostavljam SSE povezavo..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-500", children: [
          "Posluša: /notifications/stream/",
          user.id
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `ml-auto px-3 py-1 rounded-full text-xs font-medium ${connected ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`, children: connected ? "Aktivno" : "Ni povezave" })
    ] }) }),
    notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-10 h-10 text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }) }),
        connected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700 text-lg mb-2", children: "Ni novih obvestil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: connected ? "Čakam na nova obvestila v realnem času..." : "Vzpostavljam povezavo s strežnikom..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: notifications.map((notif) => {
      const icon = TYPE_ICONS[notif.type || "default"] || TYPE_ICONS.default;
      const colorClass = TYPE_COLORS[notif.type || "default"] || TYPE_COLORS.default;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `rounded-xl border p-5 transition-all ${colorClass} ${!notif.read ? "shadow-sm" : "opacity-70"}`,
          onClick: () => setNotifications((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n)),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl flex-shrink-0 mt-0.5", children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-800 font-medium leading-snug", children: notif.message }),
                !notif.read && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-1.5" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: formatDate(notif.createdAt) }),
                notif.type && notif.type !== "default" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 capitalize", children: notif.type })
              ] })
            ] })
          ] })
        },
        notif.id
      );
    }) })
  ] });
}

const {Routes,Route,Navigate} = await importShared('react-router-dom');
function HubApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/inbox", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/notifications", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Notifications, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/hub/dashboard", replace: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/hub/dashboard", replace: true }) })
  ] });
}

export { HubApp as default, jsxRuntimeExports as j };
