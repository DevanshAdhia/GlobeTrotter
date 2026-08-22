import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import DestinationHero from '../../components/destination/DestinationHero';
import QuickDestinationInfo from '../../components/destination/QuickDestinationInfo';
import DestinationOverview from '../../components/destination/DestinationOverview';
import DestinationHighlights from '../../components/destination/DestinationHighlights';
import DestinationExperiences from '../../components/destination/DestinationExperiences';
import BestTimeToVisit from '../../components/destination/BestTimeToVisit';
import DestinationTravelInfo from '../../components/destination/DestinationTravelInfo';
import DestinationPackages from '../../components/destination/DestinationPackages';
import InclusionsExclusions from '../../components/destination/InclusionsExclusions';
import DestinationReviews from '../../components/destination/DestinationReviews';
import DestinationFAQ from '../../components/destination/DestinationFAQ';
import RelatedDestinations from '../../components/destination/RelatedDestinations';
import DestinationPlanningCTA from '../../components/destination/DestinationPlanningCTA';
import DestinationNotFound from '../../components/destination/DestinationNotFound';
import DestinationSkeleton from '../../components/destination/DestinationSkeleton';
import DestinationStickyCTA from '../../components/destination/DestinationStickyCTA';

import { destinations } from '../../data/destinations';
import { packages } from '../../data/packages';

const DestinationDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [destPackages, setDestPackages] = useState([]);

  useEffect(() => {
    // Reset state on slug change
    setLoading(true);
    setError(false);
    window.scrollTo(0, 0);

    // Simulate network fetch
    const timer = setTimeout(() => {
      try {
        const found = destinations.find(d => d.slug === slug);
        if (found) {
          setData(found);
          // Find packages for this destination
          const pkgs = packages.filter(p => p.destinationSlug === slug);
          setDestPackages(pkgs);
          // SEO
          document.title = `${found.name} Travel Guide & Tour Packages | Ajay Modi Travels`;
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading destination:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) return <><Topbar /><DestinationSkeleton /><Footer /></>;
  if (error || !data) return <><Topbar /><DestinationNotFound /><Footer /></>;

  // Build Breadcrumb dynamically
  let parentLabel = 'Destinations';
  let parentPath = '/';
  if (data.category === 'domestic') { parentLabel = 'Domestic'; parentPath = '/domestic-destinations'; }
  if (data.category === 'international') { parentLabel = 'International'; parentPath = '/international-destinations'; }
  if (data.category === 'weekend') { parentLabel = 'Weekend'; parentPath = '/weekend-gateways'; }

  const breadcrumbs = [
    { label: parentLabel, path: parentPath },
    { label: data.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />
      <main className="flex-1 pb-20">
        <Breadcrumb items={breadcrumbs} />
        
        <Container className="pt-6">
          <DestinationHero destination={data} />
          
          <div className="max-w-5xl mx-auto">
            <QuickDestinationInfo destination={data} />
            <DestinationOverview destination={data} />
            <DestinationHighlights highlights={data.highlights} />
            <DestinationExperiences experiences={data.experiences} />
            <BestTimeToVisit bestTime={data.bestTime} />
            <DestinationTravelInfo destination={data} />
            <DestinationPackages packages={destPackages} destinationName={data.name} destinationSlug={data.slug} />
            <InclusionsExclusions inclusions={data.inclusions} exclusions={data.exclusions} />
            <DestinationReviews rating={data.rating} reviewCount={data.reviewCount} />
            <DestinationFAQ faqs={data.faqs} />
            <RelatedDestinations relatedSlugs={data.related} currentCategory={data.category} />
            <DestinationPlanningCTA destination={data} />
          </div>
        </Container>
      </main>
      
      <DestinationStickyCTA destination={data} />
      <Footer />
    </div>
  );
};
export default DestinationDetails;