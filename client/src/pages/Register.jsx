import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, User, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';

export function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated, authLoading, authError, clearAuthError } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Already logged in? Skip to subject selection
  useEffect(() => {
    if (isAuthenticated) navigate('/select-subject', { replace: true });
  }, [isAuthenticated, navigate]);

  // Clear server-side error when user edits email or password
  useEffect(() => {
    if (authError) clearAuthError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.email, form.password]);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters.';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const result = await register(form);
    if (result.success) {
      navigate('/login', { state: { registered: true } });
    }
  }

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Too short', color: 'bg-rose-500', width: '25%' };
    if (p.length < 8) return { label: 'Weak', color: 'bg-amber-500', width: '50%' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Fair', color: 'bg-yellow-400', width: '75%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  })();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between px-4 sm:px-6 py-8 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-700/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-[120px] pointer-events-none" />

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
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
            Sign in
          </Link>
        </span>
      </header>

      {/* 2-Column Balanced Composition */}
      <div className="w-full max-w-5xl mx-auto my-auto py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Product Value Narrative (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 space-y-6 text-left pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Diagnostic Onboarding</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Create an account to start your adaptive journey.
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed">
              AdaptiLearn builds a personalized mastery profile that adapts continuously as your understanding progresses.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span>Instant diagnostic baseline assessment across STEM domains</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Pinpoint weak prerequisite concepts before they block growth</span>
              </div>
            </div>
          </div>

          {/* Right Column: Register Form Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-none">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Create your account
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Start identifying your learning gaps with adaptive testing.
                </p>
              </div>

              {authError && (
                <Alert variant="error">
                  {authError}
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                <Input
                  id="reg-name"
                  label="Full Name"
                  type="text"
                  icon={User}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange('name')}
                  error={fieldErrors.name}
                  required
                />

                <Input
                  id="reg-email"
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  error={fieldErrors.email}
                  required
                />

                <div className="space-y-1">
                  <Input
                    id="reg-password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    icon={Lock}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange('password')}
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

                  {passwordStrength && (
                    <div className="space-y-1 pt-1">
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: passwordStrength.width }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>Password Strength</span>
                        <span className="font-semibold text-slate-300">{passwordStrength.label}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <Input
                    id="reg-confirm"
                    label="Confirm Password"
                    type={showConfirm ? 'text' : 'password'}
                    icon={Lock}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    error={fieldErrors.confirmPassword}
                    required
                    rightAction={
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />

                  {form.confirmPassword && !fieldErrors.confirmPassword && form.password === form.confirmPassword && (
                    <p className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fade-in font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  loading={authLoading}
                  disabled={authLoading}
                  className="w-full mt-2 cursor-pointer font-semibold"
                >
                  Create Account
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

export default Register;
