import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, FileText, Heart, Settings } from 'lucide-react';

const TABS = [
  { to: '/profile',          label: 'Overview',  icon: LayoutDashboard, end: true },
  { to: '/profile/my-trips', label: 'My Trips',  icon: Map },
  { to: '/profile/requests', label: 'Requests',  icon: FileText },
  { to: '/profile/saved',    label: 'Saved',     icon: Heart },
  { to: '/profile/settings', label: 'Settings',  icon: Settings },
];

export const ProfileNavigation = () => (
  <nav
    aria-label="Profile navigation"
    className="flex gap-1 overflow-x-auto scrollbar-hide border-b border-gray-100 bg-white rounded-xl px-2"
    style={{ scrollbarWidth: 'none' }}
  >
    {TABS.map(({ to, label, icon: Icon, end }) => (
      <NavLink
        key={to} to={to} end={end}
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t-lg
           ${isActive
             ? 'border-primary text-primary'
             : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`
        }
      >
        <Icon className="w-4 h-4 shrink-0" />
        {label}
      </NavLink>
    ))}
  </nav>
);
