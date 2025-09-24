import React from "react";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  AirCover
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Anti-discrimination
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Disability support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Cancellation options
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Airbnb your home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  AirCover for Hosts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Hosting resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Community forum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Hosting responsibly
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  New features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Gift cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Company details
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4 sm:mb-0">
            <span>© 2024 Airbnb, Inc.</span>
            <a href="#" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900">
              Sitemap
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
              <Globe size={18} />
              <span>English (US)</span>
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
