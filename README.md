# MediTrack — Hospital Management Dashboard

A React (Vite) hospital management dashboard built as a learning project. It
covers a full front-end curriculum end-to-end in one working app: semantic
HTML5, CSS3 (box model, Flexbox, Grid, mobile-first responsive design), core
JavaScript through ES6+, DOM/events, browser storage, forms, and a complete
React app with hooks, routing, and protected/dynamic/nested routes.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

**Demo login:** `admin` / `admin123` (or `nurse` / `nurse123`)

## Project structure

```
src/
  main.jsx              Entry point, mounts <App /> inside <BrowserRouter>
  App.jsx                Route tree: public, protected, nested, dynamic, 404
  index.css               All styling: tokens, reset, Flexbox/Grid, media queries
  context/
    AuthContext.jsx       Login state lifted into Context (avoids prop drilling)
  hooks/
    useLocalStorage.js    Custom hook: persist state to localStorage as JSON
    usePatients.js         Custom hook: simulated fetch, useMemo/useCallback
  data/
    mockData.js             Mock "JSON" data: patients, appointments, staff
  utils/
    helpers.js               Pure ES6+ helper functions (format, filter, merge)
  components/
    Navbar.jsx, Layout.jsx, ProtectedRoute.jsx, NotFound.jsx
    Button.jsx, StatusPill.jsx, StatCard.jsx
    PatientCard.jsx, PatientList.jsx, FilterBar.jsx
  pages/
    Login.jsx, Dashboard.jsx, Patients.jsx, PatientDetail.jsx,
    Appointments.jsx, AddPatient.jsx
```

## Where each topic lives

| Topic | Where to look |
|---|---|
| HTML5 semantic tags & accessibility | `index.html`, `Layout.jsx` (`<header>`, `<nav>`, `<main>`, `<footer>`), skip link, `aria-*`, `<label>`s everywhere |
| Box model, Flexbox, Grid | `index.css` — `.app-header`/`.filter-bar` (flex), `.vitals-strip`/`.patient-grid` (grid) |
| Responsive / mobile-first / media queries | `index.css` bottom section — base styles are mobile, `min-width` queries layer up |
| JS basics (variables, functions, arrays, objects, loops) | `utils/helpers.js`, `data/mockData.js` |
| ES6+ (let/const, arrow fns, destructuring, spread/rest) | `utils/helpers.js`, `AuthContext.jsx` |
| Modules (import/export) | every file — all named/default exports & imports |
| Promises, async/await, fetch-style API | `hooks/usePatients.js` (`fetchPatientsFromServer`) |
| DOM/events, forms | `FilterBar.jsx`, `Login.jsx`, `AddPatient.jsx`, `PatientDetail.jsx` |
| Browser storage (JSON) | `hooks/useLocalStorage.js`, used by `AuthContext.jsx` |
| Controlled components | every `<input>`/`<select>`/`<textarea>` in the pages above |
| React basics, JSX, props, state | all `components/` and `pages/` |
| Lists & conditional rendering | `PatientList.jsx`, `Dashboard.jsx` |
| useState / useEffect / useRef / useMemo / useCallback | `usePatients.js`, `FilterBar.jsx`, `Login.jsx` |
| Custom hooks | `useLocalStorage.js`, `usePatients.js` |
| Component composition / reusable UI | `Button.jsx`, `StatCard.jsx`, `StatusPill.jsx` |
| Lifting state up / prop drilling | `Layout.jsx` (owns patient data, passes via `Outlet context`) vs. `AuthContext.jsx` (Context API) |
| React Router: nested, dynamic, protected, 404 | `App.jsx`, `ProtectedRoute.jsx`, `PatientDetail.jsx` (`useParams`), `NotFound.jsx` |

## Interactive features

- **Live vitals monitor** — on a patient's detail page, heart rate/temp/SpO₂
  for non-stable patients drift in real time every ~2s (`useEffect` +
  `setInterval`), with a pulsing "Live" indicator.
- **Clickable stats & ward rows** — dashboard stat cards and ward-occupancy
  rows are buttons that jump straight to a pre-filtered patient list.
- **Expandable patient cards** — "Quick vitals" toggles inline detail
  without leaving the list (local `useState`, no navigation).
- **Sortable appointments table** — click any column header to sort
  ascending/descending; today's appointments are highlighted.
- **Toast notifications** — a `ToastContext` shows success/error/info toasts
  for login, saving notes, admitting, and discharging patients.
- **Custom confirm dialog** — discharging a patient opens an accessible
  modal (`role="dialog"`, focus-on-open, Escape-to-close) instead of the
  browser's blocking `window.confirm`.
- **Light/dark theme toggle** — persisted with `useLocalStorage` and applied
  via a `data-theme` attribute + CSS variables (see `hooks/useTheme.js`).
- **Keyboard shortcut** — press `/` anywhere on the Patients page to jump
  focus into the search box; a live result count updates as you type.
- **Live clock** in the header, another small `setInterval` example.

## Notes

- All patient/appointment data is mocked in `src/data/mockData.js` — there is
  no real backend. `usePatients.js` simulates a network request with a
  `setTimeout`-based Promise so you can see loading states and async/await
  in action.
- Auth is a simple demo (`AuthContext.jsx`) — good for learning protected
  routes, not for production use.
