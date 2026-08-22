/**
 * App.jsx — Ajay Modi Travels
 * Bootstraps: AuthProvider, BrowserRouter, react-hot-toast, Suspense, routes.
 */
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { AuthProvider }  from './context/AuthContext';
import { TripProvider }  from './context/TripContext';
import ProtectedRoute    from './components/auth/ProtectedRoute';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from './routes/index';

const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', flexDirection: 'column', gap: 16, background: '#fafafa',
  }}>
    <div style={{ fontSize: 36 }}>✈️</div>
    <div style={{
      width: 36, height: 36, border: '3px solid #e0eaff',
      borderTopColor: '#1d4ed8', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const NotFound = () => (
  <div style={{
    display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', gap: 16, background: '#fafafa',
  }}>
    <div style={{ fontSize: 56 }}>🧭</div>
    <h1 style={{ fontSize: 28, fontWeight: 800 }}>404 — Page not found</h1>
    <p style={{ color: '#64748b' }}>This destination doesn&apos;t exist.</p>
    <a href="/" style={{ color: '#1d4ed8', fontWeight: 600 }}>← Back to Home</a>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <BrowserRouter>
          <Toaster
          position="top-right"
          gutter={10}
          containerStyle={{ top: 72 }}
          toastOptions={{ duration: 3500 }}
        />

        <Routes>
          {/* Public routes */}
          {PUBLIC_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={
              <Suspense fallback={<PageLoader />}>{element}</Suspense>
            } />
          ))}

          {/* Protected routes — wrapped in ProtectedRoute */}
          {PROTECTED_ROUTES.map(({ path, element, children }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageLoader />}>{element}</Suspense>
                </ProtectedRoute>
              }
            >
              {children && children.map((child, idx) => (
                <Route
                  key={idx}
                  index={child.index}
                  path={child.path}
                  element={
                    <Suspense fallback={<PageLoader />}>{child.element}</Suspense>
                  }
                />
              ))}
            </Route>
          ))}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
