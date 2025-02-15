"use client";

import React from "react";
import { AnimatedTestimonials } from "Components/UI/animated-testimonials";
import { motion } from "framer-motion";

interface Testimonial {
    quote: string;
    name: string;
    designation: string;
    src: string;
}

const Testimonials: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            quote:
                "Visiting Kashi was my lifelong dream, and Kashi Mitra Tours made it an unforgettable reality. From the moment I arrived, everything was seamlessly arranged – the darshan at Kashi Vishwanath Temple, the serene boat ride on the Ganges, and the mesmerizing Ganga Aarti. The guides were incredibly knowledgeable, sharing the deep spiritual significance of every ritual. I felt a profound connection with my faith throughout the journey.",
            name: "Anita Sharma",
            designation: "New Delhi",
            src:
                "https://www.lummi.ai/api/render/image/e70716c4-8984-4644-8e3f-d6d07d7379d0?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImU3MDcxNmM0LTg5ODQtNDY0NC04ZTNmLWQ2ZDA3ZDczNzlkMCIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiYlEwUHhJeHNQWnlpRG80YlBiX3RLIiwiaWF0IjoxNzM5MTI4MTU1LCJleHAiOjE3MzkxMjgyMTV9.mxytcT7JlYT6nf-7NyfPnczYoxEN64pkrW7Ll6ymyrs",
        },
        {
            quote:
                "I had seen the Ganga Aarti on TV before, but experiencing it in person with Kashi Mitra Tours was something else! They arranged VIP seating, so I had a front-row view of the grand aarti at Dashashwamedh Ghat. The synchronized movements of the priests, the sound of conch shells, and the chanting created an atmosphere of pure divinity.",
            name: "Ravi Gupta",
            designation: "Bangalore",
            src:
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "I wanted to perform a special Pind Daan ceremony for my ancestors in Kashi, and Kashi Mitra Tours handled everything with such devotion and care. The Vedic priests were experienced, and the ritual was conducted exactly as per scriptures. They provided all necessary samagri, and I didn't have to worry about a thing.",
            name: "Sudhir Mishra",
            designation: "Kolkata",
            src:
                "https://images.pexels.com/photos/30605308/pexels-photo-30605308/free-photo-of-portrait-of-a-naga-sadhu-in-prayagraj-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            quote:
                "I was initially hesitant about traveling alone for a pilgrimage, but Kashi Mitra Tours made me feel completely safe and comfortable. Their team ensured I was taken care of at every step – from temple visits to guided tours of hidden spiritual spots in Kashi. The itinerary was well-planned, yet flexible enough to allow personal time for meditation.",
            name: "Krishnan Iyer",
            designation: "Chennai",
            src:
                "https://images.unsplash.com/photo-1631034527597-2d46ad65e09c?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
    ];

    return (
        <section className="relative py-0 pb-16 bg-gradient-to-b from-gray-50 overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(218,165,32,0.08),rgba(255,255,255,0))]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(218,165,32,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(218,165,32,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
            </div>

            <div className="container relative z-10 mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6"
                    >
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/20 transition"
                            role="presentation"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                            </span>
                            <span className="text-primary font-medium">Testimonials</span>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                    >
                        <span className="relative inline-block">
                            <span className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-2xl" />
                            <span className="relative font-serif bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-600">
                                What Our Pilgrims Say
                            </span>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto"
                    >
                        Real experiences from our spiritual journeys in Kashi that transformed
                        lives and created lasting memories.
                    </motion.p>
                </div>

                {/* Animated Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="relative mx-auto"
                >
                    <AnimatedTestimonials
                        testimonials={testimonials}
                        autoplay={false}
                        className="relative z-10"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
