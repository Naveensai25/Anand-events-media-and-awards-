import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Trophy, ChevronRight, Star, Heart, Lightbulb, Target } from 'lucide-react';

const HomePage = () => {

  const categories = [

    {

      title: "Business & Entrepreneurship",

      icon: <Target className="w-8 h-8" />,

      awards: ["Innovative Leaders", "Game-Changing Enterprises", "Rising Entrepreneurs", "Women Leaders in Business"]

    },

    {

      title: "Pharma & Healthcare",

      icon: <Heart className="w-8 h-8" />,

      awards: ["Medical Excellence", "Healthcare Innovation", "Pharma Research Leadership", "Lifetime Service to Healthcare"]

    },

    {

      title: "Film & Entertainment",

      icon: <Star className="w-8 h-8" />,

      awards: ["Artistic Brilliance", "Creative Excellence", "Industry Achievement", "Emerging Talent"]

    },

    {

      title: "Special Recognitions",

      icon: <Lightbulb className="w-8 h-8" />,

      awards: ["Social Impact", "Education Excellence", "Sports Achievement", "Technology & Innovation", "Public Service"]

    }

  ];

  const pillars = [

    {

      title: "Excellence Recognition",

      description: "Identifying high achievers and honoring exceptional contributions across industries",

      icon: <Award className="w-12 h-12" />

    },

    {

      title: "Inspiration & Legacy",

      description: "Motivating future innovators and preserving the legacy of achievers",

      icon: <Trophy className="w-12 h-12" />

    },

    {

      title: "Cross-Industry Impact",

      description: "Celebrating contributions in multiple sectors and promoting growth",

      icon: <Users className="w-12 h-12" />

    }

  ];

  const eventPhases = [

    {

      phase: "Pre-Event",

      activities: ["Announcements", "Nominee List Release", "Sponsorship Onboarding", "Press & Social Media Campaigns"]

    },

    {

      phase: "Main Ceremony",

      activities: ["Red Carpet Welcome", "Opening Note", "Award Presentations", "Performances & Special Acts", "Keynote Speeches"]

    },

    {

      phase: "Post-Event",

      activities: ["Awardee Spotlight", "Press Coverage", "Social Media Promotion", "Annual Achievers Publication"]

    }

  ];

  const renderHome = () => (

    <div className="space-y-16">

      {/* Hero Section */}

      <div className="relative bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 text-white rounded-3xl p-12 md:p-20 overflow-hidden">

        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="relative z-10 max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-bold mb-6">Anand Awards</h1>

          <p className="text-2xl md:text-3xl mb-4 font-light">Honoring Brilliance. Celebrating Legacy.</p>

          <p className="text-xl mb-8 opacity-90">Empowering individuals and organizations by celebrating their exceptional contributions across diverse industries</p>

          <div className="flex flex-wrap gap-4">

            <Link to="/categories" className="bg-white text-amber-700 px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition flex items-center gap-2">

              Explore Categories <ChevronRight />

            </Link>

            <Link to="/nominate" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-700 transition">

              Nominate Now

            </Link>

          </div>

        </div>

      </div>

      {/* Brand Essence */}

      <div className="grid md:grid-cols-4 gap-6">

        {['Brilliance', 'Recognition', 'Legacy', 'Inspiration'].map((essence, idx) => (

          <div key={idx} className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl text-center border-2 border-amber-200 hover:border-amber-400 transition">

            <div className="text-amber-600 mb-4">

              <Award className="w-10 h-10 mx-auto" />

            </div>

            <h3 className="text-2xl font-bold text-gray-800">{essence}</h3>

          </div>

        ))}

      </div>

      {/* Pillars */}

      <div>

        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Pillars</h2>

        <div className="grid md:grid-cols-3 gap-8">

          {pillars.map((pillar, idx) => (

            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100">

              <div className="text-amber-600 mb-6">{pillar.icon}</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">{pillar.title}</h3>

              <p className="text-gray-600 leading-relaxed">{pillar.description}</p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

  // Categories preview section
  const renderCategoriesPreview = () => (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Award Categories</h2>
        <p className="text-xl text-gray-600">Celebrating excellence across multiple industries</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg border-2 border-amber-200 hover:border-amber-400 transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-amber-600">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
            </div>
            <ul className="space-y-3 mb-6">
              {category.awards.slice(0, 2).map((award, aIdx) => (
                <li key={aIdx} className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">{award}</span>
                </li>
              ))}
            </ul>
            <Link 
              to="/categories" 
              className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-2"
            >
              View All Categories <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Link 
          to="/categories"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-700 hover:to-yellow-600 transition shadow-lg"
        >
          View All Categories <ChevronRight />
        </Link>
      </div>
    </div>
  );

  const renderFramework = () => (

    <div className="space-y-12">

      <div className="text-center mb-12">

        <h2 className="text-5xl font-bold text-gray-800 mb-4">Award Framework</h2>

        <p className="text-xl text-gray-600">A transparent and rigorous selection process</p>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-amber-500">

          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">

            <span className="text-3xl font-bold text-amber-600">1</span>

          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Nomination</h3>

          <ul className="space-y-2 text-gray-600">

            <li>• Public & industry nominations</li>

            <li>• Submission of achievements</li>

            <li>• Credential verification</li>

          </ul>

        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-amber-500">

          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">

            <span className="text-3xl font-bold text-amber-600">2</span>

          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Selection</h3>

          <ul className="space-y-2 text-gray-600">

            <li>• Expert jury panel</li>

            <li>• Transparent evaluation</li>

            <li>• Achievement verification</li>

          </ul>

        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-amber-500">

          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">

            <span className="text-3xl font-bold text-amber-600">3</span>

          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Recognition</h3>

          <ul className="space-y-2 text-gray-600">

            <li>• Prestigious ceremony</li>

            <li>• Media exposure</li>

            <li>• Professional presentations</li>

          </ul>

        </div>

      </div>

      {/* Event Structure */}

      <div className="mt-16">

        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Event Structure</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {eventPhases.map((phase, idx) => (

            <div key={idx} className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200">

              <h3 className="text-xl font-bold text-amber-700 mb-4">{phase.phase}</h3>

              <ul className="space-y-2">

                {phase.activities.map((activity, aIdx) => (

                  <li key={aIdx} className="text-gray-700 flex items-start gap-2">

                    <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />

                    <span>{activity}</span>

                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

      </div>

    </div>

  );


  const renderImpact = () => (

    <div className="space-y-12">

      <div className="text-center mb-12">

        <h2 className="text-5xl font-bold text-gray-800 mb-4">Impact & Value</h2>

        <p className="text-xl text-gray-600">Creating lasting change across industries</p>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {[

          { title: "Elevating Industry Standards", desc: "Setting new benchmarks for excellence and achievement" },

          { title: "Inspiring Global Excellence", desc: "Motivating professionals worldwide to reach greater heights" },

          { title: "Highlighting Dedication", desc: "Showcasing stories of commitment and perseverance" },

          { title: "Encouraging Innovation", desc: "Promoting creative thinking and breakthrough solutions" }

        ].map((item, idx) => (

          <div key={idx} className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition">

            <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>

            <p className="text-gray-600 leading-relaxed">{item.desc}</p>

          </div>

        ))}

      </div>

      {/* Stakeholders */}

      <div className="bg-gradient-to-br from-amber-600 to-yellow-500 text-white p-12 rounded-3xl mt-16">

        <h3 className="text-3xl font-bold mb-8 text-center">Our Stakeholders</h3>

        <div className="grid md:grid-cols-3 gap-6">

          {[

            "Jury & Experts", "Sponsors", "Media Partners",

            "Industry Associations", "Government & NGOs", "Celebrity Guests"

          ].map((stakeholder, idx) => (

            <div key={idx} className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-xl text-center font-semibold">

              {stakeholder}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderHome()}
        
        {/* Categories Preview */}
        <div className="mt-20">
          {renderCategoriesPreview()}
        </div>
        
        {/* Framework Section */}
        <div className="mt-20">
          {renderFramework()}
        </div>
        
        {/* Impact Section */}
        <div className="mt-20">
          {renderImpact()}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
