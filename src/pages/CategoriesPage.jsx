import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, Heart, Star, Lightbulb, ChevronRight } from 'lucide-react';

const CategoriesPage = () => {
  const categories = [
    {
      id: 'business-entrepreneurship',
      title: "Business & Entrepreneurship",
      icon: <Target className="w-8 h-8" />,
      description: "Celebrating innovative leaders and game-changing enterprises that drive economic growth and transformation.",
      awards: ["Innovative Leaders", "Game-Changing Enterprises", "Rising Entrepreneurs", "Women Leaders in Business"],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 'pharma-healthcare',
      title: "Pharma & Healthcare",
      icon: <Heart className="w-8 h-8" />,
      description: "Honoring medical excellence and healthcare innovation that saves lives and improves well-being.",
      awards: ["Medical Excellence", "Healthcare Innovation", "Pharma Research Leadership", "Lifetime Service to Healthcare"],
      color: "from-red-500 to-red-600"
    },
    {
      id: 'film-entertainment',
      title: "Film & Entertainment",
      icon: <Star className="w-8 h-8" />,
      description: "Recognizing artistic brilliance and creative excellence in the entertainment industry.",
      awards: ["Artistic Brilliance", "Creative Excellence", "Industry Achievement", "Emerging Talent"],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 'special-recognitions',
      title: "Special Recognitions",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Acknowledging exceptional contributions across diverse fields and social impact initiatives.",
      awards: ["Social Impact", "Education Excellence", "Sports Achievement", "Technology & Innovation", "Public Service"],
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Award Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating excellence across multiple industries. Explore our comprehensive award categories and find the perfect recognition for outstanding achievements.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className={`bg-gradient-to-br ${category.color} p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Award Types:</h3>
                <ul className="space-y-2">
                  {category.awards.map((award, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center text-amber-600 font-semibold group-hover:gap-3 transition-all">
                <span>View Details</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 text-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Nominate?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Submit your nomination for exceptional talent and excellence
          </p>
          <Link
            to="/nominate"
            className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition shadow-lg"
          >
            Submit Nomination
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

