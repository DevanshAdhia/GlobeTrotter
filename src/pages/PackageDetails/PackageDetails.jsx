import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';

import PackageHero from '../../components/package/PackageHero';
import PackageGallery from '../../components/package/PackageGallery';
import PackageQuickInfo from '../../components/package/PackageQuickInfo';
import PackageOverview from '../../components/package/PackageOverview';
import PackageHighlights from '../../components/package/PackageHighlights';
import PackageItinerary from '../../components/package/PackageItinerary';
import PackageHotels from '../../components/package/PackageHotels';
import PackageTravelOptions from '../../components/package/PackageTravelOptions';
import PackageCustomization from '../../components/package/PackageCustomization';
import PackageTravellerSelector from '../../components/package/PackageTravellerSelector';
import PackageDateSelector from '../../components/package/PackageDateSelector';
import PackagePricing from '../../components/package/PackagePricing';
import PackageInclusions from '../../components/package/PackageInclusions';
import PackageExclusions from '../../components/package/PackageExclusions';
import PackageCancellation from '../../components/package/PackageCancellation';
import PackageFAQ from '../../components/package/PackageFAQ';
import PackageReviews from '../../components/package/PackageReviews';
import RelatedPackages from '../../components/package/RelatedPackages';
import PackagePlanningCTA from '../../components/package/PackagePlanningCTA';
import PackageStickyCTA from '../../components/package/PackageStickyCTA';
import PackageSkeleton from '../../components/package/PackageSkeleton';
import PackageNotFound from '../../components/package/PackageNotFound';

import { packages } from '../../data/packages';

const PackageDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Planner State
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      try {
        const found = packages.find(p => p.slug === slug);
        if (found) {
          setData(found);
          document.title = `${found.name} | Tour Package | Ajay Modi Travels`;
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading package:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) return <><Topbar /><PackageSkeleton /><Footer /></>;
  if (error || !data) return <><Topbar /><PackageNotFound /><Footer /></>;

  // Breadcrumb
  let destLabel = data.destinationSlug.charAt(0).toUpperCase() + data.destinationSlug.slice(1);
  let parentLabel = 'Destinations';
  let parentPath = '/';
  if (data.category === 'domestic') { parentLabel = 'Domestic'; parentPath = '/domestic-destinations'; }
  if (data.category === 'international') { parentLabel = 'International'; parentPath = '/international-destinations'; }
  if (data.category === 'weekend') { parentLabel = 'Weekend'; parentPath = '/weekend-gateways'; }

  const breadcrumbs = [
    { label: parentLabel, path: parentPath },
    { label: destLabel, path: `/destinations/${data.destinationSlug}` },
    { label: data.name }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Topbar />
      <main className="flex-1 pb-20">
        <Breadcrumb items={breadcrumbs} />
        
        <Container className="pt-6">
          <PackageHero pkg={data} />
          <PackageGallery images={data.gallery} title={data.name} />
          <PackageQuickInfo pkg={data} />
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Left Column: Main Content */}
            <div className="w-full lg:w-[65%] xl:w-[70%]">
              <PackageOverview overview={data.overview} />
              <PackageHighlights highlights={data.highlights} />
              <PackageItinerary itinerary={data.itinerary} />
              <PackageHotels hotels={data.hotels} />
              <PackageTravelOptions options={data.travelOptions} />
              <PackageCustomization pkg={data} />
              <PackageInclusions inclusions={data.inclusions} />
              <PackageExclusions exclusions={data.exclusions} />
              <PackageCancellation policy={data.cancellationPolicy} />
              <PackageFAQ faqs={data.faqs} />
              <PackageReviews rating={data.rating} reviewCount={data.reviewCount} />
              <RelatedPackages currentSlug={data.slug} destinationSlug={data.destinationSlug} />
              <PackagePlanningCTA pkg={data} adults={adults} children={children} date={date} />
            </div>
            
            {/* Right Column: Sticky Booking Card */}
            <div className="w-full lg:w-[35%] xl:w-[30%] hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-6">
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Your Trip</h3>
                    <PackageDateSelector selectedDate={date} setSelectedDate={setDate} />
                    <div className="mt-4">
                      <PackageTravellerSelector adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} />
                    </div>
                  </div>
                </div>
                <PackagePricing pkg={data} adults={adults} children={children} date={date} />
              </div>
            </div>
          </div>
        </Container>
      </main>
      
      <PackageStickyCTA pkg={data} adults={adults} children={children} date={date} />
      <Footer />
    </div>
  );
};
export default PackageDetails;