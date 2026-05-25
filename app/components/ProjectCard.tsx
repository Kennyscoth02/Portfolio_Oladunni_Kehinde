"use client";
import { motion } from "framer-motion";

export default function ProjectCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-900 p-6 rounded-2xl shadow-xl"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2">{desc}</p>
    </motion.div>
  );
}
