import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileNavigation } from '../../components/profile/ProfileNavigation';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader />
        <ProfileNavigation />
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Profile;
