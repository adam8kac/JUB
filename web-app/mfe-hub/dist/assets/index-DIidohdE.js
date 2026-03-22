import { importShared } from './__federation_fn_import-BgoDX5MY.js';
import HubApp, { j as jsxRuntimeExports } from './__federation_expose_HubApp-Cr5H4-E3.js';
import { r as reactDomExports } from './index-COvqqES_.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const React = await importShared('react');
const {BrowserRouter} = await importShared('react-router-dom');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HubApp, {}) }) })
);
