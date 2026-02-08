import { Compass, Mail, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-8 h-8 text-green-400" />
              <span className="text-xl font-bold text-white">The Recruiting Compass</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Navigate your path to college athletic success with confidence, clarity, and expert guidance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-green-400 transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-green-400 transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-green-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@therecruitingcompass.com" className="hover:text-green-400 transition-colors">
                  info@therecruitingcompass.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 The Recruiting Compass. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            {" • "}
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}