"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, Suspense } from "react";
import dynamic from "next/dynamic";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import PrimaryButton from "Components/UI/Buttons/PrimaryButton";
import Image from "next/image";
import Loader from "Components/UI/Loader";
import { Toaster, toast } from "react-hot-toast";
import { BsWhatsapp } from "react-icons/bs";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { useInView } from "react-intersection-observer";
import ReactConfetti from "react-confetti";

// Load WorldMap with updated fancy loader
const DynamicWorldMap = dynamic(
  () =>
    import("Components/UI/WorldMap").then((mod) => ({ default: mod.WorldMap })),
  {
    loading: () => <Loader size="md" text="Loading map..." />,
    ssr: false,
  }
);

interface FormData {
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phone: string;
  whatsapp: string;
  destination: string;
  travelDate: Date | null;
  peopleCount: string;
  vacationType: string;
  message: string;
  preferredContactMethod: "email" | "phone" | "whatsapp";
  budget: string;
  interests: string[];
}

interface WindowSize {
  width: number;
  height: number;
}

interface ToastProps {
  visible: boolean;
}

// Separate component for contact information
const ContactInfo = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-primary/20 shadow-xl space-y-8">
    <div>
      <h2 className="text-2xl font-serif font-semibold text-gray-800 flex items-center">
        <span className="text-primary">॥</span> Sacred Location{" "}
        <span className="text-primary">॥</span>
      </h2>
      <div className="relative h-72 rounded-xl mt-4 overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1617904472808-7e038208077a?q=80&w=3131&auto=format&fit=crop"
          alt="Varanasi Ghat"
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-serif text-xl">Dashashwamedh Ghat</h3>
          <p className="text-sm text-gray-200">Varanasi, Uttar Pradesh</p>
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-serif font-semibold text-gray-800 flex items-center">
        <span className="text-primary">॥</span> Connect With Us{" "}
        <span className="text-primary">॥</span>
      </h2>
      <div className="space-y-6 mt-6">
        <motion.div
          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          <div className="p-3 bg-primary/10 rounded-lg">
            <FiMapPin className="text-primary text-xl" />
          </div>
          <div>
            <p className="font-serif text-gray-800 font-semibold">
              Sacred Address
            </p>
            <p className="text-gray-600">
              Dashashwamedh Ghat, Varanasi, UP, India
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          <div className="p-3 bg-primary/10 rounded-lg">
            <FiPhone className="text-primary text-xl" />
          </div>
          <div>
            <p className="font-serif text-gray-800 font-semibold">Connect</p>
            <p className="text-gray-600">+91 1234567890</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          <div className="p-3 bg-primary/10 rounded-lg">
            <FiMail className="text-primary text-xl" />
          </div>
          <div>
            <p className="font-serif text-gray-800 font-semibold">Email Us</p>
            <p className="text-gray-600">info@example.com</p>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Sacred Quote */}
    <div className="text-center p-6 bg-primary/5 rounded-lg mt-8">
      <p className="font-serif text-gray-600 italic">
        "The sacred journey begins with a single step of faith"
      </p>
    </div>
  </div>
);

