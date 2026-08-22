/**
 * hooks/useToast.js
 * Wrapper around react-hot-toast with app-level presets.
 *
 * @example
 * const toast = useToast();
 * toast.success('Trip created!');
 * toast.error('Something went wrong.');
 * toast.loading('Saving...');
 * toast.info('Tip: you can drag activities.');
 * toast.promise(apiCall(), { loading: '...', success: 'Done!', error: 'Failed.' });
 */
import { toast as _toast } from 'react-hot-toast';

const DURATION = 3500;

const BASE_STYLE = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '14px',
  borderRadius: '10px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  maxWidth: '380px',
};

export const useToast = () => {
  const success = (message, opts) =>
    _toast.success(message, {
      duration: DURATION,
      style: { ...BASE_STYLE, background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' },
      iconTheme: { primary: '#16a34a', secondary: '#fff' },
      ...opts,
    });

  const error = (message, opts) =>
    _toast.error(message, {
      duration: DURATION + 1000,
      style: { ...BASE_STYLE, background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' },
      iconTheme: { primary: '#dc2626', secondary: '#fff' },
      ...opts,
    });

  const info = (message, opts) =>
    _toast(message, {
      duration: DURATION,
      icon: 'ℹ️',
      style: { ...BASE_STYLE, background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd' },
      ...opts,
    });

  const warning = (message, opts) =>
    _toast(message, {
      duration: DURATION,
      icon: '⚠️',
      style: { ...BASE_STYLE, background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' },
      ...opts,
    });

  const loading = (message, opts) =>
    _toast.loading(message, {
      style: { ...BASE_STYLE, background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0' },
      ...opts,
    });

  const dismiss = (id) => _toast.dismiss(id);

  const promise = (promiseFn, messages, opts) =>
    _toast.promise(promiseFn, messages, {
      style: BASE_STYLE,
      ...opts,
    });

  return { success, error, info, warning, loading, dismiss, promise };
};

export default useToast;
