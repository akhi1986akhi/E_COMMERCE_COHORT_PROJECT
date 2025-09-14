'use client';

import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 4000);
    }, 2000);
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused products in their original packaging. Return shipping is free for defective items.",
      icon: "🔄"
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery in most metropolitan areas.",
      icon: "🚚"
    },
    {
      question: "Do you offer technical support?",
      answer: "Yes, we offer free technical support for all products purchased from our store. Contact us via phone or email for assistance.",
      icon: "🛠️"
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a tracking number via email that you can use to monitor your package's journey.",
      icon: "📦"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 rounded-full mb-8">
              <div className="bg-black/20 backdrop-blur-md px-6 py-3 rounded-full">
                <span className="text-white font-medium">💬 Let's Connect</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              We're here to help transform your tech experience. <br />
              Reach out and let's build something amazing together.
            </p>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                  Connect With Us
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Have questions about our cutting-edge products or need expert guidance? 
                  Our dedicated team is ready to assist you on your tech journey.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: "📞",
                    title: "Phone Support",
                    primary: "+1 (555) 123-4567",
                    secondary: "Mon-Fri: 8:00 AM - 8:00 PM EST",
                    color: "from-blue-500 to-cyan-400"
                  },
                  {
                    icon: "✉️",
                    title: "Email Support",
                    primary: "support@techstore.com",
                    secondary: "We'll respond within 24 hours",
                    color: "from-purple-500 to-pink-400"
                  },
                  {
                    icon: "📍",
                    title: "Visit Our Store",
                    primary: "123 Tech Avenue",
                    secondary: "San Francisco, CA 94107",
                    color: "from-orange-500 to-yellow-400"
                  }
                ].map((contact, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur-lg transition-opacity duration-500" 
                         style={{background: `linear-gradient(135deg, ${contact.color.split(' ')[1]}, ${contact.color.split(' ')[3]})`}}></div>
                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                      <div className="flex items-start gap-4">
                        <div className={`bg-gradient-to-r ${contact.color} p-4 rounded-xl shadow-lg`}>
                          <span className="text-2xl">{contact.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{contact.title}</h3>
                          <p className="text-gray-300 font-medium">{contact.primary}</p>
                          <p className="text-gray-400 text-sm mt-1">{contact.secondary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-white mb-6">Follow Our Journey</h3>
                <div className="flex gap-4">
                  {[
                    { icon: "𝕏", color: "from-gray-600 to-gray-800", hover: "hover:from-gray-500 hover:to-gray-700" },
                    { icon: "💼", color: "from-blue-600 to-blue-800", hover: "hover:from-blue-500 hover:to-blue-700" },
                    { icon: "📷", color: "from-pink-600 to-rose-600", hover: "hover:from-pink-500 hover:to-rose-500" },
                    { icon: "🎵", color: "from-purple-600 to-indigo-600", hover: "hover:from-purple-500 hover:to-indigo-500" }
                  ].map((social, index) => (
                    <button
                      key={index}
                      className={`bg-gradient-to-r ${social.color} ${social.hover} p-4 rounded-xl text-white text-xl font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-xl`}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
                
                {isSubmitted && (
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 p-6 rounded-2xl mb-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <p className="font-semibold">Message sent successfully!</p>
                        <p className="text-sm opacity-80">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-gray-300 font-medium mb-3">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-gray-300 font-medium mb-3">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 font-medium mb-3">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 font-medium mb-3">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none backdrop-blur-sm"
                      placeholder="Tell us more about how we can help you..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Quick answers to help you get the information you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl text-xl shrink-0">
                      {faq.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Visit Our Experience Center
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Come explore our latest tech in person at our flagship store
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-96 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">Interactive Map Integration</p>
                      <p className="text-lg opacity-80 mt-2">123 Tech Avenue, San Francisco, CA 94107</p>
                      <p className="text-sm opacity-60 mt-1">Experience the future of technology retail</p>
                    </div>
                  </div>
                </div>
                
                {/* Animated dots for visual interest */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-white/30 rounded-full animate-pulse"
                      style={{
                        left: `${20 + (i * 15)}%`,
                        top: `${30 + (i % 2) * 40}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">TechStore Experience Center</h3>
                    <p className="text-gray-300 mb-1">123 Tech Avenue, San Francisco, CA 94107</p>
                    <p className="text-gray-400 text-sm">Mon-Sat: 10:00 AM - 7:00 PM PST</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 font-medium">
                      Get Directions
                    </button>
                    <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                      Call Store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  );
};

export default ContactPage;