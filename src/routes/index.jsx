/**
 * routes/index.jsx — Ajay Modi Travels
 * Single source of truth for all app routes.
 */
import { lazy, Suspense } from 'react';

/* Eager-loaded public pages */
import Home                      from '../pages/Home/Home';
import DomesticDestinations      from '../pages/DomesticDestinations/DomesticDestinations';
import InternationalDestinations from '../pages/InternationalDestinations/InternationalDestinations';
import WeekendGateways           from '../pages/WeekendGateways/WeekendGateways';
import DestinationDetails        from '../pages/DestinationDetails/DestinationDetails';
import PackageDetails            from '../pages/PackageDetails/PackageDetails';

/* Phase 11 Auth — eager (needed immediately) */
import Login          from '../pages/Login/Login';
import Signup         from '../pages/Signup/Signup';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

import PlaceholderPage from '../components/ui/PlaceholderPage';

/* Lazy pages */
const PlanYourTrip   = lazy(() => import('../pages/PlanYourTrip/PlanYourTrip'));
const ReviewTrip     = lazy(() => import('../pages/ReviewTrip/ReviewTrip'));
const Discover       = lazy(() => import('../pages/Discover/Discover'));

/* Phase 11 Profile — lazy */
const Profile        = lazy(() => import('../pages/Profile/Profile'));
const ProfileOverview = lazy(() => import('../pages/Profile/ProfileOverview'));
const MyTrips        = lazy(() => import('../pages/Profile/MyTrips'));
const MyRequests     = lazy(() => import('../pages/Profile/MyRequests'));
const RequestDetails = lazy(() => import('../pages/Profile/RequestDetails'));
const SavedTrips     = lazy(() => import('../pages/Profile/SavedTrips'));
const Settings       = lazy(() => import('../pages/Profile/Settings'));


/**
 * PUBLIC_ROUTES — no auth required
 * PROTECTED_ROUTES — wrapped in ProtectedRoute, no admin AppLayout
 */
export const PUBLIC_ROUTES = [
  { path: '/',                               element: <Home /> },
  { path: '/domestic-destinations',          element: <DomesticDestinations /> },
  { path: '/international-destinations',     element: <InternationalDestinations /> },
  { path: '/weekend-gateways',               element: <WeekendGateways /> },
  { path: '/destinations/:slug',             element: <DestinationDetails /> },
  { path: '/packages/:slug',                 element: <PackageDetails /> },
  { path: '/login',                          element: <Login /> },
  { path: '/signup',                         element: <Signup /> },
  { path: '/forgot-password',                element: <ForgotPassword /> },
  { path: '/plan-your-trip/:destinationSlug/:packageSlug', element: <PlanYourTrip /> },
  { path: '/review-trip/:destinationSlug/:packageSlug',    element: <ReviewTrip /> },
  { path: '/discover/:destinationSlug',                    element: <Discover /> },
];

export const PROTECTED_ROUTES = [
  /* Phase 11 — Profile (horizontal tabs, no admin sidebar) */
  {
    path: '/profile',
    element: <Profile />,
    children: [
      { index: true,             element: <ProfileOverview /> },
      { path: 'my-trips',        element: <MyTrips /> },
      { path: 'requests',        element: <MyRequests /> },
      { path: 'requests/:requestId', element: <RequestDetails /> },
      { path: 'saved',           element: <SavedTrips /> },
      { path: 'settings',        element: <Settings /> },
      /* legacy compat */
      { path: 'bookings',        element: <MyRequests /> },
    ],
  },

  { path: '/settings',       element: <Settings /> },
];
