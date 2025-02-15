import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-gold/10 pb-8">
      {/* Refined background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,_191,_36,_0.12)_0%,_transparent_60%)] motion-safe:animate-[gradient_20s_ease_infinite] transform hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(251,_191,_36,_0.08)_0%,_transparent_60%)] motion-safe:animate-[gradient_25s_ease_infinite] motion-safe:animate-pulse" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 pt-8">
        {/* Enhanced Newsletter Section with floating animation and improved hover states */}
        <div className="mb-20 sm:mb-28 max-w-3xl mx-auto transform hover:scale-[1.02] transition-all duration-700 ease-out">
          <div className="text-center space-y-8 relative group cursor-pointer">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gold/10 via-transparent to-transparent rounded-3xl blur-3xl group-hover:opacity-90 transition-all duration-700" />
            <h3 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-tight transform group-hover:scale-[1.02] transition-transform duration-500">
              Join our spiritual journey
              <span className="block text-base sm:text-lg text-gray-500 mt-3 font-sans group-hover:text-gray-700 transition-colors duration-300">
                Discover the divine essence of Kashi in your inbox
              </span>
            </h3>
            <div className="group/form relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 to-gold/30 rounded-2xl blur-xl opacity-100 group-hover/form:opacity-100 transition-all duration-700" />
              <div className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-50 transition-all duration-500">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3.5 rounded-xl bg-transparent border border-gray-100 focus:border-gold/30 focus:ring-2 focus:ring-gold/20 outline-none text-sm placeholder:text-gray-400 transition-all duration-300"
                />
                <button
                  className="group/btn relative px-6 py-3.5 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-sm font-medium
                    rounded-xl overflow-hidden transition-all duration-500
                    hover:from-gray-800 hover:to-gray-700 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]
                    active:scale-[0.98] active:duration-100
                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(251,191,36,0.15)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer-slow opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-500 group-hover/btn:translate-x-[-4px]">
                    <span>Subscribe</span>
                    <svg
                      className="w-4 h-4 transform transition-all duration-500 group-hover/btn:translate-x-1 group-hover/btn:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>

                  <div className="absolute inset-0 border border-white/20 rounded-xl opacity-0 scale-[1.05] group-hover/btn:opacity-100 group-hover/btn:scale-100 transition-all duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-20">
          {/* Company Info with enhanced animation */}
          <div className="space-y-6">
            <Link href="/" className="group inline-flex items-center">
              <h3 className="text-3xl sm:text-4xl font-serif font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 group-hover:opacity-80 transition-all duration-500 ease-out transform group-hover:scale-[1.03] group-hover:translate-x-1">
                Kashi Tours
              </h3>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs hover:text-gray-600 transition-colors duration-300">
              Curating sacred experiences and spiritual journeys in the heart of
              ancient Kashi.
            </p>
          </div>

          {/* Enhanced Quick Links with improved hover effects */}
          <div className="space-y-6">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                "Kashi Vishwanath Darshan",
                "Ganga Aarti & Holy Dip",
                "Pind Daan & Rituals",
                "Ayodhya Ram Mandir",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="group relative block overflow-hidden rounded-lg"
                  >
                    <span className="relative inline-block w-full px-4 py-2 text-sm text-gray-600 transition-all duration-300 group-hover:text-black">
                      {item}
                      <span className="absolute inset-0 w-1 bg-gold/30 left-0 top-0 h-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                      <span className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info with floating effect */}
          <div className="space-y-5">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              {[
                { icon: FaMapMarkerAlt, text: "Kashi, Varanasi" },
                { icon: FaPhone, text: "+91 XXXXXXXXXX" },
                { icon: FaEnvelope, text: "connect@kashitours.com" },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="p-2 rounded-lg bg-transparent group-hover:bg-gray-50 transition-all duration-300">
                    <item.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                  </span>
                  <span className="group-hover:text-gray-800 transition-colors duration-300">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Social Links with floating animations */}
          <div className="space-y-6">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: FaFacebook, label: "Facebook", color: "#1877F2" },
                { icon: FaInstagram, label: "Instagram", color: "#E4405F" },
                { icon: FaTwitter, label: "Twitter", color: "#1DA1F2" },
                { icon: FaYoutube, label: "YouTube", color: "#FF0000" },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href="#"
                  aria-label={social.label}
                  className="group relative p-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-[1px]"
                >
                  {/* Simple hover background */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${social.color}10, transparent)`,
                    }}
                  />

                  {/* Icon container */}
                  <div className="relative z-10">
                    <social.icon
                      className="w-5 h-5 text-gray-400 transition-colors duration-300
                group-hover:text-gray-800"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p className="group">
              © 2025{" "}
              <span className="text-gray-600 group-hover:text-black transition-colors duration-300">
                Kashi Tours
              </span>
              . All rights reserved.
            </p>
            <div className="flex gap-6 sm:gap-8">
              {["Privacy", "Terms", "Sitemap"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="relative group hover:text-black transition-all duration-300 hover:-translate-y-0.5"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
