export const destinations = [
  {
    slug: "australia",
    name: "Australia",
    category: "international",
    description: "Experience the iconic Sydney Opera House, Great Barrier Reef, pristine gold coast beaches, and exotic wildlife.",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600",
    image: [
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1600",
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600",
      "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=1600"
    ],
    rating: 4.9,
    reviewCount: 428,
    packageCount: 14,
    startingPrice: 89999,
    bestTime: "September to April",
    duration: "7 - 14 Days",
    idealFor: ["Couples", "Families", "Adventure Seekers"],
    overview: "Australia is an extraordinary land of world-renowned landmarks, pristine coastal vistas, and rich cultural heritage. Highlights include Sydney Harbour, the breathtaking Great Barrier Reef, the coastal Twelve Apostles along the Great Ocean Road, and encounters with iconic wildlife.",
    highlights: [
      { title: "Sydney Opera House & Harbour", desc: "Experience iconic architectural marvels and sunset cruises." },
      { title: "Great Barrier Reef Scuba & Snorkel", desc: "Dive into the world's largest coral reef ecosystem." },
      { title: "Great Ocean Road Drive", desc: "Scenic coastal drive past magnificent rock formations." },
      { title: "Gold Coast Surfers Paradise", desc: "Pristine sandy shores and thrilling theme parks." }
    ],
    experiences: [
      { name: "Snorkeling at Great Barrier Reef", tag: "Water Sport" },
      { name: "Sydney Harbour Helicopter Tour", tag: "Luxury" },
      { name: "Blue Mountains Nature Hike", tag: "Adventure" }
    ],
    inclusions: ["4-Star / 5-Star Hotel Stay", "Daily Buffet Breakfast", "Internal Airport Transfers", "Visa Processing Assistance", "Guided City Sightseeing"],
    exclusions: ["Personal Expenses", "International Airfare (Optional)", "Travel Insurance"],
    faqs: [
      { q: "Do Indian passport holders need a visa for Australia?", a: "Yes, Indian travelers require a subclass 600 Tourist Visa prior to departure. Ajay Modi Travels provides full visa documentation assistance." },
      { q: "What is the best month to visit Sydney and Great Barrier Reef?", a: "September through April offers warm sunny weather ideal for sightseeing, reef diving, and coastal drives." }
    ],
    related: ["dubai", "bali", "singapore", "thailand"]
  },
  {
    slug: "dubai",
    name: "Dubai",
    category: "international",
    description: "Futuristic skyscrapers, luxury shopping malls, dune bashing, and world-class theme parks.",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600",
    image: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1600"
    ],
    rating: 4.8,
    reviewCount: 512,
    packageCount: 22,
    startingPrice: 45999,
    bestTime: "November to March",
    duration: "5 - 7 Days",
    idealFor: ["Families", "Couples", "Shopping Enthusiasts"],
    overview: "Dubai is a glittering metropolis known for ultra-modern architecture, lively nightlife, desert safaris, and high-end shopping. Stand atop the Burj Khalifa, explore Dubai Mall, and enjoy dune bashing in the golden Arabian desert.",
    highlights: [
      { title: "Burj Khalifa 124th Floor View", desc: "Panoramas from the tallest building in the world." },
      { title: "Desert Safari & BBQ Dinner", desc: "Thrilling 4x4 dune bashing with live cultural performances." },
      { title: "Marina Sunset Cruise", desc: "Luxury Dhow cruise with international dinner buffet." }
    ],
    experiences: [
      { name: "Desert Safari Dune Bashing", tag: "Adventure" },
      { name: "Burj Khalifa At The Top", tag: "Sightseeing" }
    ],
    inclusions: ["4-Star Hotel Stay", "Daily Breakfast & Dinners", "Desert Safari Ticket", "Burj Khalifa Entry", "Visa Assistance"],
    exclusions: ["Personal Expenses", "Tourism Dirham Fee"],
    faqs: [
      { q: "Is a visa required for Dubai?", a: "Yes, we provide 30-day single entry eVisa processing for all Indian travelers." }
    ],
    related: ["australia", "bali", "singapore"]
  },
  {
    slug: "bali",
    name: "Bali",
    category: "international",
    description: "Lush terraced rice fields, ancient cliffside temples, crystal clear beaches, and serene spas.",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600",
    image: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600"
    ],
    rating: 4.9,
    reviewCount: 680,
    packageCount: 18,
    startingPrice: 38999,
    bestTime: "April to October",
    duration: "6 - 8 Days",
    idealFor: ["Honeymooners", "Nature Lovers", "Relaxation"],
    overview: "Bali is Indonesia's tropical paradise offering serene beach resorts, volcanic landscapes, vibrant night markets, and spiritual temple retreats in Ubud.",
    highlights: [
      { title: "Ubud Rice Terraces & Jungle Swing", desc: "Iconic lush green vistas and thrilling swings." },
      { title: "Tanah Lot Cliff Temple Sunset", desc: "Breathtaking ocean views at sacred temples." }
    ],
    experiences: [
      { name: "Floating Breakfast Experience", tag: "Luxury" },
      { name: "Nusa Penida Island Tour", tag: "Adventure" }
    ],
    inclusions: ["Private Pool Villa / 4-Star Resort", "Daily Breakfast", "Airport Transfers", "Kintamani Tour"],
    exclusions: ["Personal Expenses", "Flight Tickets"],
    faqs: [
      { q: "Is Bali good for honeymoons?", a: "Bali is one of the top rated honeymoon destinations worldwide with romantic private pool villas and beach dinners." }
    ],
    related: ["thailand", "maldives", "australia"]
  },
  {
    slug: "goa",
    name: "Goa",
    category: "domestic",
    description: "Experience the vibrant beaches, rich heritage, and lively culture of Goa.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974",
    image: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974"],
    placeIds: ["baga-beach", "calangute-beach", "fort-aguada"],
    activityIds: ["sunset-cruise", "water-sports"],
    packageCount: 20,
    startingPrice: 7499,
    bestTime: "October to March",
    duration: "3 - 5 Days",
    idealFor: ["Friends", "Couples", "Beach Lovers"],
    overview: "Goa is India's sunshine state known for endless sandy beaches, Portuguese heritage churches, lively beach shacks, and exhilarating water sports.",
    highlights: [
      { title: "Baga & Calangute Beaches", desc: "Golden sands and active watersports." },
      { title: "Dudhsagar Waterfalls Tour", desc: "Four-tiered waterfall in lush jungle." }
    ],
    experiences: [
      { name: "Mandovi River Sunset Cruise", tag: "Leisure" },
      { name: "Parasailing & Jet Ski", tag: "Adventure" }
    ],
    inclusions: ["3-Star / 4-Star Hotel Stay", "Daily Breakfast", "South Goa Sightseeing Tour", "Mandovi Cruise"],
    exclusions: ["Water Sports Fee", "Personal Expenses"],
    faqs: [{ q: "What is the best season to visit Goa?", a: "November to February has pleasant cool breeze and active nightlife." }],
    related: ["kerala", "kashmir", "rajasthan"]
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    category: "domestic",
    description: "Discover the paradise on earth with snow-capped mountains and serene lakes.",
    heroImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2070",
    image: ["https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2070"],
    placeIds: ["dal-lake", "gulmarg", "pahalgam"],
    activityIds: ["shikara-ride", "gondola-ride"],
    packageCount: 12,
    startingPrice: 12999,
    bestTime: "March to October",
    duration: "5 - 7 Days",
    idealFor: ["Families", "Couples", "Honeymooners"],
    overview: "Kashmir captivates with serene Dal Lake Shikara rides, snow activities in Gulmarg, pine valleys of Pahalgam, and crisp mountain air.",
    highlights: [
      { title: "Dal Lake Houseboat Stay", desc: "Experience traditional luxury on water." },
      { title: "Gulmarg Gondola Ride", desc: "Asia's highest cable car ride with snow views." }
    ],
    experiences: [{ name: "Shikara Ride at Sunset", tag: "Romance" }],
    inclusions: ["Deluxe Houseboat & Hotel Stay", "Breakfast & Dinner", "Shikara Ride", "All Transfers"],
    exclusions: ["Gondola Ticket", "Pony Rides"],
    faqs: [{ q: "Is Kashmir safe for families?", a: "Yes, Kashmir is a major tourist destination welcoming hundreds of thousands of happy families each year." }],
    related: ["himachal", "uttarakhand", "goa"]
  },
  {
    slug: "kerala",
    name: "Kerala",
    category: "domestic",
    description: "God's Own Country with serene backwaters and lush green landscapes.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000",
    image: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000"],
    placeIds: ["munnar", "alleppey"],
    activityIds: ["houseboat"],
    packageCount: 18,
    startingPrice: 11499,
    bestTime: "September to March",
    duration: "5 - 8 Days",
    idealFor: ["Families", "Honeymooners", "Nature Lovers"],
    overview: "Kerala beckons with misty tea gardens of Munnar, traditional Kettuvallam houseboats in Alleppey backwaters, and pristine Kovalam beaches.",
    highlights: [
      { title: "Munnar Tea Gardens", desc: "Rolling emerald hills and tea factory tours." },
      { title: "Alleppey Backwater Cruise", desc: "Overnight stay on a deluxe private houseboat." }
    ],
    experiences: [{ name: "Overnight Houseboat Stay", tag: "Luxury" }],
    inclusions: ["Resort & Houseboat Stay", "Breakfast & Dinner", "AC Private Cab Transfers"],
    exclusions: ["Personal Expenses", "Entry Fees"],
    faqs: [{ q: "Can we get vegetarian Gujarati/Indian meals in Kerala?", a: "Yes, all our Kerala tour packages include authentic pure-veg or Jain food options." }],
    related: ["kashmir", "goa", "himachal"]
  },
  {
    slug: "himachal",
    name: "Himachal Pradesh",
    category: "domestic",
    description: "Experience the majestic Himalayas, pine forests, and beautiful mountain valleys.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000",
    image: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000"],
    placeIds: ["shimla", "manali"],
    activityIds: ["trekking"],
    packageCount: 15,
    startingPrice: 9999,
    bestTime: "March to June / Dec to Feb",
    duration: "6 - 8 Days",
    idealFor: ["Families", "Couples", "Snow Lovers"],
    overview: "Himachal Pradesh features famous hill retreats Shimla and Manali, Solang Valley adventure sports, and snow-filled mountain vistas.",
    highlights: [
      { title: "Solang Valley Snow Sports", desc: "Paragliding, quad biking, and skiing." },
      { title: "Mall Road Shimla Walk", desc: "Heritage shopping and colonial charm." }
    ],
    experiences: [{ name: "Solang Valley Paragliding", tag: "Adventure" }],
    inclusions: ["3-Star Hotel Stay", "Breakfast & Dinner", "Volvo Bus / Cab Transfers"],
    exclusions: ["Activity Charges"],
    faqs: [{ q: "When does it snow in Manali?", a: "December to February is peak snow season in Manali and Solang Valley." }],
    related: ["kashmir", "rajasthan", "goa"]
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    category: "domestic",
    description: "Land of Kings featuring magnificent palaces, heritage forts, and desert safaris.",
    heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000",
    image: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000"],
    placeIds: ["jaipur", "udaipur"],
    activityIds: ["desert-safari"],
    packageCount: 16,
    startingPrice: 8999,
    bestTime: "October to March",
    duration: "5 - 8 Days",
    idealFor: ["Families", "Culture Enthusiasts", "History Buffs"],
    overview: "Rajasthan showcases royal grandeur in Amber Fort Jaipur, lake views in Udaipur, and golden sand dunes in Jaisalmer.",
    highlights: [
      { title: "Amber Fort & City Palace", desc: "Royal architecture of Pink City Jaipur." },
      { title: "Jaisalmer Desert Camping", desc: "Camel safari & Kalbelia dance under the stars." }
    ],
    experiences: [{ name: "Sam Sand Dunes Camel Safari", tag: "Culture" }],
    inclusions: ["Heritage Hotel & Desert Camp Stay", "Breakfast & Dinner", "Private Vehicle"],
    exclusions: ["Monument Entry Tickets"],
    faqs: [{ q: "What cities are included in the Royal Rajasthan tour?", a: "Typical circuits cover Jaipur, Jodhpur, Jaisalmer, and Udaipur." }],
    related: ["kashmir", "himachal", "goa"]
  }
];