import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { requestStore } from '../../services/requestStore';
import { RequestCard } from '../../components/profile/RequestCard';
import { Link } from 'react-router-dom';
import { Compass, Briefcase, Heart } from 'lucide-react';

const ProfileOverview = () => {
  const { user } = useAuth();
  const requests = requestStore.getUserRequests(user?.id).slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'Traveller'}!</h2>
          <p className="text-gray-500">Ready for your next adventure? Explore your active trips and requests below.</p>
        </div>
        <Link to="/domestic-destinations" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">Plan a Trip</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="My Trips" value={0} icon={<Briefcase />} link="/profile/my-trips" />
        <StatCard title="Trip Requests" value={requests.length} icon={<Compass />} link="/profile/requests" />
        <StatCard title="Saved" value={0} icon={<Heart />} link="/profile/saved" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Requests</h3>
          <Link to="/profile/requests" className="text-primary font-semibold hover:underline">View All</Link>
        </div>
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map(req => <RequestCard key={req.requestId} request={req} />)}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4">You have no active trip requests.</p>
            <Link to="/domestic-destinations" className="text-primary font-bold hover:underline">Explore Destinations</Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, link }) => (
  <Link to={link} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </Link>
);

export default ProfileOverview;
