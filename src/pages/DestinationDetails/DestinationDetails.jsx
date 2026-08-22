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
import DestinationSkeleton from '../../components/destination/DestinationSkeleton';
import DestinationStickyCTA from '../../components/destination/DestinationStickyCTA';

import { destinations } from '../../data/destinations';
import { internationalDestinations } from '../../data/internationalDestinations';
import { domesticDestinations } from '../../data/domesticDestinations';
import { packages } from '../../data/packages';

const DestinationDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [destPackages, setDestPackages] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      try {
        // 1. Try finding in destinations.js
        let found = destinations.find(d => d.slug?.toLowerCase() === slug?.toLowerCase());
        
        // 2. Try finding in internationalDestinations.js
        if (!found) {
          const intl = internationalDestinations.find(d => d.slug?.toLowerCase() === slug?.toLowerCase());
          if (intl) {
            found = {
              slug: intl.slug,
              name: intl.name,
              category: 'international',
              description: intl.shortDescription,
              heroImage: intl.image,
              image: [intl.image, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600'],
              rating: intl.rating || 4.8,
              reviewCount: intl.reviewCount || 350,
              packageCount: intl.packageCount || 15,
              startingPrice: intl.startingPrice || 69999,
              bestTime: intl.bestSeason ? intl.bestSeason.join(', ') : 'Year Round',
              duration: intl.duration || '6 - 9 Days',
              idealFor: intl.bestFor || ['Families', 'Couples', 'Explorers'],
              overview: `${intl.name} is one of the world's most sought-after travel destinations offering iconic architecture, rich culture, and breathtaking landscapes.`,
              highlights: [
                { title: `Explore ${intl.name} Highlights`, desc: `Top rated sightseeing tours and iconic city attractions.` },
                { title: `Luxury Stay & Dining`, desc: `Curated 4-star and 5-star hotel accommodations.` }
              ],
              experiences: [
                { name: `${intl.name} Sightseeing Cruise`, tag: 'Luxury' },
                { name: `Guided Heritage Walk`, tag: 'Culture' }
              ],
              inclusions: ['4-Star / 5-Star Hotel Stay', 'Daily Breakfast', 'Airport Transfers', 'Visa Assistance'],
              exclusions: ['Personal Expenses', 'Flight Airfare (Optional)'],
              faqs: [
                { q: `What is the best time to visit ${intl.name}?`, a: `${intl.name} is ideal for travel during ${intl.bestSeason ? intl.bestSeason.join(', ') : 'the holiday season'}.` }
              ],
              related: ['dubai', "bali", "singapore", "australia"]
            };
          }
        }

        // 3. Fallback generator if slug not explicitly mapped
        if (!found && slug) {
          const formattedName = slug.charAt(0).toUpperCase() + slug.slice(1);
          found = {
            slug: slug,
            name: formattedName,
            category: 'international',
            description: `Discover breathtaking sights, rich heritage, and world-class luxury experiences in ${formattedName}.`,
            heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600',
            image: [
              'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1600',
              'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600'
            ],
            rating: 4.8,
            reviewCount: 290,
            packageCount: 10,
            startingPrice: 59999,
            bestTime: 'October to April',
            duration: '6 - 10 Days',
            idealFor: ['Families', 'Couples', 'Adventure Seekers'],
            overview: `${formattedName} offers an incredible mix of world-famous landmarks, vibrant culture, and unforgettable scenic landscapes.`,
            highlights: [
              { title: `${formattedName} Iconic Landmarks`, desc: `Guided tours of top attractions and scenic viewpoints.` },
              { title: `Local Cuisine & Shopping`, desc: `Immerse in authentic dining and vibrant night markets.` }
            ],
            experiences: [
              { name: `${formattedName} City Highlights Tour`, tag: 'Sightseeing' },
              { name: `Sunset Cruise & Dinner`, tag: 'Luxury' }
            ],
            inclusions: ['4-Star Hotel Accommodation', 'Daily Buffet Breakfast', 'Private Cab Airport Transfers', 'Visa Assistance'],
            exclusions: ['Personal Expenses', 'Optional Activities'],
            faqs: [
              { q: `How do I book a tour package for ${formattedName}?`, a: `You can select any package or click 'Enquire Now' to get custom itinerary options from our travel advisors.` }
            ],
            related: ['australia', 'dubai', 'bali', 'kashmir']
          };
        }

        if (found) {
          setData(found);
          const pkgs = packages.filter(p => p.destinationSlug?.toLowerCase() === slug?.toLowerCase());
          // If no specific packages found for this destination, provide default package cards
          if (pkgs.length > 0) {
            setDestPackages(pkgs);
          } else {
            setDestPackages([
              {
                id: `pkg-${slug}-1`,
                slug: `${slug}-family-special`,
                destinationSlug: slug,
                title: `${found.name} Highlights & Explorer Package`,
                name: `${found.name} Highlights & Explorer Package`,
                duration: "7 Days / 6 Nights",
                rating: 4.9,
                price: found.startingPrice || 65000,
                originalPrice: (found.startingPrice || 65000) * 1.2,
                image: found.heroImage || "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800",
                type: found.category || "international",
                tags: ["Bestseller", "Family"],
                includedPlaces: ["city-tour", "harbour-cruise"],
                includedActivities: ["guided-sightseeing"]
              }
            ]);
          }
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
    }, 400);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) return <><Topbar /><DestinationSkeleton /><Footer /></>;
  if (error || !data) return <><Topbar /><DestinationNotFound /><Footer /></>;

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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
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