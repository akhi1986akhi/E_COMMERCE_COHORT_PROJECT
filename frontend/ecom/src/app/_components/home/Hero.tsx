'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      category: 'Laptops',
      title: 'Next-Gen Computing Power',
      description: 'Experience blazing fast performance with our latest laptop collection',
      cta: 'Shop Laptops',
      color: 'bg-blue-600',
      image: '/api/placeholder/800/500',
      overlay: 'bg-blue-500/20'
    },
    {
      category: 'Smartphones',
      title: 'Connectivity Redefined',
      description: 'Discover cutting-edge smartphones with revolutionary features',
      cta: 'Shop Phones',
      color: 'bg-purple-600',
      image: '/api/placeholder/800/500',
      overlay: 'bg-purple-500/20'
    },
    {
      category: 'Home Appliances',
      title: 'Transform Your Living Space',
      description: 'Smart appliances for a modern, efficient home',
      cta: 'Shop Appliances',
      color: 'bg-orange-600',
      image: '/api/placeholder/800/500',
      overlay: 'bg-orange-500/20'
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Background Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 z-10 ${slide.overlay}`}></div>
            <Image
              src={slide.image}
              alt={slide.category}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <span className={`inline-block ${slides[currentSlide].color} px-4 py-1 rounded-full text-sm font-semibold mb-4`}>
              {slides[currentSlide].category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`${slides[currentSlide].color} hover:opacity-90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105`}>
                {slides[currentSlide].cta}
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-all duration-300">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Category Quick Links */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  index === currentSlide 
                    ? `${slide.color} text-white shadow-lg` 
                    : 'bg-white/80 text-gray-800 hover:bg-white'
                }`}
              >
                <span className="font-medium">{slide.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;