import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

function StatItem({ value, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Recruiting Process by the Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding the challenge helps you navigate it better
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <StatItem value="180000+" label="High School Athletes Annually" delay={0.1} />
          <StatItem value="480000+" label="College Athletic Opportunities" delay={0.2} />
          <StatItem value="3+" label="Years Average Recruiting Timeline" delay={0.3} />
          <StatItem value="90%" label="Feel Overwhelmed Without Guidance" delay={0.4} />
        </div>
      </div>
    </div>
  );
}