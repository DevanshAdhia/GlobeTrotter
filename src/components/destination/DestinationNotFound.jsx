import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import Container from '../common/Container';

const DestinationNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-24 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Destination not found</h2>
        <p className="text-gray-500 mb-8">We couldn't find the destination you're looking for.</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/domestic-destinations')} className="bg-primary text-white hover:bg-primary-dark font-medium py-3 rounded-xl transition-colors">
            Back to Destinations
          </button>
          <button onClick={() => navigate('/')} className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium py-3 rounded-xl transition-colors">
            Go Home
          </button>
        </div>
      </div>
    </Container>
  );
};
export default DestinationNotFound;