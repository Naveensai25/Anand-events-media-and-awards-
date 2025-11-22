import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/categories", label: "Categories" },
    { path: "/nominate", label: "Nominate" },
    { path: "/contact", label: "Contact" },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 
      bg-white border-b 
      ${isScrolled ? "shadow-md border-gray-200" : "border-gray-100"}`}
    >
      <div className="container mx-auto px-4">
        {/* Row */}
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo - Improved Alignment */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group flex-shrink-0">
            {/* Profile Picture */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-orange-200 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
              <img
                src="./images/image.png"
                alt="Founder"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Flag and Text Container */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Flag Logo */}
              <div className="flex-shrink-0">
                <img
                  src="./images/Anandhlogo.png"
                  alt="Anand Logo"
                  className="w-8 h-10 md:w-10 md:h-12 object-contain"
                />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-base md:text-lg lg:text-xl font-bold leading-tight whitespace-nowrap">
                  <span className="text-orange-500">ANAND </span>
                  <span className="text-blue-800">EVENTS MEDIA & AWARDS</span>
                </h1>
                <p className="text-sm md:text-base text-gray-600 italic mt-0.5 leading-tight">
                  "Dharmo Rakshati Rakshitah"
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-2 xl:space-x-3 mx-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 xl:px-4 py-2.5 rounded-lg text-sm xl:text-base font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActiveLink(item.path)
                    ? "text-blue-700 bg-blue-100 border border-blue-200"
                    : "text-blue-800 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>


          {/* Mobile menu button - Improved Size */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 md:p-3 text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0 ml-2"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 md:w-7 md:h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 md:w-7 md:h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - Improved Alignment */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 pb-4">
            <nav className="space-y-2 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActiveLink(item.path)
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-blue-800 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;