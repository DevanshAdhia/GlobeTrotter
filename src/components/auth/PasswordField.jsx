/**
 * components/auth/PasswordField.jsx
 * Password input with show/hide toggle and strength indicator.
 */
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const getStrength = (pwd) => {
  if (!pwd) return null;
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: 'Weak',   color: 'bg-red-400',    text: 'text-red-500',  width: 'w-1/4' };
  if (score <= 2) return { label: 'Medium', color: 'bg-amber-400',  text: 'text-amber-500', width: 'w-2/4' };
  if (score <= 3) return { label: 'Strong', color: 'bg-green-400',  text: 'text-green-600', width: 'w-3/4' };
  return              { label: 'Very Strong', color: 'bg-green-500', text: 'text-green-600', width: 'w-full' };
};

export const PasswordField = ({ id, name, label, value, onChange, error, autoComplete, showStrength = false, placeholder = 'Enter password' }) => {
  const [show, setShow] = useState(false);
  const strength = showStrength ? getStrength(value) : null;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm transition-colors outline-none
            focus:ring-2 focus:border-primary
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20'}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
        >
          {show ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* Strength indicator */}
      {showStrength && value && strength && (
        <div className="space-y-1">
          <div className="flex gap-1 h-1.5 mt-2">
            <div className={`rounded-full flex-1 transition-all ${strength.width.includes('1/4') || strength.width.includes('2/4') || strength.width.includes('3/4') || strength.width === 'w-full' ? strength.color : 'bg-gray-200'}`} />
            <div className={`rounded-full flex-1 transition-all ${['w-2/4','w-3/4','w-full'].includes(strength.width) ? strength.color : 'bg-gray-200'}`} />
            <div className={`rounded-full flex-1 transition-all ${['w-3/4','w-full'].includes(strength.width) ? strength.color : 'bg-gray-200'}`} />
            <div className={`rounded-full flex-1 transition-all ${strength.width === 'w-full' ? strength.color : 'bg-gray-200'}`} />
          </div>
          <p className={`text-xs font-semibold ${strength.text}`}>{strength.label}</p>
        </div>
      )}

      {/* Requirements */}
      {showStrength && (
        <ul className="text-xs text-gray-400 space-y-0.5 mt-1">
          <li className={value && value.length >= 8 ? 'text-green-600' : ''}>• At least 8 characters</li>
          <li className={value && /[A-Z]/.test(value) ? 'text-green-600' : ''}>• One uppercase letter</li>
          <li className={value && /[0-9]/.test(value) ? 'text-green-600' : ''}>• One number</li>
        </ul>
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};
