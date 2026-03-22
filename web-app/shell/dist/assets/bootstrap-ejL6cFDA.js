import { i as importShared } from './_virtual___federation_fn_import-XVX6aj37.js';
import { r as reactExports } from './index-Dm_EQZZA.js';
import { r as reactDomExports } from './index-COvqqES_.js';

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
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const remotesMap = {
'mfe_auth':{url:'http://localhost:5001/assets/remoteEntry.js',format:'esm',from:'vite'},
  'mfe_jobs':{url:'http://localhost:5002/assets/remoteEntry.js',format:'esm',from:'vite'},
  'mfe_cv':{url:'http://localhost:5003/assets/remoteEntry.js',format:'esm',from:'vite'},
  'mfe_hub':{url:'http://localhost:5004/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};
                const loadJS = async (url, fn) => {
                    const resolvedUrl = typeof url === 'function' ? await url() : url;
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = fn;
                    script.src = resolvedUrl;
                    document.getElementsByTagName('head')[0].appendChild(script);
                };

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        if (remoteFrom === 'webpack') {
                            return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
                        }
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href, remoteFrom), loaded:1}},'react-dom':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-dom-BN8Au471.js', import.meta.url).href, remoteFrom), loaded:1}},'react-router-dom':{'6.30.3':{get:()=>get(new URL('__federation_shared_react-router-dom-DY03Vucf.js', import.meta.url).href, remoteFrom), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if ('var' === remote.format) {
                            // loading js with script tag
                            return new Promise(resolve => {
                                const callback = () => {
                                    if (!remote.inited) {
                                        remote.lib = window[remoteId];
                                        remote.lib.init(wrapShareModule(remote.from));
                                        remote.inited = true;
                                    }
                                    resolve(remote.lib);
                                };
                                return loadJS(remote.url, callback);
                            });
                        } else if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule(remote.from);
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {createContext,useContext,useState: useState$1,useEffect: useEffect$1,useCallback} = await importShared('react');

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState$1(null);
  const [token, setToken] = useState$1(null);
  const loadFromStorage = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } else {
      setToken(null);
      setUser(null);
    }
  }, []);
  useEffect$1(() => {
    loadFromStorage();
    window.addEventListener("auth-change", loadFromStorage);
    return () => window.removeEventListener("auth-change", loadFromStorage);
  }, [loadFromStorage]);
  const login = useCallback((userData, accessToken) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
    window.dispatchEvent(new Event("auth-change"));
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, token, login, logout, isAuthenticated: !!token }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

const {useState,useEffect,useRef} = await importShared('react');

