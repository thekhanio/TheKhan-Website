import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedUnderlineProps {
  className?: string;
  vertical?: boolean;
}

export function AnimatedUnderline({ className = "", vertical = false }: AnimatedUnderlineProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (vertical) {
    if (!mounted) {
      return (
        <div className={`w-[2px] rounded-full bg-gradient-to-b from-transparent via-[#2563eb] to-transparent ${className}`} />
      );
    }

    return (
      <div className={`relative rounded-full overflow-hidden ${className}`} style={{ minWidth: "2px" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2563eb]/40 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2563eb] to-transparent"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06b6d4] to-transparent"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.3 }}
        />
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className={`h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#2563eb] to-transparent ${className}`} />
    );
  }

  return (
    <div className={`relative h-0.5 rounded-full overflow-hidden ${className}`}>
      {/* Static base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />

      {/* Animated flowing gradient - cyan to blue */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Secondary animated gradient - lighter cyan for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06b6d4]/70 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
          delay: 0.3,
        }}
      />
    </div>
  );
}
