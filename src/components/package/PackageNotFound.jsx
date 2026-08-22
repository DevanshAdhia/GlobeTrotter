import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import Container from '../common/Container';

const PackageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-24 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Package not found</h2>
        <p className="text-gray-500 mb-8">We couldn't find the package you're looking for.</p>
        <button onClick={() => navigate('/domestic-destinations')} className="w-full bg-primary text-white hover:bg-primary-dark font-medium py-3 rounded-xl transition-colors">
          Explore Packages
        </button>
      </div>
    </Container>
  );
};
export default PackageNotFound;