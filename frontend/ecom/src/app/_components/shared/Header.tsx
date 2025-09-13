'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Phone,
  MapPin,
  ChevronDown
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-indigo-700 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Phone size={14} className="mr-2" />
            <span>Support: (555) 123-4567</span>
          </div>
          <div className="hidden md:flex items-center">
            <MapPin size={14} className="mr-2" />
            <span>Track Order</span>
          </div>
          <div className="flex items-center">
            <span>Free shipping on all orders over $50!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md py-2'
            : 'bg-white border-b border-gray-200 py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Main header content */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-2xl text-indigo-600">ShopNow</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <div className="relative group">
                <button className="flex items-center font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                  Categories
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg p-4 w-48 mt-2">
                  <Link href="/category/electronics" className="block py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded">Electronics</Link>
                  <Link href="/category/fashion" className="block py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded">Fashion</Link>
                  <Link href="/category/home" className="block py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded">Home & Kitchen</Link>
                  <Link href="/category/beauty" className="block py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded">Beauty</Link>
                </div>
              </div>
              <Link
                href="/deals"
                className="font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Deals
              </Link>
              <Link
                href="/new-arrivals"
                className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/brands"
                className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Brands
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 p-1.5 rounded-full">
                  <Search size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-5">
              <button 
                onClick={toggleSearch}
                className="md:hidden text-gray-700 hover:text-indigo-600"
              >
                <Search size={22} />
              </button>
              <button className="relative text-gray-700 hover:text-indigo-600">
                <Heart size={22} />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="relative text-gray-700 hover:text-indigo-600">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="text-gray-700 hover:text-indigo-600">
                <User size={22} />
              </button>
              <button
                onClick={toggleMenu}
                className="lg:hidden text-gray-700 ml-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search - appears when search icon is clicked */}
          {isSearchOpen && (
            <div className="md:hidden mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 p-1.5 rounded-full">
                  <Search size={18} className="text-white" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/category/electronics" className="py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded-lg">Electronics</Link>
                <Link href="/category/fashion" className="py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded-lg">Fashion</Link>
                <Link href="/category/home" className="py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded-lg">Home</Link>
                <Link href="/category/beauty" className="py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded-lg">Beauty</Link>
              </div>
            </div>
            <Link href="/deals" className="py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg font-medium">
              Deals
            </Link>
            <Link href="/new-arrivals" className="py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded-lg">
              New Arrivals
            </Link>
            <Link href="/brands" className="py-2 px-4 text-gray-700 hover:bg-indigo-50 rounded-lg">
              Brands
            </Link>
            <div className="pt-4 border-t">
              <Link href="/account" className="flex items-center py-2 text-gray-700">
                <User size={18} className="mr-2" />
                My Account
              </Link>
              <Link href="/wishlist" className="flex items-center py-2 text-gray-700">
                <Heart size={18} className="mr-2" />
                Wishlist
              </Link>
              <Link href="/cart" className="flex items-center py-2 text-gray-700">
                <ShoppingCart size={18} className="mr-2" />
                Shopping Cart
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;