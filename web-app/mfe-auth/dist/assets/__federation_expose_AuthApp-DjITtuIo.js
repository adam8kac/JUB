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
async function apiPost(path, body, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: getHeaders(auth),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const {useState: useState$3} = await importShared('react');

const {Link: Link$3,useNavigate: useNavigate$3} = await importShared('react-router-dom');
function decodeJwt$1(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
}
function CandidateLogin() {
  const navigate = useNavigate$3();
  const [email, setEmail] = useState$3("");
  const [password, setPassword] = useState$3("");
  const [loading, setLoading] = useState$3(false);
  const [error, setError] = useState$3("");
  const [showPassword, setShowPassword] = useState$3(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Prosimo izpolnite vsa polja.");
      return;
    }
    setLoading(true);
    try {
      const data = await apiPost("/auth/login", { email, password });
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        const claims = decodeJwt$1(data.accessToken);
        const userInfo = {
          id: String(data.user?.id || data.id || data.userId || claims.userId || claims.sub || ""),
          email,
          role: "candidate",
          name: data.user?.name || data.name || String(claims.name || "")
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("auth-change"));
        navigate("/hub/dashboard");
      } else {
        setError("Napaka pri prijavi. Preverite podatke.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Napaka pri prijavi.";
      setError(msg.includes("{") ? "Napaka pri prijavi. Preverite email in geslo." : msg);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-2xl mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Prijava za kandidate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: "Dobrodošli nazaj!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-200 p-8", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 text-sm", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Email naslov" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "input-field",
              placeholder: "ime@primer.si",
              autoComplete: "email",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Geslo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: "input-field pr-12",
                placeholder: "••••••••",
                autoComplete: "current-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "btn-primary w-full py-3 text-base",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin w-4 h-4", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Prijavljam..."
            ] }) : "Prijava"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 text-sm", children: [
        "Nimate računa?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link$3, { to: "/auth/register", className: "text-indigo-600 font-medium hover:text-indigo-700", children: "Registrirajte se" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm", children: [
        "Ste delodajalec?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link$3, { to: "/auth/employer/login", className: "text-amber-600 font-medium hover:text-amber-700", children: "Prijava za delodajalce" })
      ] })
    ] })
  ] }) });
}

const {useState: useState$2} = await importShared('react');

