// src/components/Footer.jsx
import React from 'react';
import { Github, Heart, Code, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">About AssignmentHub</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              A modern assignment/Quiz tracking system built with React, Vite, Tailwind CSS, and Sanity CMS. 
              Keep track of your academic deadlines with an elegant and intuitive interface.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Built With</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                React
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                Vite
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
                Tailwind CSS
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Sanity CMS
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Lucide Icons
              </span>
            </div>
          </div>

          {/* Links & Credits */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Connect</h3>
            <div className="space-y-2">
              <a
                href="https://github.com/hasnaindevx/assignmentquiz-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>View on GitHub and give it a STAR plzzzz</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              
              <a
                href="https://github.com/hasnaindevx/assignmentquiz-tracker/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <Code className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Report Issues</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://github.com/hasnaindevx/assignmentquiz-tracker#contributing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Contribute</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} AssignmentHub. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by</span>
              <a 
                href="https://github.com/hasnaindevx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Hasnain
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;