export default function ContactUs() {
  const [state, handleFormspreeSubmit] = useForm("xdkawpeg");
  // Initialize with null/empty values to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phone: "",
    whatsapp: "",
    destination: "",
    travelDate: null,
    peopleCount: "",
    vacationType: "",
    message: "",
    preferredContactMethod: "email",
    budget: "",
    interests: [],
  });

  // Add useEffect to handle client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const { ref: formRef, inView: formInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Add window size listener
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const interests = [
    "Temple Tours",
    "Spiritual Retreats",
    "Meditation Sessions",
    "Cultural Programs",
    "Holy River Ceremonies",
    "Ayurvedic Experiences",
  ];

  const validateForm = (data: FormData): boolean => {
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!data.phone.match(/^\+?[\d\s-]{10,}$/)) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      travelDate: date,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    // Call Formspree submission. Do not capture a result here as it returns void.
    await handleFormspreeSubmit(e);
    setIsSubmitting(false);
  };

  // Listen for changes on the Formspree state to handle success or errors
  useEffect(() => {
    if (state.succeeded) {
      setShowConfetti(true);
      toast.custom((t: ToastProps) => (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-sm rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-6`}
        >
          {/* You can customize your toast content here */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">
              Successfully submitted!
            </span>
            <span className="text-gray-500 text-sm">
              Your sacred journey request has been received.
            </span>
          </div>
        </motion.div>
      ), { duration: 5000 });

      // Reset form and confetti handling...
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          city: "",
          email: "",
          phone: "",
          whatsapp: "",
          destination: "",
          travelDate: null,
          peopleCount: "",
          vacationType: "",
          message: "",
          preferredContactMethod: "email",
          budget: "",
          interests: [],
        });
        setTimeout(() => setShowConfetti(false), 4000);
      }, 1000);
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast.custom((t: ToastProps) => (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-sm rounded-xl pointer-events-auto flex ring-1 ring-red-100 p-6`}
        >
          {/* You can customize your error toast content here */}
          <div className="flex flex-col">
            <span className="font-semibold text-red-600">
              Submission failed!
            </span>
            <span className="text-gray-500 text-sm">
              Please try again.
            </span>
          </div>
        </motion.div>
      ), { duration: 4000 });
    }
  }, [state.succeeded, state.errors]);

  // Updated fadeInUp for smoother overall UI animation
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // Loader for the entire hero section
  const heroLoader = (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Loader size="lg" text="Loading interactive map..." />
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <Toaster position="top-center" />
      
      {/* Only render client-specific content after hydration */}
      {isClient && (
        <>
          {/* Hero Section */}
          <Suspense fallback={heroLoader}>
            <div className="relative h-[80vh] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <DynamicWorldMap
                  dots={[
                    // Varanasi to London
                    {
                      start: { lat: 25.3176, lng: 82.9739, label: "Varanasi" },
                      end: { lat: 51.5074, lng: -0.1278, label: "London" },
                    },
                    // Varanasi to New York
                    {
                      start: { lat: 25.3176, lng: 82.9739, label: "Varanasi" },
                      end: { lat: 40.7128, lng: -74.006, label: "New York" },
                    },
                    // Varanasi to Tokyo
                    {
                      start: { lat: 25.3176, lng: 82.9739, label: "Varanasi" },
                      end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
                    },
                    // Varanasi to Singapore
                    {
                      start: { lat: 25.3176, lng: 82.9739, label: "Varanasi" },
                      end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
                    },
                    // Haridwar to Sydney
                    {
                      start: { lat: 29.9457, lng: 78.1642, label: "Haridwar" },
                      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
                    },
                    // Haridwar to Cairo
                    {
                      start: { lat: 29.9457, lng: 78.1642, label: "Haridwar" },
                      end: { lat: 30.033, lng: 31.2336, label: "Cairo" },
                    },
                    // Haridwar to Cape Town
                    {
                      start: { lat: 29.9457, lng: 78.1642, label: "Haridwar" },
                      end: { lat: -33.9249, lng: 18.4241, label: "Cape Town" },
                    },
                    // Ayodhya to Hong Kong
                    {
                      start: { lat: 29.9457, lng: 78.1642, label: "Haridwar" },
                      end: { lat: 22.3193, lng: 114.1694, label: "Hong Kong" },
                    },
                    // Ayodhya to Moscow
                    {
                      start: { lat: 25.3176, lng: 82.9739, label: "Varanasi" },
                      end: { lat: 55.7558, lng: 37.6176, label: "Moscow" },
                    },
                  ]}
                  lineColor="#DAA520"
                />
              </div>

              <motion.div
                {...fadeInUp}
                className="relative z-20 h-full flex flex-col items-center justify-center px-4"
              >
                <div className="text-center space-y-6">
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800">
                    Begin Your Sacred Journey
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
                    Embark on a transformative journey through ancient spiritual lands
                  </p>
                  <div className="mt-8">
                    <a href="#contact-form">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full font-serif"
                      >
                        Start Your Pilgrimage
                      </motion.button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </Suspense>

          {/* Form Section */}
          <div id="contact-form" className="relative z-20 container mx-auto px-4 py-16 -mt-32">
            {showConfetti && (
              <ReactConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.2}
                colors={[
                  "#DAA520",
                  "#FFD700",
                  "#FFA500",
                  "#FF8C00",
                  "#FFB6C1",
                  "#FFC0CB",
                ]}
                onConfettiComplete={() => setShowConfetti(false)}
                tweenDuration={4000}
                drawShape={(ctx) => {
                  ctx.beginPath();
                  for (let i = 0; i < 22; i++) {
                    const angle = 0.35 * i;
                    const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                    const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                  }
                  ctx.fill();
                  ctx.closePath();
                }}
              />
            )}

            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 50 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Contact Form */}
              <motion.div
                {...fadeInUp}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-primary/20 h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary/30"
              >
                <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-800 flex items-center">
                  <span className="text-primary mr-2">॥</span> Book Your Sacred Journey
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      />
                      <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      />
                      <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      />
                      <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      id="travelDate"
                      name="travelDate"
                      type="date"
                      placeholder="Travel Date"
                      value={
                        formData.travelDate
                          ? formData.travelDate.toISOString().slice(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        handleDateChange(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                      required
                    />
                    <ValidationError prefix="Travel Date" field="travelDate" errors={state.errors} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        id="destination"
                        name="destination"
                        type="text"
                        placeholder="Travel Destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      />
                      <ValidationError prefix="Destination" field="destination" errors={state.errors} />
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      />
                      <ValidationError prefix="City" field="city" errors={state.errors} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        id="peopleCount"
                        name="peopleCount"
                        type="number"
                        placeholder="Number of People"
                        min="1"
                        value={formData.peopleCount}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      />
                      <ValidationError prefix="People Count" field="peopleCount" errors={state.errors} />
                    </div>
                    <div>
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        id="vacationType"
                        name="vacationType"
                        title="Select vacation type"
                        value={formData.vacationType}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif"
                        required
                      >
                        <option value="">Select vacation type</option>
                        <option value="adventure">Adventure</option>
                        <option value="leisure">Leisure</option>
                        <option value="cultural">Cultural</option>
                        <option value="wildlife">Wildlife</option>
                      </motion.select>
                      <ValidationError prefix="Vacation Type" field="vacationType" errors={state.errors} />
                    </div>
                  </motion.div>

                  <motion.div className="space-y-4">
                    <label className="block text-gray-700 font-serif">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                      {["email", "phone", "whatsapp"].map((method) => (
                        <motion.button
                          key={method}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              preferredContactMethod: method as "email" | "phone" | "whatsapp",
                            }))
                          }
                          className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                            formData.preferredContactMethod === method
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {method === "whatsapp" && <BsWhatsapp />}
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div className="space-y-4">
                    <label className="block text-gray-700 font-serif">Areas of Interest</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interests.map((interest) => (
                        <motion.button
                          key={interest}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInterestToggle(interest)}
                          className={`p-3 rounded-lg text-sm text-center transition-colors ${
                            formData.interests.includes(interest)
                              ? "bg-primary/20 text-primary border-2 border-primary"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {interest}
                        </motion.button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      name="interests"
                      value={formData.interests.join(", ")}
                    />
                  </motion.div>

                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    placeholder="Tell us about your spiritual journey expectations..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 font-serif h-32 resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={state.submitting}
                    className={`w-full mt-8 py-4 rounded-full font-serif text-lg relative overflow-hidden ${
                      state.submitting ? "bg-primary/70" : "bg-gradient-to-r from-primary to-primary/90"
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: state.submitting ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-white/20"
                    />
                    <span className="relative text-white flex items-center justify-center gap-2">
                      {state.submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Embarking on Journey...
                        </>
                      ) : (
                        <>
                          Begin Your Sacred Journey
                          <FiSend className="text-xl" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                {...fadeInUp}
                className="hidden lg:block h-[95vh] overflow-y-auto rounded-xl scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary/30"
                style={{
                  scrollbarWidth: "thin",
                  msOverflowStyle: "none",
                }}
              >
                <ContactInfo />
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}