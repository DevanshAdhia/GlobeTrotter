import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration/401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and optionally redirect to login
      localStorage.removeItem('token');
      // If we are not already on the login page, redirect
      if (window.location.pathname !== '/login' && !window.location.pathname.startsWith('/admin')) {
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const adminAPI = {
  getDashboardMetrics: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  updateUserStatus: (id, statusData) => api.put(`/admin/users/${id}/status`, statusData),
  getTrips: () => api.get('/admin/trips'),
  deleteTrip: (id) => api.delete(`/admin/trips/${id}`),
  getCities: () => api.get('/admin/cities'),
  createCity: (data) => api.post('/admin/cities', data),
  updateCity: (id, data) => api.put(`/admin/cities/${id}`, data),
  deleteCity: (id) => api.delete(`/admin/cities/${id}`),
  getActivities: () => api.get('/admin/activities'),
  createActivity: (data) => api.post('/admin/activities', data),
  updateActivity: (id, data) => api.put(`/admin/activities/${id}`, data),
  deleteActivity: (id) => api.delete(`/admin/activities/${id}`),
  getReports: () => api.get('/admin/reports'),
  updateReportStatus: (id, statusData) => api.put(`/admin/reports/${id}/status`, statusData),
};

export const tripsAPI = {
  listTrips: () => api.get('/trips'),
  createTrip: (data) => api.post('/trips', data),
  getTrip: (id) => api.get(`/trips/${id}`),
  updateTrip: (id, data) => api.put(`/trips/${id}`, data),
  deleteTrip: (id) => api.delete(`/trips/${id}`),
  publishTrip: (id) => api.post(`/trips/${id}/publish`),
  addStop: (tripId, data) => api.post(`/trips/${tripId}/stops`, data),
  getCalendar: (tripId) => api.get(`/trips/${tripId}/calendar`),
};

export const discoveryAPI = {
  listCities: (params) => api.get('/cities', { params }),
  getCity: (id) => api.get(`/cities/${id}`),
  listActivities: (params) => api.get('/activities', { params }),
  getActivity: (id) => api.get(`/activities/${id}`),
};

export default api;
