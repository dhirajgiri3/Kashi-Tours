"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
        setIsOpen(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const menuItems = [
    { href: "/#packages", label: "Packages" },
    { href: "/#services", label: "Services" },
    { href: "/#ritual-tours", label: "Ritual Tours" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  return (
    <motion.div
      className={`flex justify-between items-center py-4 px-4 md:px-8 w-full h-16 text-white fixed top-0 z-50  transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${
        isOpen
          ? "bg-black/95 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
      }`}
    >
      <div>
        <Link href="/">
          <h1 className="font-bold font-serif text-2xl">Kashi Tours</h1>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <ul className="flex space-x-6 lg:space-x-10">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="nav-link">
                <p className="text-white hover:text-gray-50 relative group">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-50 transition-all duration-300 group-hover:w-full"></span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col gap-1">
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </div>
      </button>

      <div className="hidden md:block">
        <button
          type="button"
          className="bg-black hover:bg-[#111] text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
        >
          <Link href="/contact-us">Book Now</Link>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-black/95 py-4 px-4 md:hidden backdrop-blur-xl"
          >
            <ul className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <button
                  type="button"
                  className="w-full bg-white text-black font-bold py-2 px-4 rounded-full transition-all duration-300 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/contact-us">Book Now</Link>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
