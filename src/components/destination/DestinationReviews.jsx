import React, { useState } from 'react';
import { Star } from 'lucide-react';

// Mock reviews for UI
const mockReviews = [
  { id: 1, name: 'Rahul S.', date: 'Oct 2023', rating: 5, type: 'Couples Trip', comment: 'Beautiful experience and excellent planning. The houseboat stay was magical.' },
  { id: 2, name: 'Priya M.', date: 'Sep 2023', rating: 4, type: 'Family Trip', comment: 'Great trip overall, though the weather was a bit unpredictable. Hotels were fantastic.' },
  { id: 3, name: 'Amit K.', date: 'Aug 2023', rating: 5, type: 'Friends Trip', comment: 'Loved every bit of it! The gondola ride is a must do.' },
  { id: 4, name: 'Neha V.', date: 'Jul 2023', rating: 5, type: 'Solo Trip', comment: 'Felt completely safe and everything was arranged perfectly.' },
  { id: 5, name: 'Vikram D.', date: 'Jun 2023', rating: 4, type: 'Family Trip', comment: 'Good food and sights. Slightly crowded during peak season.' }
];

const RatingBar = ({ stars, count, total }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center text-sm mb-2">
      <span className="w-8 text-gray-600 font-medium">{stars} <Star className="inline w-3 h-3 fill-current text-gray-400 mb-0.5" /></span>
      <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="w-8 text-right text-gray-500 text-xs">{percentage}%</span>
    </div>
  );
};

const DestinationReviews = ({ rating, reviewCount }) => {
  const [visible, setVisible] = useState(3);
  
  if (!rating || !reviewCount) {
    return (
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Traveller Reviews</h2>
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center text-gray-500">
          Traveller reviews will appear here.
        </div>
      </section>
    );
  }

  // Mock distribution
  const total = reviewCount;
  const dist = { 5: Math.floor(total * 0.7), 4: Math.floor(total * 0.2), 3: Math.floor(total * 0.05), 2: Math.floor(total * 0.03), 1: Math.floor(total * 0.02) };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Traveller Reviews</h2>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <div className="flex items-end mb-6">
              <span className="text-5xl font-bold text-gray-900 leading-none">{rating}</span>
              <div className="ml-4 pb-1">
                <div className="flex text-accent mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`w-5 h-5 ${s <= Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} />)}
                </div>
                <p className="text-sm text-gray-500 font-medium">{reviewCount} verified reviews</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-100">
              <RatingBar stars={5} count={dist[5]} total={total} />
              <RatingBar stars={4} count={dist[4]} total={total} />
              <RatingBar stars={3} count={dist[3]} total={total} />
              <RatingBar stars={2} count={dist[2]} total={total} />
              <RatingBar stars={1} count={dist[1]} total={total} />
            </div>
          </div>
        </div>
        
        <div className="lg:w-2/3">
          <div className="space-y-6">
            {mockReviews.slice(0, visible).map(review => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-3">
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
                    {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-current' : 'text-gray-300'}`} />)}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
          
          {visible < mockReviews.length && (
            <button onClick={() => setVisible(v => v + 3)} className="mt-8 text-primary font-bold hover:underline focus:outline-none w-full text-center">
              Load More Reviews
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
export default DestinationReviews;