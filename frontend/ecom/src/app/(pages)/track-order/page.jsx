'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Sample order data - in a real app, this would come from an API
  const sampleOrder = {
    id: 'TS20231015XYZ',
    status: 'shipped',
    statusText: 'Shipped',
    date: 'October 15, 2023',
    estimatedDelivery: 'October 20, 2023',
    items: [
      {
        id: 1,
        name: 'MacBook Pro 16"',
        price: 2399.99,
        quantity: 1,
        image: '/api/placeholder/80/80'
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        price: 49.99,
        quantity: 1,
        image: '/api/placeholder/80/80'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States'
    },
    tracking: [
      { status: 'ordered', date: 'Oct 15, 2023', time: '10:30 AM', description: 'Order placed' },
      { status: 'processed', date: 'Oct 16, 2023', time: '09:15 AM', description: 'Order processed' },
      { status: 'shipped', date: 'Oct 17, 2023', time: '03:45 PM', description: 'Shipped with UPS', trackingCode: '1Z999AA10123456784' },
      { status: 'out-for-delivery', date: 'Oct 20, 2023', time: '08:00 AM', description: 'Out for delivery' }
    ],
    total: 2449.98,
    shipping: 0,
    tax: 195.00
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate and fetch order data from an API
    setIsSubmitted(true);
    setOrderData(sampleOrder);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'processed': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'out-for-delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ordered': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'processed':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'shipped':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'out-for-delivery':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        );
      case 'delivered':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Order</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Check the status of your order and view its journey to your doorstep.
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Order Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="orderId" className="block text-gray-700 font-medium mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. TS20231015XYZ"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  You can find your Order ID in your confirmation email.
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter the email address used when placing the order.
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Track Order
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Order Details */}
      {isSubmitted && orderData && (
        <>
          {/* Order Summary */}
          <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order #{orderData.id}</h2>
                    <p className="text-gray-600">Placed on {orderData.date}</p>
                  </div>
                  <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full ${getStatusColor(orderData.status)} font-medium`}>
                    {orderData.statusText}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated Delivery</h3>
                  <p className="text-2xl font-bold text-blue-600">{orderData.estimatedDelivery}</p>
                </div>

                {/* Tracking Timeline */}
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Status</h3>
                  
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300"></div>
                    
                    {orderData.tracking.map((step, index) => (
                      <div key={index} className="relative pl-16 pb-10">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-blue-500">
                          {getStatusIcon(step.status)}
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h4 className="text-lg font-medium text-gray-800">{step.description}</h4>
                            <div className="text-gray-500 text-sm mt-1 sm:mt-0">
                              {step.date} at {step.time}
                            </div>
                          </div>
                          
                          {step.trackingCode && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Tracking Code: {step.trackingCode}</p>
                              <a 
                                href="#" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View detailed tracking
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Items</h3>
                  
                  <div className="space-y-4">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="flex items-center bg-gray-50 p-4 rounded-lg">
                        <div className="relative w-16 h-16 mr-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        
                        <div className="text-lg font-semibold text-gray-800">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800">${orderData.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-800">${orderData.shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-800">${orderData.tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="h-px bg-gray-300 my-3"></div>
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-blue-600">${(orderData.total + orderData.shipping + orderData.tax).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h3>
                  
                  <div className="text-gray-600">
                    <p>{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.street}</p>
                    <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}</p>
                    <p>{orderData.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Support CTA */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Need Help With Your Order?</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Our customer support team is here to help with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
                  Contact Support
                </Link>
                <Link href="/faq" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
                  View FAQs
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default OrderTrackingPage;