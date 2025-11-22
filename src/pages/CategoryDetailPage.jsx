import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Award, Target, Heart, Star, Lightbulb, ChevronLeft, ArrowRight } from 'lucide-react';

const CategoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = {
    'business-entrepreneurship': {
      title: "Business & Entrepreneurship",
      icon: <Target className="w-12 h-12" />,
      description: "Celebrating innovative leaders and game-changing enterprises that drive economic growth and transformation. This category recognizes visionaries who have created lasting impact through business excellence, innovation, and entrepreneurial spirit.",
      longDescription: "The Business & Entrepreneurship category honors individuals and organizations that have demonstrated exceptional leadership, innovation, and impact in the business world. From startups that disrupt industries to established enterprises that set new standards, we celebrate those who drive economic growth and create value for society.",
      awards: [
        {
          name: "Innovative Leaders",
          description: "Recognizing visionary leaders who have transformed industries through innovative thinking and strategic execution."
        },
        {
          name: "Game-Changing Enterprises",
          description: "Celebrating companies that have revolutionized their sectors and created new paradigms for success."
        },
        {
          name: "Rising Entrepreneurs",
          description: "Honoring emerging entrepreneurs who show exceptional promise and have achieved remarkable early success."
        },
        {
          name: "Women Leaders in Business",
          description: "Acknowledging outstanding women leaders who have broken barriers and achieved excellence in business."
        }
      ],
      criteria: [
        "Demonstrated innovation and creativity in business approach",
        "Significant impact on industry or community",
        "Sustainable business practices and ethical leadership",
        "Measurable growth and success metrics"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    'pharma-healthcare': {
      title: "Pharma & Healthcare",
      icon: <Heart className="w-12 h-12" />,
      description: "Honoring medical excellence and healthcare innovation that saves lives and improves well-being. This category celebrates those who have made significant contributions to healthcare, medical research, and patient care.",
      longDescription: "The Pharma & Healthcare category recognizes professionals, researchers, and organizations that have advanced medical science, improved patient outcomes, and contributed to public health. From breakthrough research to compassionate care, we honor those dedicated to healing and wellness.",
      awards: [
        {
          name: "Medical Excellence",
          description: "Recognizing healthcare professionals who have demonstrated exceptional clinical skills and patient care."
        },
        {
          name: "Healthcare Innovation",
          description: "Celebrating innovations in medical technology, treatment methods, and healthcare delivery systems."
        },
        {
          name: "Pharma Research Leadership",
          description: "Honoring researchers and pharmaceutical companies leading breakthrough discoveries and drug development."
        },
        {
          name: "Lifetime Service to Healthcare",
          description: "Acknowledging individuals with decades of dedicated service and significant contributions to healthcare."
        }
      ],
      criteria: [
        "Outstanding contributions to medical science or patient care",
        "Innovation in healthcare delivery or treatment",
        "Impact on public health and wellness",
        "Recognition from peers and professional bodies"
      ],
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100"
    },
    'film-entertainment': {
      title: "Film & Entertainment",
      icon: <Star className="w-12 h-12" />,
      description: "Recognizing artistic brilliance and creative excellence in the entertainment industry. This category celebrates talent, creativity, and contributions to the world of film, television, and entertainment.",
      longDescription: "The Film & Entertainment category honors artists, creators, and industry professionals who have enriched our cultural landscape through exceptional work. From actors and directors to producers and technicians, we celebrate those who bring stories to life and entertain millions.",
      awards: [
        {
          name: "Artistic Brilliance",
          description: "Recognizing exceptional artistic achievement and creative expression in film and entertainment."
        },
        {
          name: "Creative Excellence",
          description: "Celebrating outstanding creative contributions that have set new standards in entertainment."
        },
        {
          name: "Industry Achievement",
          description: "Honoring professionals who have made significant contributions to the entertainment industry."
        },
        {
          name: "Emerging Talent",
          description: "Acknowledging promising new talent that shows exceptional potential and early achievement."
        }
      ],
      criteria: [
        "Outstanding artistic or creative achievement",
        "Significant impact on entertainment industry",
        "Recognition from audiences and critics",
        "Contribution to cultural enrichment"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    'special-recognitions': {
      title: "Special Recognitions",
      icon: <Lightbulb className="w-12 h-12" />,
      description: "Acknowledging exceptional contributions across diverse fields and social impact initiatives. This category celebrates those who make a difference beyond traditional industry boundaries.",
      longDescription: "The Special Recognitions category honors individuals and organizations that have created meaningful impact across various sectors. From education and sports to technology and public service, we celebrate diverse achievements that inspire and transform communities.",
      awards: [
        {
          name: "Social Impact",
          description: "Recognizing initiatives and individuals creating positive social change and community development."
        },
        {
          name: "Education Excellence",
          description: "Celebrating educators and institutions that have transformed learning and educational outcomes."
        },
        {
          name: "Sports Achievement",
          description: "Honoring athletes and sports professionals who have achieved excellence and inspired others."
        },
        {
          name: "Technology & Innovation",
          description: "Acknowledging tech innovators who have created solutions that transform how we live and work."
        },
        {
          name: "Public Service",
          description: "Recognizing public servants and organizations dedicated to serving communities and the nation."
        }
      ],
      criteria: [
        "Significant positive impact on community or society",
        "Demonstrated excellence in chosen field",
        "Inspiration to others and future generations",
        "Measurable outcomes and achievements"
      ],
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    }
  };

  const category = categories[id];

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <Link to="/categories" className="text-amber-600 hover:text-amber-700 font-semibold">
            ← Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Categories</span>
        </button>

        {/* Category Header */}
        <div className={`bg-gradient-to-br ${category.bgColor} rounded-3xl p-12 mb-12`}>
          <div className="flex items-center gap-6 mb-6">
            <div className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-white`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {category.title}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Category</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {category.longDescription}
          </p>
        </div>

        {/* Award Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Award Types</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {category.awards.map((award, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${category.color} p-3 rounded-lg text-white flex-shrink-0`}>
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{award.name}</h3>
                    <p className="text-gray-600">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Criteria */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Selection Criteria</h2>
          <ul className="space-y-4">
            {category.criteria.map((criterion, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className={`bg-gradient-to-br ${category.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-1`}>
                  {idx + 1}
                </div>
                <p className="text-gray-700 text-lg pt-1">{criterion}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-br ${category.color} text-white rounded-3xl p-12 text-center`}>
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Nominate?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Submit your nomination for the {category.title} category
          </p>
          <Link
            to="/nominate"
            state={{ category: category.title, categoryId: id }}
            className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Submit Nomination
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;

