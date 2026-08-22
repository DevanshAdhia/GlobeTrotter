import React from 'react';

const DestinationCardSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200 w-full"></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="w-2/3">
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-6 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full my-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div>
            <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
export default DestinationCardSkeleton;