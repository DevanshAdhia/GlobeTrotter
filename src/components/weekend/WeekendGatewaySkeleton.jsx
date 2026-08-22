import React from 'react';

const WeekendGatewaySkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-pulse flex flex-col h-full">
      <div className="aspect-[4/3] bg-gray-200 w-full"></div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="w-2/3">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-6 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-3 mb-6 flex-1">
          <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div>
            <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 w-28 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
export default WeekendGatewaySkeleton;