const {Link: Link$2,useNavigate: useNavigate$2} = await importShared('react-router-dom');
function CandidateRegister() {
  const navigate = useNavigate$2();
  const [name, setName] = useState$2("");
  const [email, setEmail] = useState$2("");
  const [password, setPassword] = useState$2("");
  const [confirmPassword, setConfirmPassword] = useState$2("");
  const [loading, setLoading] = useState$2(false);
  const [error, setError] = useState$2("");
  const [showPassword, setShowPassword] = useState$2(false);
  function validate() {
    if (!name.trim()) return "Prosimo vnesite ime.";
    if (!email.includes("@")) return "Prosimo vnesite veljaven email.";
    if (password.length < 6) return "Geslo mora imeti vsaj 6 znakov.";
    if (password !== confirmPassword) return "Gesli se ne ujemata.";
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const data = await apiPost("/auth/register", { email, password, name });
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        const userInfo = { id: data.id || data.userId || "", email, role: "candidate", name };
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("auth-change"));
        navigate("/hub/dashboard");
      } else if (data.id || data.userId) {
        navigate("/auth/login");
      } else {
        setError("Registracija ni uspela.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Napaka pri registraciji.";
      setError(msg.includes("{") ? "Napaka pri registraciji. Email morda že obstaja." : msg);
    } finally {
      setLoading(false);
    }
  }
  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Registracija za kandidate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: "Ustvarite brezplačen račun" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-200 p-8", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 text-sm", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Ime in priimek" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "input-field",
              placeholder: "Jana Novak",
              autoComplete: "name",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Email naslov" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "input-field",
              placeholder: "ime@primer.si",
              autoComplete: "email",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Geslo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: "input-field pr-12",
                placeholder: "Vsaj 6 znakov",
                autoComplete: "new-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] })
              }
            )
          ] }),
          password && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-1", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-1.5 flex-1 rounded-full transition-colors ${strength >= i ? strength === 1 ? "bg-red-400" : strength === 2 ? "bg-amber-400" : "bg-green-500" : "bg-gray-200"}`
              },
              i
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs ${strength === 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : "text-green-600"}`, children: strength === 1 ? "Šibko geslo" : strength === 2 ? "Zmerno geslo" : "Močno geslo" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Potrdi geslo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: showPassword ? "text" : "password",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              className: `input-field ${confirmPassword && confirmPassword !== password ? "border-red-300 focus:ring-red-500" : ""}`,
              placeholder: "Ponovi geslo",
              autoComplete: "new-password",
              required: true
            }
          ),
          confirmPassword && confirmPassword !== password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-red-600", children: "Gesli se ne ujemata" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "btn-primary w-full py-3 text-base",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin w-4 h-4", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Registriram..."
            ] }) : "Ustvari račun"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 text-sm", children: [
        "Že imate račun?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link$2, { to: "/auth/login", className: "text-indigo-600 font-medium hover:text-indigo-700", children: "Prijavite se" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm", children: [
        "Ste delodajalec?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link$2, { to: "/auth/employer/register", className: "text-amber-600 font-medium hover:text-amber-700", children: "Registracija za delodajalce" })
      ] })
    ] })
  ] }) });
}

const {useState: useState$1} = await importShared('react');

const {Link: Link$1,useNavigate: useNavigate$1} = await importShared('react-router-dom');
function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
}
function EmployerLogin() {
  const navigate = useNavigate$1();
  const [email, setEmail] = useState$1("");
  const [password, setPassword] = useState$1("");
  const [loading, setLoading] = useState$1(false);
  const [error, setError] = useState$1("");
  const [showPassword, setShowPassword] = useState$1(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Prosimo izpolnite vsa polja.");
      return;
    }
    setLoading(true);
    try {
      const data = await apiPost("/employer/login", { email, password });
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        const claims = decodeJwt(data.accessToken);
        const userInfo = {
          id: String(data.user?.id || data.employer?.id || data.id || data.userId || claims.userId || claims.sub || ""),
          email,
          role: "employer",
          name: data.user?.companyName || data.employer?.companyName || data.companyName || data.name || String(claims.name || email)
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("auth-change"));
        navigate("/hub/dashboard");
      } else {
        setError("Napaka pri prijavi. Preverite podatke.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Napaka pri prijavi.";
      setError(msg.includes("{") ? "Napaka pri prijavi. Preverite email in geslo." : msg);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-amber-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Prijava za delodajalce" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: "Upravljajte vaše razpise" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-200 p-8", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 text-sm", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Email naslov podjetja" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "input-field",
              placeholder: "info@podjetje.si",
              autoComplete: "email",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Geslo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: "input-field pr-12",
                placeholder: "••••••••",
                autoComplete: "current-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full py-3 text-base bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin w-4 h-4", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Prijavljam..."
            ] }) : "Prijava za delodajalce"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 text-sm", children: [
        "Nimate računa?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: "/auth/employer/register", className: "text-amber-600 font-medium hover:text-amber-700", children: "Registrirajte podjetje" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm", children: [
        "Ste kandidat?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: "/auth/login", className: "text-indigo-600 font-medium hover:text-indigo-700", children: "Prijava za kandidate" })
      ] })
    ] })
  ] }) });
}

const {useState} = await importShared('react');

const {Link,useNavigate} = await importShared('react-router-dom');
function EmployerRegister() {
  const navigate = useNavigate();
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  function validate() {
    if (!companyRegistrationNumber.trim()) return "Vnesite davčno/matično številko podjetja.";
    if (!email.includes("@")) return "Prosimo vnesite veljaven email.";
    if (password.length < 6) return "Geslo mora imeti vsaj 6 znakov.";
    if (password !== confirmPassword) return "Gesli se ne ujemata.";
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const data = await apiPost("/employer/register", { companyRegistrationNumber, email, password });
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        const userInfo = { id: data.id || data.userId || "", email, role: "employer", name: data.companyName || email };
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("auth-change"));
        navigate("/hub/dashboard");
      } else if (data.id || data.userId) {
        navigate("/auth/employer/login");
      } else {
        setError("Registracija ni uspela.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Napaka pri registraciji.";
      setError(msg.includes("{") ? "Napaka pri registraciji. Email morda že obstaja." : msg);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-amber-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Registracija podjetja" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: "Začnite iskati talente danes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-200 p-8", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 text-sm", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Davčna/matična številka podjetja" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: companyRegistrationNumber,
              onChange: (e) => setCompanyRegistrationNumber(e.target.value),
              className: "input-field",
              placeholder: "npr. SI12345678",
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-gray-400", children: "Vnesite davčno številko vašega podjetja" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Email naslov podjetja" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "input-field",
              placeholder: "info@podjetje.si",
              autoComplete: "email",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Geslo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: "input-field pr-12",
                placeholder: "Vsaj 6 znakov",
                autoComplete: "new-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "label", children: "Potrdi geslo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: showPassword ? "text" : "password",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              className: `input-field ${confirmPassword && confirmPassword !== password ? "border-red-300 focus:ring-red-500" : ""}`,
              placeholder: "Ponovi geslo",
              autoComplete: "new-password",
              required: true
            }
          ),
          confirmPassword && confirmPassword !== password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-red-600", children: "Gesli se ne ujemata" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-amber-50 rounded-lg border border-amber-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700", children: "Z registracijo se strinjate s pogoji uporabe platforme JUB Jobs. Vaši podatki bodo varno shranjeni." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full py-3 text-base bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin w-4 h-4", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Registriram..."
            ] }) : "Registracija podjetja"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 text-sm", children: [
        "Že imate račun?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/employer/login", className: "text-amber-600 font-medium hover:text-amber-700", children: "Prijavite se" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm", children: [
        "Iščete zaposlitev?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/register", className: "text-indigo-600 font-medium hover:text-indigo-700", children: "Registracija za kandidate" })
      ] })
    ] })
  ] }) });
}

const {Routes,Route,Navigate} = await importShared('react-router-dom');
function AuthApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CandidateLogin, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/register", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CandidateRegister, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/employer/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(EmployerLogin, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/employer/register", element: /* @__PURE__ */ jsxRuntimeExports.jsx(EmployerRegister, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/auth/login", replace: true }) })
  ] });
}

export { AuthApp as default, jsxRuntimeExports as j };
