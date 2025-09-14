'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const slides = [
    {
      category: 'Laptops',
      title: 'Next-Gen Computing Power',
      description: 'Experience blazing fast performance with our latest laptop collection featuring AI acceleration',
      cta: 'Shop Laptops',
      color: 'from-blue-600 via-blue-500 to-cyan-400',
      accentColor: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      overlay: 'from-blue-900/60 via-blue-800/40 to-transparent',
      icon: '💻'
    },
    {
      category: 'Smartphones',
      title: 'Connectivity Redefined',
      description: 'Discover cutting-edge smartphones with revolutionary camera systems and 5G speeds',
      cta: 'Shop Phones',
      color: 'from-purple-600 via-pink-500 to-rose-400',
      accentColor: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      overlay: 'from-purple-900/60 via-pink-800/40 to-transparent',
      icon: '📱'
    },
    {
      category: 'Home Appliances',
      title: 'Transform Your Living Space',
      description: 'Smart appliances with IoT integration for a seamlessly connected modern home',
      cta: 'Shop Appliances',
      color: 'from-orange-600 via-amber-500 to-yellow-400',
      accentColor: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      overlay: 'from-orange-900/60 via-amber-800/40 to-transparent',
      icon: '🏠'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 animate-pulse"></div>
      
      {/* Dynamic Mesh Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Background Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className={`absolute inset-0 z-10 bg-gradient-to-br ${slide.overlay}`}></div>
            <Image
              src={slide.image}
              alt={slide.category}
              fill
              className="object-cover filter blur-sm"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-15">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${slides[currentSlide].color} p-0.5 rounded-full mb-6 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-xl">{slides[currentSlide].icon}</span>
                <span className="text-white font-medium text-sm tracking-wide">
                  {slides[currentSlide].category}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r ${slides[currentSlide].color} bg-clip-text text-transparent leading-tight transform transition-all duration-700 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {slides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className={`text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed max-w-2xl transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <button className={`group relative overflow-hidden bg-gradient-to-r ${slides[currentSlide].color} text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25`}>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  {slides[currentSlide].cta}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button className="group bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  View All Products
                  <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-lg rounded-full p-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                index === currentSlide ? 'w-12 h-3' : 'w-3 h-3'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? `bg-gradient-to-r ${slide.color}` 
                  : 'bg-white/40 hover:bg-white/60'
              }`}></div>
              {index === currentSlide && (
                <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Category Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-xl border-t border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-wrap justify-center gap-4">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`group relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 ${
                    index === currentSlide 
                      ? `bg-gradient-to-r ${slide.color} text-white shadow-2xl shadow-blue-500/25 scale-105` 
                      : 'bg-white/5 backdrop-blur-md text-white/70 hover:bg-white/10 hover:text-white border border-white/20'
                  }`}
                >
                  <span className="text-xl">{slide.icon}</span>
                  <span className="font-medium">{slide.category}</span>
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
        <div 
          className={`h-full bg-gradient-to-r ${slides[currentSlide].color} transition-all duration-500 animate-progress`}
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-progress {
          animation: progress 6s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </section>
  );
};

export default Hero;