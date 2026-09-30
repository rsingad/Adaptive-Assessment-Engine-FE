import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AssessmentProvider } from './context/AssessmentContext';
import ProtectedRoute from './components/ui/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectSubject from './pages/SelectSubject';
import Assessment from './pages/Assessment';
import Results from './pages/Results';

export function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider wraps everything so any component can access user/auth state */}
      <AuthProvider>
        {/* AssessmentProvider scoped inside — can read auth context if needed in Phase 3 */}
        <AssessmentProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes — require authentication */}
            <Route
              path="/select-subject"
              element={
                <ProtectedRoute>
                  <SelectSubject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessment"
              element={
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AssessmentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
