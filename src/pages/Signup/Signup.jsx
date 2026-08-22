/**
 * pages/Signup/Signup.jsx — Ajay Modi Travels Phase 11
 */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { requestStore } from '../../services/requestStore';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordField } from '../../components/auth/PasswordField';

const validate = (f) => {
  const e = {};
  if (!f.firstName.trim()) e.firstName = 'First name is required.';
  if (!f.lastName.trim())  e.lastName  = 'Last name is required.';
  if (!f.email.trim())     e.email     = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Please enter a valid email.';
  if (!f.password)                       e.password = 'Password is required.';
  else if (f.password.length < 8)        e.password = 'Minimum 8 characters.';
  if (f.confirm !== f.password)          e.confirm  = 'Passwords do not match.';
  if (!f.terms)                          e.terms    = 'Please accept the terms.';
  return e;
};

const Field = ({ id, label, type = 'text', value, onChange, error, placeholder, autoComplete }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700">{label}</label>
    <input
      id={id} name={id} type={type} value={value} onChange={onChange}
      placeholder={placeholder} autoComplete={autoComplete}
      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:border-primary
        ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20'}`}
      aria-invalid={!!error}
    />
    {error && <p role="alert" className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const Signup = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const pendingRequestId = location.state?.requestId;

  const [form, setForm]   = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', terms: false });
  const [errors, setErrors] = useState({});
  const [dirty, setDirty]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const updated = { ...form, [e.target.name]: value };
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
    try {
      const user = await authService.signup(form);
      login(user);
      // Associate any pending Phase 10 request
      if (pendingRequestId) requestStore.associateUser(user.id);
      toast.success(`Account created! Welcome, ${user.firstName}! 🎉`);
      navigate('/profile', { replace: true });
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    <AuthLayout>
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Create Your Account</h1>
        <p className="text-sm text-gray-500 mb-6">Sign up to start your travel journey</p>

        {pendingRequestId && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 mb-6">
            <p className="font-semibold">Almost there!</p>
            <p>Create an account to save and track your trip request <strong>{pendingRequestId}</strong>.</p>
          </div>
        )}

        {apiError && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl mb-5" role="alert">
            {apiError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Field id="firstName" label="Full Name" value={form.firstName} onChange={handleChange} error={errors.firstName} placeholder="Enter your full name" autoComplete="name" />
          
          <Field id="email" label="Email Address" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="Enter your email address" autoComplete="email" />
          
          <Field id="phone" label="Mobile Number" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="Enter your mobile number" autoComplete="tel" />
          
          <PasswordField id="password" name="password" label="Password" value={form.password} onChange={handleChange} error={errors.password} autoComplete="new-password" placeholder="Create a password" showStrength={false} />

          <label className="flex items-start gap-2 cursor-pointer pt-2">
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1a66ff] focus:ring-[#1a66ff]" />
            <span className="text-sm text-gray-600 font-medium">
              I agree to the <Link to="/terms" className="text-[#1a66ff] font-bold hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-[#1a66ff] font-bold hover:underline">Privacy Policy</Link>
            </span>
          </label>
          {errors.terms && <p role="alert" className="text-xs text-red-500 font-medium">{errors.terms}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full bg-[#1a66ff] hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm mt-4"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or sign up with</span>
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
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#1a66ff] hover:underline">Login</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
