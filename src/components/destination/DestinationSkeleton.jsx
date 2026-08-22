import React from 'react';
import Container from '../common/Container';

const DestinationSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-100 border-b border-gray-200"></div>
      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-96 bg-gray-200 rounded-2xl w-full"></div>
            <div className="flex gap-2">
              <div className="h-20 w-32 bg-gray-200 rounded-xl"></div>
              <div className="h-20 w-32 bg-gray-200 rounded-xl"></div>
              <div className="h-20 w-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
          <div className="lg:w-[400px] xl:w-[480px]">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-24 bg-gray-200 rounded-xl mb-6"></div>
            <div className="h-16 bg-gray-200 rounded-xl w-full mb-4"></div>
            <div className="h-16 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default DestinationSkeleton;