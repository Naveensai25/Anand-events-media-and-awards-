import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [landmarkFilter, setLandmarkFilter] = useState(null);
  const statsRef = useRef(null);
  const [isStatsInView, setIsStatsInView] = useState(false);

  // Stats counter animation
  const [stats, setStats] = useState([
    { number: 0, label: "Plots Sold", target: 500 },
    { number: 0, label: "Legal Clearance", target: 100 },
    { number: 0, label: "Prime Locations", target: 15 },
    { number: 0, label: "Investment Value", target: 200, suffix: "Cr+" }
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isStatsInView) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            current = stat.target;
            clearInterval(timer);
          }
          setStats(prev => prev.map((s, i) => 
            i === index ? { ...s, number: Math.floor(current) } : s
          ));
        }, duration / steps);
      });
    }
  }, [isStatsInView]);

  // Toast notification
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential Plots' },
    { id: 'commercial', label: 'Commercial Plots' },
    { id: 'prime', label: 'Prime Locations' },
    { id: 'farm', label: 'Farm Lands' }
  ];

  const projects = [
    {
      id: 1,
      title: "Anand Prime Plots",
      type: "residential",
      location: "North City Extension",
      price: "₹25 L - ₹75 L",
      description: "Premium residential plots with Vastu-compliant layouts and modern infrastructure",
      features: ["30x40 to 60x90 Plots", "Wide Roads", "Underground Wiring", "Water Supply", "Security", "Park"],
      image: "https://estatedekho.s3.ap-south-1.amazonaws.com/images/properties/17155066476351/48991715506667-ananda-homes-bay-hills-2-bhk-apartment-in-narsingi-hyderabad-17155066476351.png",
      completion: "2023",
      units: "150",
      area: "1200 - 5400 sq.ft.",
      amenities: ["Clubhouse", "Children's Park", "Jogging Track", "24/7 Security"],
      highlights: ["Vastu Compliant", "Clear Titles", "Ready to Build", "Prime Location"],
      nearby: ["airport", "mall", "exhibition"]
    },
    {
      id: 2,
      title: "Business Park Commercial Plots",
      type: "commercial",
      location: "Central Business District",
      price: "₹1.5 Cr - ₹5 Cr",
      description: "Strategic commercial plots for offices, retail, and business establishments",
      features: ["50x80 to 100x150 Plots", "Main Road Facing", "High Visibility", "Ample Parking", "Commercial Power"],
      image: "https://images.jdmagicbox.com/v2/comp/hyderabad/u8/040pxx40.xx40.220122150713.g8u8/catalogue/pranava-the-business-park-kondapur-hyderabad-commercial-buildings-1oqpc31f8s-250.jpg",
      completion: "2024",
      units: "50",
      area: "4000 - 15000 sq.ft.",
      amenities: ["Wide Roads", "Street Lighting", "Drainage System", "Security"],
      highlights: ["High ROI", "Business Hub", "Infrastructure Ready", "Legal Clearance"],
      nearby: ["exhibition", "metro", "business"]
    },
    {
      id: 3,
      title: "Vastu Harmony Plots",
      type: "residential",
      location: "East City Corridor",
      price: "₹35 L - ₹90 L",
      description: "Residential plots designed with scientific Vastu principles for prosperous living",
      features: ["40x60 to 50x80 Plots", "Vastu Compliant", "Green Spaces", "Water Harvesting", "Solar Ready"],
      image: "https://bbgindia.com/assets/img/3aab3803-f238-4edb-8120-411ea7e36672_134072253074789816.jpeg",
      completion: "2022",
      units: "80",
      area: "2400 - 4000 sq.ft.",
      amenities: ["Meditation Park", "Temple", "Community Hall", "Rainwater Harvesting"],
      highlights: ["Positive Energy", "Health & Prosperity", "Eco-Friendly", "Peaceful Living"],
      nearby: ["tech", "school", "hospital"]
    },
    {
      id: 4,
      title: "Tech Corridor Commercial Plots",
      type: "commercial",
      location: "IT Expressway",
      price: "₹2 Cr - ₹8 Cr",
      description: "Commercial plots in the heart of IT corridor for tech companies and startups",
      features: ["60x100 to 80x120 Plots", "Fiber Optic Ready", "EV Charging", "Modern Infrastructure", "Zoning Approved"],
      image: "https://img.staticmb.com/mbimages/project/Photo_h470_w1080/2018/06/18/Project-Photo-2-Vasavi-MPM-Grand-Hyderabad-5116357_345_1366_470_1080.jpg.webp",
      completion: "2024",
      units: "35",
      area: "6000 - 9600 sq.ft.",
      amenities: ["High-Speed Internet", "Conference Facilities", "Food Court", "Ample Parking"],
      highlights: ["IT Zone", "Future Growth", "Premium Location", "Tech Infrastructure"],
      nearby: ["tech", "mall", "university"]
    },
    {
      id: 5,
      title: "Green Valley Farm Plots",
      type: "farm",
      location: "Outskirts - Serene Environment",
      price: "₹50 L - ₹2 Cr",
      description: "Luxury farm plots with organic farming potential and peaceful surroundings",
      features: ["1-5 Acre Plots", "Organic Farming", "Natural Water Source", "Farm House Approval", "Security"],
      image: "https://cdn-projects.gharpe.com/silpa-rrr-county-hyderabad/image/silpa_rrr_county3.jpeg",
      completion: "2021",
      units: "25",
      area: "1-5 Acres",
      amenities: ["Farmers Club", "Organic Store", "Irrigation System", "Storage Facilities"],
      highlights: ["Agricultural Use", "Weekend Home", "Investment Potential", "Natural Surroundings"],
      nearby: ["nature", "vineyard", "countryclub"]
    },
    {
      id: 6,
      title: "Metro Commercial Hub",
      type: "commercial",
      location: "Metro Station Road",
      price: "₹3 Cr - ₹15 Cr",
      description: "Premium commercial plots with metro connectivity and high footfall potential",
      features: ["30x60 to 60x90 Plots", "Metro Access", "High Footfall", "Multi-story Approval", "Prime Location"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500",
      completion: "2025",
      units: "40",
      area: "1800 - 5400 sq.ft.",
      amenities: ["Metro Connectivity", "Shopping Complex", "Banking Zone", "Restaurant Hub"],
      highlights: ["Metro Proximity", "Retail Hotspot", "High Appreciation", "Strategic Location"],
      nearby: ["metro", "mall", "business"]
    },
    {
      id: 7,
      title: "Lake View Premium Plots",
      type: "prime",
      location: "Lake Front Area",
      price: "₹75 L - ₹3 Cr",
      description: "Exclusive lake-facing plots with breathtaking views and luxury amenities",
      features: ["50x80 to 60x90 Plots", "Lake View", "Gated Community", "Premium Infrastructure", "Luxury Living"],
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
      completion: "2023",
      units: "30",
      area: "4000 - 5400 sq.ft.",
      amenities: ["Private Lake Access", "Boating Club", "Luxury Clubhouse", "Swimming Pool"],
      highlights: ["Lake View", "Luxury Segment", "Exclusive Community", "Premium Location"],
      nearby: ["lake", "golf", "hotel"]
    },
    {
      id: 8,
      title: "Industrial Zone Plots",
      type: "commercial",
      location: "Industrial Development Area",
      price: "₹1 Cr - ₹10 Cr",
      description: "Industrial plots with all necessary approvals and infrastructure for manufacturing units",
      features: ["100x150 to 200x300 Plots", "Industrial Power", "Water Supply", "Drainage", "Transport Access"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      completion: "2024",
      units: "20",
      area: "15000 - 60000 sq.ft.",
      amenities: ["Loading Bays", "Worker Facilities", "Security", "Fire Safety"],
      highlights: ["Industrial Use", "Government Approved", "Infrastructure Ready", "Growth Zone"],
      nearby: ["industrial", "freight", "highway"]
    },
    {
      id: 9,
      title: "Educational Hub Plots",
      type: "commercial",
      location: "University Road",
      price: "₹80 L - ₹4 Cr",
      description: "Commercial plots near educational institutions for hostels, bookstores, and coaching centers",
      features: ["40x60 to 60x80 Plots", "Student Hub", "High Demand", "Commercial Zone", "Parking Facilities"],
      image: "data:image/jpeg;base64,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",
      Completion:"2023",
      units: "45",
      area: "2400 - 4800 sq.ft.",
      amenities: ["Study Rooms", "Food Court", "Stationery Mall", "Library"],
      highlights: ["Education Zone", "Constant Demand", "High Rental Yield", "Student Population"],
      nearby: ["university", "college", "library"]
    },
    {
      id: 10,
      title: "Medical Corridor Plots",
      type: "commercial",
      location: "Hospital Street",
      price: "₹1.2 Cr - ₹6 Cr",
      description: "Strategic plots near medical facilities for clinics, pharmacies, and medical centers",
      features: ["30x40 to 50x80 Plots", "Medical Zone", "24/7 Access", "Ambulance Route", "Clean Environment"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500",
      completion: "2024",
      units: "30",
      area: "1200 - 4000 sq.ft.",
      amenities: ["Medical Waste Disposal", "Parking", "Emergency Access", "Pharmacy Zone"],
      highlights: ["Healthcare Hub", "Essential Services", "Stable Returns", "Growing Demand"],
      nearby: ["hospital", "medical", "diagnostic"]
    },
    {
      id: 11,
      title: "Entertainment District Plots",
      type: "commercial",
      location: "Amusement Park Road",
      price: "₹2 Cr - ₹12 Cr",
      description: "Plots in entertainment district for restaurants, gaming zones, and recreational facilities",
      features: ["40x60 to 80x120 Plots", "Entertainment Zone", "High Footfall", "Tourist Area", "Night Life"],
      image: "data:image/jpeg;base64,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",
      completion: "2024",
      units: "25",
      area: "2400 - 9600 sq.ft.",
      amenities: ["Parking for 100+", "Food Court", "Entertainment Area", "Security"],
      highlights: ["Tourist Destination", "Entertainment Hub", "High Revenue", "Prime Location"],
      nearby: ["wonderla", "multiplex", "foodstreet"]
    },
    {
      id: 12,
      title: "Airport City Plots",
      type: "prime",
      location: "Airport Road",
      price: "₹2.5 Cr - ₹20 Cr",
      description: "Premium plots near international airport for hotels, corporate offices, and luxury retail",
      features: ["50x80 to 100x150 Plots", "Airport Proximity", "Luxury Zone", "International Standards", "High Visibility"],
      image: "data:image/jpeg;base64,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",
      completion: "2025",
      units: "15",
      area: "4000 - 15000 sq.ft.",
      amenities: ["Helipad Approval", "Luxury Clubhouse", "Concierge Service", "Premium Security"],
      highlights: ["Airport Access", "Luxury Segment", "International Clientele", "Highest Appreciation"],
      nearby: ["airport", "hotel", "convention"]
    }
  ];

  // Calculate accurate project counts for each nearby area
  const getProjectCountForArea = (areaFilter) => {
    return projects.filter(project => 
      project.nearby.includes(areaFilter)
    ).length;
  };

  // Create nearby areas with accurate counts
  const nearbyAreasWithAccurateCounts = [
    {
      id: "airport",
      name: "International Airport",
      description: "Plots within 10km radius of international airport",
      projects: getProjectCountForArea("airport"),
      icon: "✈️",
      filter: "airport"
    },
    {
      id: "wonderla",
      name: "Wonderla Amusement Park",
      description: "Entertainment district with high tourist footfall",
      projects: getProjectCountForArea("wonderla"),
      icon: "🎢",
      filter: "wonderla"
    },
    {
      id: "exhibition",
      name: "Major Exhibition Centers",
      description: "Strategic locations near business and exhibition hubs",
      projects: getProjectCountForArea("exhibition"),
      icon: "🏛️",
      filter: "exhibition"
    },
    {
      id: "mall",
      name: "Shopping Malls",
      description: "Commercial plots in retail and shopping districts",
      projects: getProjectCountForArea("mall"),
      icon: "🛍️",
      filter: "mall"
    },
    {
      id: "university",
      name: "Educational Institutions",
      description: "Plots near universities and colleges",
      projects: getProjectCountForArea("university"),
      icon: "🎓",
      filter: "university"
    },
    {
      id: "hospital",
      name: "Medical Facilities",
      description: "Healthcare corridor with medical institutions",
      projects: getProjectCountForArea("hospital"),
      icon: "🏥",
      filter: "hospital"
    }
  ];

  // Get filtered projects based on active filter and landmark filter
  const getFilteredProjects = () => {
    let filtered = projects;

    // First apply type filter if active
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.type === activeFilter);
    }

    // Then apply landmark filter if active
    if (landmarkFilter) {
      filtered = filtered.filter(project => 
        project.nearby.includes(landmarkFilter.filter)
      );
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  const handleNearbyAreaClick = (area) => {
    const nearbyProjects = projects.filter(project => 
      project.nearby.includes(area.filter)
    );

    if (nearbyProjects.length > 0) {
      setLandmarkFilter(area);
      setActiveFilter('all'); // Reset type filter when selecting landmark
      
      // Scroll to projects section
      setTimeout(() => {
        const projectsSection = document.getElementById('projects-section');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setToastMessage(`Currently no plots available near ${area.name}. Explore our other premium locations!`);
      setShowToast(true);
    }
  };

  const handleClearFilters = () => {
    setActiveFilter('all');
    setLandmarkFilter(null);
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const toastVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <div className="bg-white border-l-4 border-orange-500 text-orange-700 p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="text-orange-500 mr-3">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{toastMessage}</p>
                </div>
                <button
                  onClick={() => setShowToast(false)}
                  className="text-orange-500 hover:text-orange-700"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-100 to-cyan-100">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-800">
              Premium <span className="text-cyan-600">Land Properties</span>
            </h1>
            <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-blue-700 mb-8 leading-relaxed">
              Discover exclusive plots with strategic locations, complete legal assurance, and excellent investment potential
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
                  {stat.number}{stat.suffix || '+'}
                </div>
                <div className="text-blue-800 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Famous Areas Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              Strategic Locations Near Famous Landmarks
            </h2>
            <p className="text-lg text-blue-700 max-w-2xl mx-auto">
              Click on any landmark to view available plots in that area
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {nearbyAreasWithAccurateCounts.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                  landmarkFilter?.id === area.id 
                    ? 'border-cyan-500 border-2' 
                    : 'border-blue-100'
                }`}
                onClick={() => handleNearbyAreaClick(area)}
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{area.name}</h3>
                <p className="text-blue-700 mb-4">{area.description}</p>
                <div className="text-cyan-600 font-semibold flex items-center justify-between">
                  <span>{area.projects} Projects Nearby</span>
                  <span className="text-blue-500">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section id="projects-section" className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                {landmarkFilter 
                  ? `Properties Near ${landmarkFilter.name}` 
                  : activeFilter === 'all' 
                    ? 'All Land Properties' 
                    : `${filters.find(f => f.id === activeFilter)?.label}`}
              </h2>
              <p className="text-lg text-blue-700">
                {landmarkFilter 
                  ? `Showing ${filteredProjects.length} available plots near ${landmarkFilter.name}`
                  : activeFilter === 'all' 
                    ? 'Premium plots for residential, commercial, and investment purposes'
                    : `Showing ${filteredProjects.length} available ${activeFilter} plots`}
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setLandmarkFilter(null); // Clear landmark filter when selecting type
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === filter.id && !landmarkFilter
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
              {(activeFilter !== 'all' || landmarkFilter) && (
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(activeFilter !== 'all' || landmarkFilter) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <div className="inline-flex flex-wrap gap-2 justify-center">
                  {landmarkFilter && (
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                      Near {landmarkFilter.name}
                    </span>
                  )}
                  {activeFilter !== 'all' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {filters.find(f => f.id === activeFilter)?.label}
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={projectVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    layout
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-blue-100"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-800 mb-2">{project.title}</h3>
                      <p className="text-blue-600 text-sm mb-4">{project.location}</p>
                      <p className="text-blue-700 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-lg font-bold text-cyan-600">{project.price}</div>
                          <div className="text-sm text-blue-600">{project.area}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-blue-600">Available Plots</div>
                          <div className="font-semibold text-blue-800">{project.units}</div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 3 && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                            +{project.features.length - 3} more
                          </span>
                        )}
                      </div>

                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-semibold transition-colors">
                        View Plot Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Projects Message */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4 text-blue-400">🏗️</div>
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  {landmarkFilter 
                    ? `No Plots Available Near ${landmarkFilter.name}`
                    : 'No Plots Available in This Category'}
                </h3>
                <p className="text-blue-600 mb-6">
                  {landmarkFilter
                    ? `We're constantly adding new properties near ${landmarkFilter.name}. Please check other locations or contact us for upcoming projects.`
                    : 'We\'re constantly adding new land properties. Please check other categories or contact us for upcoming projects.'}
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Properties
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Plots Section */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              Why Choose Anand Realtyy Plots?
            </h2>
            <p className="text-lg text-blue-700 mb-12 max-w-2xl mx-auto">
              We offer the most secure and profitable land investment opportunities with complete transparency
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "📜",
                  title: "100% Legal Clearance",
                  description: "All plots come with clear titles, approved layouts, and complete legal documentation"
                },
                {
                  icon: "🧘",
                  title: "Vastu Compliant",
                  description: "Scientific Vastu principles ensure positive energy flow and prosperous living"
                },
                {
                  icon: "💰",
                  title: "High ROI Potential",
                  description: "Strategic locations and premium infrastructure ensure excellent appreciation"
                },
                {
                  icon: "🏗️",
                  title: "Ready Infrastructure",
                  description: "All basic amenities including roads, water, electricity, and drainage provided"
                },
                {
                  icon: "🛡️",
                  title: "Investment Security",
                  description: "Bank approved projects with transparent pricing and flexible payment options"
                },
                {
                  icon: "📍",
                  title: "Prime Locations",
                  description: "Carefully selected locations with excellent connectivity and future growth potential"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md text-center border border-blue-100"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">{feature.title}</h3>
                  <p className="text-blue-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

{/* CTA Section */}
<section className="py-16 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
  <div className="container mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Invest in Land?
      </h2>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Book a site visit today and secure your piece of prime land with complete legal assurance and Vastu benefits.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/contact" 
          className="bg-white text-cyan-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Book Site Visit
        </Link>
        <a 
          href="./images/Brochure.png" 
          download="Anand-Realtyy-Brochure.png"
          className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Download Brochure
        </a>
      </div>
    </motion.div>
  </div>
</section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-blue-700 hover:bg-white"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">{selectedProject.title}</h2>
                <p className="text-blue-600 text-lg mb-2">{selectedProject.location}</p>
                <p className="text-blue-700 mb-6">{selectedProject.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Price Range</div>
                    <div className="text-xl font-bold text-cyan-600">{selectedProject.price}</div>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Plot Sizes</div>
                    <div className="text-xl font-bold text-blue-800">{selectedProject.area}</div>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Available Plots</div>
                    <div className="text-xl font-bold text-blue-800">{selectedProject.units}</div>
                  </div>
                </div>

                {/* Nearby Areas */}
                {selectedProject.nearby && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Nearby Famous Areas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.nearby.map((areaId, index) => {
                        const area = nearbyAreasWithAccurateCounts.find(a => a.filter === areaId);
                        return area ? (
                          <div key={index} className="flex items-center">
                            <span className="text-cyan-500 mr-2">📍</span>
                            <span className="text-blue-700">{area.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Plot Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-blue-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProject.amenities && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-blue-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.highlights && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Key Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                  >
                    Book Site Visit
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;