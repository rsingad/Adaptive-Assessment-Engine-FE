import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, authLoading, authError, clearAuthError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [registeredMessage] = useState(location.state?.registered || false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/select-subject';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear API error when the user starts typing
  useEffect(() => {
    if (authError) clearAuthError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const result = await login({ email, password });
    if (result.success) {
      const destination = location.state?.from?.pathname || '/select-subject';
      navigate(destination, { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between px-4 sm:px-6 py-8 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-700/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Brand Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2 relative z-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-md shadow-brand-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-accent-400" />
            </div>
          </div>
          <span className="font-bold text-white tracking-tight text-base group-hover:text-brand-300 transition-colors">
            AdaptiLearn
          </span>
        </Link>

        <span className="text-xs text-slate-400">
          New student?{' '}
          <Link to="/register" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
            Create account
          </Link>
        </span>
      </header>

      {/* 2-Column Balanced Composition */}
      <div className="w-full max-w-5xl mx-auto my-auto py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Product Value Narrative (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 space-y-6 text-left pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              <span>Adaptive Diagnostic Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Sign in to continue your personalized learning path.
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed">
              Every question you answer calibrates your ability score and pinpoints conceptual gaps to accelerate mastery.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span>Resume active assessment sessions seamlessly</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span>View updated prerequisite maps and learning gap insights</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-none">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Welcome back
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Enter your credentials to access your diagnostic dashboard.
                </p>
              </div>

              {registeredMessage && (
                <Alert variant="success">
                  Account created successfully! Please sign in.
                </Alert>
              )}

              {authError && (
                <Alert variant="error">
                  {authError}
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Input
                  id="login-email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={fieldErrors.email}
                  required
                />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                    >
                      Password <span className="text-brand-400" aria-hidden="true">*</span>
                    </label>
                  </div>

                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Min. 6 characters"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={fieldErrors.password}
                    required
                    rightAction={
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  loading={authLoading}
                  disabled={authLoading}
                  className="w-full mt-2 cursor-pointer font-semibold"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-slate-500 py-2 relative z-10">
        <p>© 2026 AdaptiLearn. Educational Diagnostic Platform.</p>
      </footer>
    </div>
  );
}

export default Login;
