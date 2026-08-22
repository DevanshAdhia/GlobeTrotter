import React, { useState } from 'react';
import { Star } from 'lucide-react';

// Mock reviews for UI (Ideally this comes from package data or an API)
const mockReviews = [
  { id: 1, name: 'Ankita P.', date: 'Dec 2023', rating: 5, type: 'Family Trip', comment: 'Very well organized. The hotels were exactly as described.' },
  { id: 2, name: 'Rajiv S.', date: 'Nov 2023', rating: 4, type: 'Couples Trip', comment: 'Great itinerary. The driver was very polite and knowledgeable.' },
  { id: 3, name: 'Megha V.', date: 'Oct 2023', rating: 5, type: 'Friends Trip', comment: 'Loved the whole experience. Completely hassle-free.' }
];

const PackageReviews = ({ rating, reviewCount }) => {
  const [visible, setVisible] = useState(2);
  
  if (!rating || !reviewCount) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Traveller Reviews</h2>
      
      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl font-bold text-gray-900">{rating}</span>
        <div>
          <div className="flex text-accent mb-1">
            {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} />)}
          </div>
          <p className="text-sm text-gray-500 font-medium">Based on {reviewCount} reviews</p>
        </div>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockReviews.slice(0, visible).map(review => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center uppercase">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date} • {review.type}</p>
                </div>
              </div>
              <div className="flex text-accent">
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-current' : 'text-gray-300'}`} />)}
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {visible < mockReviews.length && (
        <button onClick={() => setVisible(v => v + 2)} className="mt-6 text-primary font-bold hover:underline focus:outline-none block w-full text-center">
          Load More Reviews
        </button>
      )}
    </section>
  );
};
export default PackageReviews;