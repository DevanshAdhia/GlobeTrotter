/**
 * pages/Login/Login.jsx — Ajay Modi Travels Phase 11
 * Premium login page with Tailwind, form validation, mock auth.
 */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordField } from '../../components/auth/PasswordField';

const validate = (f) => {
  const e = {};
  if (!f.email.trim())                               e.email    = 'Please enter your email.';
  else if (!/\S+@\S+\.\S+/.test(f.email))           e.email    = 'Please enter a valid email address.';
  if (!f.password)                                   e.password = 'Please enter your password.';
  return e;
};

const FormField = ({ id, label, type = 'text', value, onChange, error, placeholder, autoComplete }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700">{label}</label>
    <input
      id={id} name={id} type={type} value={value} onChange={onChange}
      placeholder={placeholder} autoComplete={autoComplete}
      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:border-primary
        ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20'}`}
      aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && <p id={`${id}-error`} role="alert" className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const Login = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/';

  const [form,      setForm]      = useState({ email: '', password: '' });
  const [errors,    setErrors]    = useState({});
  const [dirty,     setDirty]     = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [apiError,  setApiError]  = useState('');

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (dirty) setErrors(validate(updated));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDirty(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setApiError('');
    try {
      const user = await authService.login(form.email, form.password);
      login(user);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Email or password is incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
        <p className="text-sm text-gray-500 mb-6">Login to continue your journey</p>

        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl mb-6"
            role="alert"
          >
            {apiError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField
            id="email" label="Email or Mobile Number" type="text"
            value={form.email} onChange={handleChange}
            error={errors.email} placeholder="Enter your email or mobile number"
            autoComplete="email"
          />
          <PasswordField
            id="password" name="password" label="Password"
            value={form.password} onChange={handleChange}
            error={errors.password} placeholder="Enter your password"
            autoComplete="current-password"
          />

          <div className="flex justify-between items-center py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1a66ff] focus:ring-[#1a66ff]" />
              <span className="text-sm text-gray-600 font-medium">Remember Me</span>
            </label>
            <Link to="/forgot-password" className="text-sm font-semibold text-[#1a66ff] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a66ff] hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>
            ) : 'Login'}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-semibold text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
            <span className="text-sm font-semibold text-gray-700">Facebook</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-[#1a66ff] hover:underline">Sign Up</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
