"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.9,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Cubic-bezier para un feeling más premium
      }}
    >
      {children}
    </motion.div>
  );
}
