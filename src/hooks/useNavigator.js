/**
 * hooks/useNavigator.js
 * Wraps react-router-dom navigation hooks with helpers.
 * Use this instead of importing from react-router-dom directly.
 */
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

/**
 * useNavigator — navigation + route utilities in one hook
 *
 * @example
 * const { goTo, goBack, params, query, setQuery, location } = useNavigator();
 * goTo('/trips/123');
 * goTo('/dashboard', { replace: true });
 * const tripId = params.id;
 * const tab = query.get('tab');
 */
export const useNavigator = () => {
  const navigate       = useNavigate();
  const params         = useParams();
  const location       = useLocation();
  const [query, setQueryRaw] = useSearchParams();

  /** Navigate to a path */
  const goTo = (path, options = {}) => navigate(path, options);

  /** Go back in browser history */
  const goBack = () => navigate(-1);

  /** Replace current history entry */
  const replaceTo = (path) => navigate(path, { replace: true });

  /** Update a single query-string key without removing others */
  const setQuery = (key, value) => {
    const next = new URLSearchParams(query);
    if (value === null || value === undefined || value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setQueryRaw(next, { replace: true });
  };

  /** Update multiple query-string keys at once */
  const setQueries = (obj) => {
    const next = new URLSearchParams(query);
    Object.entries(obj).forEach(([k, v]) => {
      if (v === null || v === undefined || v === '') next.delete(k);
      else next.set(k, String(v));
    });
    setQueryRaw(next, { replace: true });
  };

  /** Clear all query params */
  const clearQuery = () => setQueryRaw({}, { replace: true });

  return {
    goTo,
    goBack,
    replaceTo,
    params,
    location,
    query,
    setQuery,
    setQueries,
    clearQuery,
    pathname: location.pathname,
  };
};

export default useNavigator;
