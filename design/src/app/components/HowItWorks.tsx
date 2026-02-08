import { motion } from "motion/react";
import { UserPlus, Route, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Tell us about your sport, academic achievements, and recruiting goals. Takes just 5 minutes.",
    step: "01",
  },
  {
    icon: Route,
    title: "Follow Your Custom Roadmap",
    description: "Get your personalized recruiting timeline with actionable steps, deadlines, and expert guidance.",
    step: "02",
  },
  {
    icon: Trophy,
    title: "Sign with Confidence",
    description: "Track your progress, manage coach relationships, and make informed decisions that lead to success.",
    step: "03",
  },
];

export function HowItWorks() {
  return (
    <div className="py-20 sm:py-32 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your recruiting journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300" 
               style={{ width: 'calc(100% - 200px)', left: '100px' }} />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute text-8xl font-bold text-green-100 opacity-50">
                    {step.step}
                  </div>
                  <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}