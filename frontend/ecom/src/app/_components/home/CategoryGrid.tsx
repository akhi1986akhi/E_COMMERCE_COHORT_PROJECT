'use client';

import { useState } from 'react';
import {
  Laptop,
  Smartphone,
  Home,
  Headphones,
  Gamepad2,
  Camera,
  Watch,
  Car,
  ArrowRight,
  TrendingUp,
  Star,
  Sparkles,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

const CategoryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const categories = [
    {
      id: 'laptops',
      name: 'Laptops & Computers',
      description: 'High-performance laptops and desktops for work and creativity',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop&crop=center',
      count: '124 products',
      trending: true,
      discount: '25% OFF',
      color: 'from-blue-600 via-purple-600 to-indigo-800',
      accentColor: 'blue',
      icon: Laptop,
      tag: 'electronics'
    },
    {
      id: 'smartphones',
      name: 'Smartphones & Tablets',
      description: 'Latest smartphones and tablets with cutting-edge technology',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=400&fit=crop&crop=center',
      count: '89 products',
      trending: true,
      discount: '20% OFF',
      color: 'from-purple-600 via-pink-600 to-rose-800',
      accentColor: 'purple',
      icon: Smartphone,
      tag: 'electronics'
    },
    {
      id: 'home-appliances',
      name: 'Smart Home',
      description: 'Transform your home with intelligent appliances and devices',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center',
      count: '67 products',
      trending: false,
      discount: '15% OFF',
      color: 'from-orange-500 via-amber-500 to-yellow-600',
      accentColor: 'orange',
      icon: Home,
      tag: 'home'
    },
    {
      id: 'audio',
      name: 'Audio & Headphones',
      description: 'Premium audio devices for immersive sound experience',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop&crop=center',
      count: '156 products',
      trending: true,
      discount: '30% OFF',
      color: 'from-red-500 via-pink-500 to-purple-600',
      accentColor: 'red',
      icon: Headphones,
      tag: 'electronics'
    },
    {
      id: 'gaming',
      name: 'Gaming Gear',
      description: 'Ultimate gaming accessories and peripherals for pros',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500&h=400&fit=crop&crop=center',
      count: '78 products',
      trending: true,
      discount: '40% OFF',
      color: 'from-indigo-600 via-purple-600 to-pink-600',
      accentColor: 'indigo',
      icon: Gamepad2,
      tag: 'electronics'
    },
    {
      id: 'photography',
      name: 'Photography',
      description: 'Professional cameras and photography equipment',
      image: 'https://images.unsplash.com/photo-1606983340124-738d3d6e2dde?w=500&h=400&fit=crop&crop=center',
      count: '45 products',
      trending: false,
      discount: '18% OFF',
      color: 'from-emerald-500 via-teal-500 to-cyan-600',
      accentColor: 'emerald',
      icon: Camera,
      tag: 'electronics'
    },
    {
      id: 'wearables',
      name: 'Wearable Tech',
      description: 'Smartwatches and fitness trackers for active lifestyle',
      image: 'https://images.unsplash.com/photo-1434493651957-4be3de6f4372?w=500&h=400&fit=crop&crop=center',
      count: '92 products',
      trending: true,
      discount: '22% OFF',
      color: 'from-cyan-500 via-blue-500 to-indigo-600',
      accentColor: 'cyan',
      icon: Watch,
      tag: 'electronics'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      description: 'Car accessories and automotive technology solutions',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop&crop=center',
      count: '34 products',
      trending: false,
      discount: '12% OFF',
      color: 'from-slate-600 via-gray-600 to-zinc-700',
      accentColor: 'slate',
      icon: Car,
      tag: 'automotive'
    }
  ];

  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.tag === activeCategory);

  const CategoryCard = ({ category, index}:any) => {
    const Icon = category.icon;
    const isHovered = hoveredCard === category.id;
    
    return (
      <div 
        className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 ease-out cursor-pointer
          ${isHovered ? 'scale-105 shadow-2xl shadow-black/20' : 'hover:scale-102 hover:shadow-xl'}
          ${index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'}
        `}
        onMouseEnter={() => setHoveredCard(category.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Background Image with Overlay */}
        <div className="relative h-64 overflow-hidden">
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-95`}></div>
          
          {/* Image */}
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20 z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
            {category.trending && (
              <div className="flex items-center bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                TRENDING
              </div>
            )}
            {category.discount && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                {category.discount}
              </div>
            )}
          </div>
          
          {/* Floating Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className={`w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30 group-hover:rotate-12`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        </div>
        
        {/* Content Section */}
        <div className="relative p-6 bg-white">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {category.description}
            </p>
          </div>
          
          {/* Stats and CTA */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 font-medium">{category.count}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <span className="text-xs text-gray-400 ml-1">(4.8)</span>
              </div>
            </div>
            
            <button className={`group/btn flex items-center px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 transform`}>
              <span className="mr-2">Explore</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
          
          {/* Animated Border */}
          <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${category.color} transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
        </div>
        
        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none ${isHovered ? `shadow-2xl shadow-${category.accentColor}-500/50` : ''}`}></div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Featured Categories</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection across multiple categories. From cutting-edge technology to everyday essentials.
          </p>
        </div>

        {/* Enhanced Filter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-4">
          {/* Category Filters */}
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
            <Filter className="w-5 h-5 text-gray-500 ml-3 mr-2" />
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveCategory('electronics')}
              className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeCategory === 'electronics' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Electronics
            </button>
            <button
              onClick={() => setActiveCategory('home')}
              className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeCategory === 'home' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Smart Home
            </button>
            <button
              onClick={() => setActiveCategory('automotive')}
              className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeCategory === 'automotive' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Automotive
            </button>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enhanced Category Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Can't find what you're looking for?</h3>
            <p className="text-gray-600 mb-6">Browse our complete catalog or get in touch with our product experts.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
                <span className="flex items-center justify-center">
                  View All Categories
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="bg-white/60 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105 transform">
                Contact Expert
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default CategoryGrid;