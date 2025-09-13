
import {
  CreditCard,
  Truck,
  Shield,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">NexShop</h3>
            <p className="text-gray-400 mb-6">
              Your one-stop destination for premium products with fast delivery and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Electronics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fashion</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home & Kitchen</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Beauty & Health</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sports & Fitness</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Information</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-400">support@nexshop.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessageCircle className="mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-gray-400">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <Truck className="mb-2 text-blue-400" size={32} />
              <h5 className="font-semibold">Free Shipping</h5>
              <p className="text-sm text-gray-400">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <CreditCard className="mb-2 text-green-400" size={32} />
              <h5 className="font-semibold">Secure Payment</h5>
              <p className="text-sm text-gray-400">Safe & encrypted</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <Shield className="mb-2 text-purple-400" size={32} />
              <h5 className="font-semibold">Quality Guarantee</h5>
              <p className="text-sm text-gray-400">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} NexShop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <p className="text-gray-400 text-sm mr-2">Made with</p>
              <Heart size={16} className="text-red-500" fill="currentColor" />
              <p className="text-gray-400 text-sm ml-2">by NexShop Team</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;