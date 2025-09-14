'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Phone,
  MapPin,
  ChevronDown,
  Sparkles,
  Gift,
  Star
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      {/* Top Announcement Bar with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-sm py-3 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="container mx-auto flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone size={14} className="mr-2 text-purple-200" />
              <span className="font-medium">24/7 Support: (555) 123-4567</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center">
              <MapPin size={14} className="mr-2 text-purple-200" />
              <span className="font-medium hover:text-purple-200 cursor-pointer transition-colors">Track Order</span>
            </div>
          </div>
          <div className="flex items-center">
            <Sparkles size={14} className="mr-2 text-yellow-300" />
            <span className="font-semibold">Free shipping on orders $50+!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100 py-3'
            : 'bg-white/98 backdrop-blur-sm border-b border-gray-200/50 py-5'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Main header content */}
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  <span className="text-white font-black text-xl">S</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star size={8} className="text-yellow-800" />
                  </div>
                </div>
              </div>
              <div>
                <span className="font-black text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ShopNow
                </span>
                <div className="text-xs text-gray-500 font-medium -mt-1">Premium Store</div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <div className="relative group">
                <button className="flex items-center font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-indigo-50">
                  Categories
                  <ChevronDown size={16} className="ml-1 transform group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-2xl rounded-2xl p-6 w-64 mt-2 border border-gray-100">
                  <div className="grid gap-3">
                    <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300 group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-3 flex items-center justify-center">
                        <span className="text-white text-xs">📱</span>
                      </div>
                      <span className="font-medium group-hover/item:text-indigo-600">Electronics</span>
                    </a>
                    <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300 group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
                        <span className="text-white text-xs">👗</span>
                      </div>
                      <span className="font-medium group-hover/item:text-indigo-600">Fashion</span>
                    </a>
                    <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300 group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mr-3 flex items-center justify-center">
                        <span className="text-white text-xs">🏠</span>
                      </div>
                      <span className="font-medium group-hover/item:text-indigo-600">Home & Kitchen</span>
                    </a>
                    <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300 group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg mr-3 flex items-center justify-center">
                        <span className="text-white text-xs">💄</span>
                      </div>
                      <span className="font-medium group-hover/item:text-indigo-600">Beauty</span>
                    </a>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="flex items-center font-semibold text-red-600 hover:text-red-700 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-red-50 relative"
              >
                <Gift size={16} className="mr-1" />
                Hot Deals
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </a>
              <a
                href="#"
                className="font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-indigo-50"
              >
                New Arrivals
              </a>
              <a
                href="#"
                className="font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-indigo-50"
              >
                Brands
              </a>
            </nav>

            {/* Enhanced Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  className="w-full py-3 pl-6 pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Search size={20} className="text-white" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Enhanced Action Icons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleSearch}
                className="md:hidden text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
              >
                <Search size={22} />
              </button>
              
              <button className="relative text-gray-700 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-300 group">
                <Heart size={22} />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  3
                </span>
              </button>
              
              <button className="relative text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-all duration-300 group">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  2
                </span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                >
                  <User size={22} />
                </button>
                
                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                    <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors font-medium">
                      My Account
                    </a>
                    <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors">
                      Order History
                    </a>
                    <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors">
                      Settings
                    </a>
                    <hr className="my-2" />
                    <a href="#" className="block px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleMenu}
                className="lg:hidden text-gray-700 ml-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden mt-6 animate-fadeIn">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full py-3 pl-6 pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                  <Search size={18} className="text-white" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`lg:hidden bg-white/95 backdrop-blur-lg shadow-2xl transition-all duration-500 ease-out border-t border-gray-100 ${
            isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-2">
            <div className="border-b border-gray-100 pb-6 mb-4">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300">
                  <span className="mr-2">📱</span>
                  Electronics
                </a>
                <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300">
                  <span className="mr-2">👗</span>
                  Fashion
                </a>
                <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300">
                  <span className="mr-2">🏠</span>
                  Home
                </a>
                <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300">
                  <span className="mr-2">💄</span>
                  Beauty
                </a>
              </div>
            </div>
            
            <a href="#" className="flex items-center py-3 px-4 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all duration-300">
              <Gift size={18} className="mr-3" />
              Hot Deals
            </a>
            <a href="#" className="py-3 px-4 text-gray-700 hover:bg-indigo-50 rounded-xl font-medium transition-all duration-300">
              New Arrivals
            </a>
            <a href="#" className="py-3 px-4 text-gray-700 hover:bg-indigo-50 rounded-xl font-medium transition-all duration-300">
              Brands
            </a>
            
            <div className="pt-6 border-t border-gray-100 mt-4 space-y-2">
              <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-indigo-50 rounded-xl transition-all duration-300">
                <User size={18} className="mr-3 text-indigo-600" />
                My Account
              </a>
              <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-red-50 rounded-xl transition-all duration-300">
                <Heart size={18} className="mr-3 text-red-600" />
                Wishlist
              </a>
              <a href="#" className="flex items-center py-3 px-4 text-gray-700 hover:bg-indigo-50 rounded-xl transition-all duration-300">
                <ShoppingCart size={18} className="mr-3 text-indigo-600" />
                Shopping Cart
              </a>
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;