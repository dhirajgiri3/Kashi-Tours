import React from "react";
import ModernSlider from "../Components/ModernSlider/ModernSlider";
import { TimelineDemo } from "../Components/UI/Timeline";
import Packages from "../Components/Home/Packages";
import RitualTours from "Components/Home/RitualTours";
import Testimonials from "Components/Home/Testimonials";
import AboutUs from "Components/Home/AboutUs";

const slides = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/dgak25skk/image/upload/v1737110685/kashi-banner1_qyiq2o.png",
    url: "/",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dgak25skk/image/upload/v1737110686/kashi-banner2_ohv3he.png",
    url: "/about",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/dgak25skk/image/upload/v1737110686/kashi-banner3_cyu8ze.png",
    url: "/services",
  },
  {
    id: 4,
    imageUrl:
      "https://res.cloudinary.com/dgak25skk/image/upload/v1737110686/kashi-banner4_lgeqku.png",
    url: "/contact",
  },
];

function Page() {
  return (
    <main className="relative w-full min-h-screen">
      <section className="w-full" id="hero">
        <ModernSlider slides={slides} />
      </section>

      <section className="w-full services" id="services">
        <TimelineDemo />
      </section>

      <section className="w-full min-h-screen" id="packages">
        <Packages />
      </section>

      <section className="w-full min-h-screen" id="ritual-tours">
        <RitualTours />
      </section>

      <section className="w-full min-h-screen" id="testimonials">
        <Testimonials />
      </section>

      <section className="w-full min-h-screen" id="about-us">
        <AboutUs />
      </section>
    </main>
  );
}

export default Page;
