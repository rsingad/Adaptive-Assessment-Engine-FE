import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, User, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

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

  // Clear server-side error when user edits any field
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
    if (p.length < 6) return { label: 'Too short', color: 'bg-rose-500', width: '20%' };
    if (p.length < 8) return { label: 'Weak', color: 'bg-amber-500', width: '40%' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Fair', color: 'bg-yellow-400', width: '65%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  })();

  const InputField = ({ id, label, type, icon: Icon, field, placeholder, autoComplete, rightAction }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={form[field]}
          onChange={handleChange(field)}
          className={`w-full bg-slate-800/80 border rounded-xl py-3 pl-10 ${rightAction ? 'pr-10' : 'pr-4'} text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-brand-500 focus:border-brand-500/60 ${
            fieldErrors[field] ? 'border-rose-500/60' : 'border-slate-700 hover:border-slate-600'
          }`}
        />
        {rightAction}
      </div>
      {fieldErrors[field] && (
        <p className="text-xs text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" /> {fieldErrors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient gradients */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-xl shadow-brand-500/25 mb-4">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <BrainCircuit className="w-7 h-7 text-accent-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Create your account</h1>
          <p className="text-sm text-slate-400 mt-1">Join AdaptiLearn and start your adaptive journey</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-7 shadow-2xl shadow-black/30">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* API Error */}
            {authError && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" /> {authError}
              </div>
            )}

            {/* Name */}
            <InputField
              id="reg-name"
              label="Full Name"
              type="text"
              icon={User}
              field="name"
              placeholder="Jane Doe"
              autoComplete="name"
            />

            {/* Email */}
            <InputField
              id="reg-email"
              label="Email Address"
              type="email"
              icon={Mail}
              field="email"
              placeholder="you@example.com"
              autoComplete="email"
            />

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange('password')}
                  className={`w-full bg-slate-800/80 border rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-brand-500 focus:border-brand-500/60 ${
                    fieldErrors.password ? 'border-rose-500/60' : 'border-slate-700 hover:border-slate-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength meter */}
              {passwordStrength && (
                <div className="space-y-1">
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">{passwordStrength.label}</p>
                </div>
              )}
              {fieldErrors.password && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="reg-confirm" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="reg-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  className={`w-full bg-slate-800/80 border rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-brand-500 focus:border-brand-500/60 ${
                    fieldErrors.confirmPassword ? 'border-rose-500/60' : 'border-slate-700 hover:border-slate-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && !fieldErrors.confirmPassword && form.password === form.confirmPassword && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Passwords match
                </p>
              )}
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              loading={authLoading}
              disabled={authLoading}
              className="w-full mt-1"
            >
              Create Account
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-5">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