const {Link: Link$1,useNavigate} = await importShared('react-router-dom');
function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const loginRef = useRef(null);
  const userRef = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setLoginDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link$1, { to: "/", className: "flex items-center gap-2 group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors", children: "JUB Jobs" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link$1,
        {
          to: "/jobs",
          className: "px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200",
          children: "Razpisi"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link$1,
        {
          to: "/cv",
          className: "px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200",
          children: "CVji"
        }
      ),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link$1,
        {
          to: "/hub/dashboard",
          className: "px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200",
          children: "Dashboard"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: isAuthenticated && user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: userRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setUserMenuOpen(!userMenuOpen),
          className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-700 font-semibold text-sm", children: user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase() }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-900", children: user.name || user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-1.5 py-0.5 rounded-full font-medium ${user.role === "employer" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`, children: user.role === "employer" ? "Delodajalec" : "Kandidat" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
          ]
        }
      ),
      userMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link$1,
          {
            to: "/hub/dashboard",
            className: "flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50",
            onClick: () => setUserMenuOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" }) }),
              "Dashboard"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link$1,
          {
            to: "/hub/inbox",
            className: "flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50",
            onClick: () => setUserMenuOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" }) }),
              "Predalnik"
            ]
          }
        ),
        user.role === "candidate" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link$1,
          {
            to: `/cv/builder`,
            className: "flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50",
            onClick: () => setUserMenuOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
              "Moj CV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-gray-100 my-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              handleLogout();
              setUserMenuOpen(false);
            },
            className: "flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }),
              "Odjava"
            ]
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: loginRef, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setLoginDropdownOpen(!loginDropdownOpen),
            className: "px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200 flex items-center gap-1",
            children: [
              "Prijava",
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
            ]
          }
        ),
        loginDropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link$1,
            {
              to: "/auth/login",
              className: "flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50",
              onClick: () => setLoginDropdownOpen(false),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-green-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3.5 h-3.5 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }),
                "Kandidat"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link$1,
            {
              to: "/auth/employer/login",
              className: "flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50",
              onClick: () => setLoginDropdownOpen(false),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3.5 h-3.5 text-amber-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) }),
                "Delodajalec"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link$1,
        {
          to: "/auth/register",
          className: "btn-primary text-sm py-2",
          children: "Registracija"
        }
      )
    ] }) })
  ] }) }) });
}

function Loader({ message = "Nalagam..." }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm font-medium", children: message })
  ] });
}

const {Link} = await importShared('react-router-dom');

const stats = [
  { label: "Aktivnih razpisov", value: "1,200+" },
  { label: "Registriranih kandidatov", value: "8,500+" },
  { label: "Delodajalcev", value: "340+" },
  { label: "Uspešnih zaposlitev", value: "2,100+" }
];
const candidateFeatures = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
    title: "Iščite razpise",
    desc: "Filtrirajte po kategoriji, lokaciji, vrsti dela in izkušnjah."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
    title: "Ustvarite CV",
    desc: "Profesionalen življenjepis z možnostjo izvoza v PDF."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }),
    title: "Obvestila v realnem času",
    desc: "Bodite med prvimi obveščeni o novih priložnostih."
  }
];
const employerFeatures = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
    title: "Objavljajte razpise",
    desc: "Hitro in enostavno objavite prostá delovna mesta."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }) }),
    title: "Pregledujte CVje",
    desc: "Dostop do baze kandidatov in njihovih življenjepisov."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
    title: "Komunikacija",
    desc: "Pošiljajte povabila in upravljajte prijave iz enega mesta."
  }
];
const categories = [
  { name: "Tehnologija", count: 234, icon: "💻" },
  { name: "Finance", count: 87, icon: "📊" },
  { name: "Marketing", count: 112, icon: "📣" },
  { name: "Pravo", count: 45, icon: "⚖️" },
  { name: "Zdravstvo", count: 98, icon: "🏥" },
  { name: "Izobraževanje", count: 67, icon: "📚" }
];
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
          "1,200+ aktivnih razpisov"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl lg:text-6xl font-bold leading-tight mb-6", children: [
          "Najdi svojo naslednjo",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300", children: "priložnost" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-indigo-100 mb-10 leading-relaxed", children: "Povežite se z najboljšimi delodajalci v Sloveniji. Ustvarite profesionalen CV, iščite razpise in začnite novo poglavje vaše kariere danes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/jobs",
              className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
                "Išči delo"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/auth/employer/register",
              className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
                "Objavi razpis"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 1440 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z", fill: "#f9fafb" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gray-50 pt-12 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl lg:text-4xl font-bold text-indigo-600 mb-1", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500 font-medium", children: stat.label })
    ] }, stat.label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-3", children: "Poiščite delo po kategorijah" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-lg", children: "Izberite področje, ki vas zanima" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: `/jobs?category=${encodeURIComponent(cat.name)}`,
          className: "bg-white rounded-xl p-5 text-center hover:shadow-md hover:border-indigo-200 border border-gray-200 transition-all duration-200 group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: cat.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900 group-hover:text-indigo-600 text-sm mb-1 transition-colors", children: cat.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400", children: [
              cat.count,
              " razpisov"
            ] })
          ]
        },
        cat.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }),
          "Za kandidate"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Vaša kariera se začne tukaj" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-8 text-lg leading-relaxed", children: "Ustvarite izstopajočo kandidaturo in se povežite z delodajalci, ki iščejo prav vas." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 mb-8", children: candidateFeatures.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600", children: f.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900 mb-1", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500 text-sm", children: f.desc })
          ] })
        ] }, f.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/register", className: "btn-primary", children: "Registriraj se brezplačno" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", className: "btn-secondary", children: "Preglej razpise" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }),
          "Za delodajalce"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Najdite idealne kandidate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-8 text-lg leading-relaxed", children: "Dostopajte do bazena talentov in poiščite prave ljudi za vašo ekipo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 mb-8", children: employerFeatures.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600", children: f.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900 mb-1", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500 text-sm", children: f.desc })
          ] })
        ] }, f.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/employer/register", className: "btn-primary", children: "Začnite iskati talente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cv", className: "btn-secondary", children: "Preglej CVje" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-to-r from-indigo-600 to-indigo-700 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-white mb-4", children: "Pripravljeni za naslednji korak?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-indigo-100 mb-10", children: "Pridružite se tisočim, ki so že našli svojo naslednjo priložnost na JUB Jobs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/auth/register",
            className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg",
            children: "Ustvari račun"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/jobs",
            className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200",
            children: "Preglej razpise"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-gray-900 text-gray-400 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg", children: "JUB Jobs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "© 2024 JUB Jobs. Vse pravice pridržane." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Pogoji uporabe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Zasebnost" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Kontakt" })
      ] })
    ] }) }) })
  ] });
}

const React$2 = await importShared('react');

class ErrorBoundary extends React$2.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-red-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Prišlo je do napake" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mb-4", children: this.state.error?.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => window.location.reload(),
            className: "btn-primary",
            children: "Ponovno naloži"
          }
        )
      ] }) });
    }
    return this.props.children;
  }
}

const React$1 = await importShared('react');
const {Suspense} = React$1;

const {BrowserRouter,Routes,Route,Navigate} = await importShared('react-router-dom');
const AuthApp = React$1.lazy(() => __federation_method_getRemote("mfe_auth" , "./AuthApp").then(module=>__federation_method_wrapDefault(module, true)));
const JobsApp = React$1.lazy(() => __federation_method_getRemote("mfe_jobs" , "./JobsApp").then(module=>__federation_method_wrapDefault(module, true)));
const CVApp = React$1.lazy(() => __federation_method_getRemote("mfe_cv" , "./CVApp").then(module=>__federation_method_wrapDefault(module, true)));
const HubApp = React$1.lazy(() => __federation_method_getRemote("mfe_hub" , "./HubApp").then(module=>__federation_method_wrapDefault(module, true)));
function MFEWrapper({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}), children }) });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Landing, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/auth/*",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(MFEWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthApp, {}) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/jobs/*",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(MFEWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(JobsApp, {}) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/cv/*",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(MFEWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CVApp, {}) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/hub/*",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(MFEWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HubApp, {}) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) })
    ] }) })
  ] }) }) });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
