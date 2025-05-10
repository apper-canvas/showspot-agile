import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Sample event data - in a real app this would come from an API
const featuredEvents = [
  {
    id: 1,
    title: "Hamilton: The Musical",
    category: "Theater",
    date: "Fri, May 15, 2023 • 8:00 PM",
    venue: "Broadway Theater",
    price: "From $99",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 2,
    title: "Taylor Swift: The Eras Tour",
    category: "Concert",
    date: "Sat, Jun 10, 2023 • 7:30 PM",
    venue: "Madison Square Garden",
    price: "From $189",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 3,
    title: "NBA Finals: Lakers vs. Celtics",
    category: "Sports",
    date: "Sun, Jun 18, 2023 • 6:00 PM",
    venue: "Crypto.com Arena",
    price: "From $250",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: false
  },
  {
    id: 4,
    title: "Comic Con 2023",
    category: "Exhibition",
    date: "Jul 20-23, 2023 • All Day",
    venue: "Javits Center",
    price: "From $65",
    image: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 5,
    title: "The Weeknd: After Hours Tour",
    category: "Concert",
    date: "Fri, Jul 7, 2023 • 8:30 PM",
    venue: "Barclays Center",
    price: "From $129",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 6,
    title: "The Lion King",
    category: "Theater",
    date: "Multiple Dates",
    venue: "Minskoff Theatre",
    price: "From $89",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true
  }
];

const categories = [
  { id: 1, name: "All", icon: "Ticket" },
  { id: 2, name: "Movies", icon: "Film" },
  { id: 3, name: "Concerts", icon: "Music" },
  { id: 4, name: "Sports", icon: "Trophy" },
  { id: 5, name: "Theater", icon: "Theater" },
  { id: 6, name: "Comedy", icon: "Laugh" },
  { id: 7, name: "Exhibitions", icon: "LandPlot" }
];

const locations = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Kochi"
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(featuredEvents);
  
  // Icon declarations
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const SearchIcon = getIcon('Search');
  const TicketIcon = getIcon('Ticket');
  const MapIcon = getIcon('Map');
  const TagIcon = getIcon('Tag');
  const MusicIcon = getIcon('Music');
  const FilmIcon = getIcon('Film');
  const TrophyIcon = getIcon('Trophy');
  const TheaterIcon = getIcon('Theater');
  const LaughIcon = getIcon('Laugh');
  const LandPlotIcon = getIcon('LandPlot');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  // Apply filters
  useEffect(() => {
    let results = featuredEvents;
    
    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter(event => event.category === selectedCategory);
    }
    
    // Filter by location
    if (selectedLocation) {
      results = results.filter(event => event.venue.includes(selectedLocation));
    }
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredEvents(results);
  }, [selectedCategory, selectedLocation, searchTerm]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    toast.info(`Searching for "${searchTerm}"`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };
  
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'Ticket': return TicketIcon;
      case 'Film': return FilmIcon;
      case 'Music': return MusicIcon;
      case 'Trophy': return TrophyIcon;
      case 'Theater': return TheaterIcon;
      case 'Laugh': return LaughIcon;
      case 'LandPlot': return LandPlotIcon;
      default: return TicketIcon;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary-dark opacity-90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="Concert crowd" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 py-12 md:py-20 px-6 md:px-12 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Entertainment Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover concerts, movies, sports events, and more happening near you.
            </p>
            
            <form 
              onSubmit={handleSearch}
              className="bg-white/20 backdrop-blur-md p-2 md:p-3 rounded-xl flex flex-col md:flex-row gap-2 md:gap-3"
            >
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500" size={20} />
                <input
                  type="text"
                  placeholder="Search events, venues, or artists"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-white text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500" size={20} />
                <select
                  className="w-full py-3 pl-10 pr-8 rounded-lg bg-white text-surface-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Any Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn-accent py-3 px-6"
              >
                Find Events
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="mb-10">
        <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 md:gap-4">
          {categories.map(category => {
            const CategoryIcon = getIconComponent(category.icon);
            const isActive = selectedCategory === category.name;
            
            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-full flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <CategoryIcon size={18} />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </section>
      
      {/* Main Ticket Booking Feature */}
      <MainFeature />
      
      {/* Events Grid */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Events</h2>
          <a href="#" className="text-primary flex items-center gap-1 font-medium hover:underline">
            View all <ArrowRightIcon size={16} />
          </a>
        </div>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
            <svg
              className="mx-auto h-12 w-12 text-surface-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium">No events found</h3>
            <p className="mt-2 text-surface-500">Try adjusting your filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -5 }}
                className="rounded-xl overflow-hidden bg-white dark:bg-surface-800 shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 group"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 m-3">
                    <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-surface-500 mb-2 text-sm">
                    <CalendarIcon size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-surface-500 mb-4 text-sm">
                    <MapPinIcon size={16} className="mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-lg">{event.price}</div>
                    <button
                      className={`py-2 px-4 rounded-lg font-medium text-sm ${
                        event.available
                          ? 'btn-primary text-sm py-2 px-4'
                          : 'bg-surface-200 dark:bg-surface-700 text-surface-500 cursor-not-allowed'
                      }`}
                      disabled={!event.available}
                    >
                      {event.available ? 'Book Now' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}