"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl font-bold tracking-tight"
      >
        Crafting Digital
        <span className="gradient-animated bg-clip-text text-transparent block">
          Experiences
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 max-w-xl text-gray-400 text-lg"
      >
        Full-Stack Developer building scalable, high-performance applications
        with modern technologies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10"
      >
        <button className="px-8 py-4 bg-white text-black rounded-full hover:scale-105 transition">
          View Work
        </button>
      </motion.div>
    </section>
  );
}
