'use client';

import { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Search,
  Mail,
  Phone,
  Copy,
  ExternalLink,
  Star,
  ArrowRight,
  Calendar,
  CreditCard,
  Home,
  Sparkles,
  MessageCircle
} from 'lucide-react';

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedTrackingCode, setCopiedTrackingCode] = useState(false);

  // Sample order data - enhanced version
  const sampleOrder = {
    id: 'TS20231015XYZ',
    status: 'shipped',
    statusText: 'Shipped',
    progress: 75,
    date: 'October 15, 2023',
    estimatedDelivery: 'October 20, 2023',
    carrier: 'UPS Express',
    items: [
      {
        id: 1,
        name: 'MacBook Pro 16" M2 Max',
        variant: 'Space Gray, 32GB RAM, 1TB SSD',
        price: 2399.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop&crop=center'
      },
      {
        id: 2,
        name: 'Magic Mouse 2',
        variant: 'White',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop&crop=center'
      },
      {
        id: 3,
        name: 'USB-C Hub',
        variant: '7-in-1',
        price: 49.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop&crop=center'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States'
    },
    tracking: [
      { 
        status: 'ordered', 
        date: 'Oct 15, 2023', 
        time: '10:30 AM', 
        description: 'Order confirmed & payment processed',
        completed: true,
        icon: 'order'
      },
      { 
        status: 'processed', 
        date: 'Oct 16, 2023', 
        time: '09:15 AM', 
        description: 'Items packed and ready for shipment',
        completed: true,
        icon: 'package'
      },
      { 
        status: 'shipped', 
        date: 'Oct 17, 2023', 
        time: '03:45 PM', 
        description: 'Package shipped with UPS Express', 
        trackingCode: '1Z999AA10123456784',
        completed: true,
        current: true,
        icon: 'truck'
      },
      { 
        status: 'out-for-delivery', 
        date: 'Oct 20, 2023', 
        time: '08:00 AM', 
        description: 'Out for delivery - arriving today',
        completed: false,
        icon: 'delivery'
      },
      { 
        status: 'delivered', 
        date: '', 
        time: '', 
        description: 'Package delivered',
        completed: false,
        icon: 'delivered'
      }
    ],
    subtotal: 2529.97,
    shipping: 0,
    tax: 202.40,
    total: 2732.37,
    paymentMethod: '**** 4242',
    expectedDeliveryTime: '2-4 PM'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setOrderData(sampleOrder);
    setIsLoading(false);
  };

  const copyTrackingCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedTrackingCode(true);
    setTimeout(() => setCopiedTrackingCode(false), 2000);
  };

  const getStatusIcon = (iconType, completed, current) => {
    const baseClasses = `w-6 h-6 ${completed ? 'text-green-600' : current ? 'text-blue-600' : 'text-gray-400'}`;
    
    switch(iconType) {
      case 'order':
        return <CheckCircle className={baseClasses} />;
      case 'package':
        return <Package className={baseClasses} />;
      case 'truck':
        return <Truck className={baseClasses} />;
      case 'delivery':
        return <MapPin className={baseClasses} />;
      case 'delivered':
        return <Home className={baseClasses} />;
      default:
        return <CheckCircle className={baseClasses} />;
    }
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Package className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Track Your Order</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Where's My Package?
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-blue-100">
            Get real-time updates on your order status and track its journey from our warehouse to your doorstep
          </p>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-blue-200">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Real-time updates
            </div>
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              SMS notifications
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Live GPS tracking
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tracking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Enter Your Order Details</h2>
                <p className="text-gray-600">We'll find your order and show you exactly where it is</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="orderId" className="block text-gray-700 font-semibold">
                    Order ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gray-50 focus:bg-white text-lg"
                      placeholder="e.g. TS20231015XYZ"
                      required
                    />
                    <Package className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    You can find your Order ID in your confirmation email
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-700 font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gray-50 focus:bg-white text-lg"
                      placeholder="your.email@example.com"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Enter the email address used when placing the order
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                >
                  {isLoading ? <LoadingSpinner /> : (
                    <span className="flex items-center justify-center">
                      Track My Order
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">Having trouble?</span> Contact our support team at{' '}
                  <a href="tel:+1234567890" className="text-indigo-600 font-semibold hover:text-indigo-800">
                    (123) 456-7890
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Order Details */}
      {isSubmitted && orderData && (
        <div className="animate-fadeIn">
          {/* Order Status Banner */}
          <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold">Order #{orderData.id}</h2>
                            <p className="text-blue-100">Placed on {orderData.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
                            {orderData.statusText}
                          </div>
                          <div className="text-blue-100">
                            via {orderData.carrier}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center lg:text-right">
                        <div className="text-sm text-blue-100 mb-1">Estimated Delivery</div>
                        <div className="text-3xl font-bold mb-2">{orderData.estimatedDelivery}</div>
                        <div className="text-blue-100">{orderData.expectedDeliveryTime}</div>
                        
                        {/* Progress Bar */}
                        <div className="mt-4 w-full lg:w-64">
                          <div className="flex justify-between text-xs text-blue-100 mb-2">
                            <span>Progress</span>
                            <span>{orderData.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${orderData.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Tracking Timeline */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Order Journey</h3>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300 rounded-full"></div>
                  
                  {orderData.tracking.map((step, index) => (
                    <div key={index} className="relative pl-20 pb-12 last:pb-0">
                      <div className={`absolute left-4 top-0 flex items-center justify-center w-8 h-8 rounded-full border-4 transition-all duration-500 ${
                        step.completed 
                          ? 'bg-green-500 border-green-200 shadow-lg shadow-green-500/30' 
                          : step.current
                            ? 'bg-blue-500 border-blue-200 shadow-lg shadow-blue-500/30 animate-pulse'
                            : 'bg-gray-300 border-gray-100'
                      }`}>
                        {getStatusIcon(step.icon, step.completed, step.current)}
                      </div>
                      
                      <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
                        step.current ? 'border-blue-200 shadow-blue-500/20' : 'border-gray-100'
                      }`}>
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">{step.description}</h4>
                            
                            {step.trackingCode && (
                              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-gray-600 mb-1">Tracking Code</p>
                                    <p className="font-mono text-lg font-semibold text-gray-800">{step.trackingCode}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => copyTrackingCode(step.trackingCode)}
                                      className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 hover:text-indigo-600"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                    <a 
                                      href="#" 
                                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                                    >
                                      Track on UPS
                                      <ExternalLink className="w-4 h-4 ml-1" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {step.date && (
                            <div className="flex items-center text-gray-500 text-sm lg:text-right">
                              <Calendar className="w-4 h-4 mr-2 lg:hidden" />
                              <div>
                                <div className="font-medium">{step.date}</div>
                                <div>{step.time}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Order Items */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-800 mb-8">Order Items</h3>
                
                <div className="grid gap-4">
                  {orderData.items.map((item, index) => (
                    <div key={item.id} className="group bg-gray-50 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-indigo-200">
                      <div className="flex items-center space-x-6">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 mt-1">{item.variant}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">
                            ${item.price.toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500">
                              ${(item.price / item.quantity).toFixed(2)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Order Summary & Shipping */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
                
                {/* Order Summary */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal ({orderData.items.length} items)</span>
                      <span className="text-gray-800 font-medium">${orderData.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-600">Shipping</span>
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">FREE</span>
                      </div>
                      <span className="text-gray-800 font-medium">${orderData.shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-800 font-medium">${orderData.tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                        ${orderData.total.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">Paid with card ending in {orderData.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Shipping Address</h3>
                  </div>
                  
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold text-lg">{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.street}</p>
                    {orderData.shippingAddress.apartment && <p>{orderData.shippingAddress.apartment}</p>}
                    <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}</p>
                    <p className="font-medium">{orderData.shippingAddress.country}</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-700 font-medium">Signature required upon delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Support CTA */}
          <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-6">Need Help?</h2>
                <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed">
                  Our award-winning customer support team is here to help with any questions or concerns about your order.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Phone className="w-8 h-8 mx-auto mb-4 text-blue-300" />
                    <h3 className="font-bold mb-2">24/7 Phone Support</h3>
                    <p className="text-blue-100 text-sm">Call us anytime</p>
                    <a href="tel:+1234567890" className="text-white font-semibold hover:text-blue-200 transition-colors block mt-2">
                      (123) 456-7890
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Mail className="w-8 h-8 mx-auto mb-4 text-blue-300" />
                    <h3 className="font-bold mb-2">Email Support</h3>
                    <p className="text-blue-100 text-sm">We'll respond within 1 hour</p>
                    <a href="mailto:support@techstore.com" className="text-white font-semibold hover:text-blue-200 transition-colors block mt-2">
                      support@techstore.com
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <MessageCircle className="w-8 h-8 mx-auto mb-4 text-blue-300" />
                    <h3 className="font-bold mb-2">Live Chat</h3>
                    <p className="text-blue-100 text-sm">Instant messaging support</p>
                    <a href="#" className="inline-flex items-center justify-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium mt-2 transition-colors">
                      Start Chat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                  <h3 className="font-bold text-lg mb-3">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-blue-200">Monday - Friday</div>
                    <div className="text-white font-medium">24/7</div>
                    <div className="text-blue-200">Saturday - Sunday</div>
                    <div className="text-white font-medium">24/7</div>
                    <div className="text-blue-200">Holidays</div>
                    <div className="text-white font-medium">Limited Support</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;