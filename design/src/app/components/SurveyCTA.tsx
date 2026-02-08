import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Gift, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SurveyCTAProps {
  onSurveyClick: () => void;
}

export function SurveyCTA({ onSurveyClick }: SurveyCTAProps) {
  return (
    <div className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1659081443046-268bee889587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXRobGV0ZSUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzcwNTU4MDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Student athlete success"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-emerald-900/95" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Help Us Build Your Perfect Recruiting Tool
            </h2>
            <p className="text-xl sm:text-2xl text-green-100 mb-8">
              Take our 3-minute survey and shape the future of The Recruiting Compass.
              Plus, unlock exclusive benefits!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Gift className="w-10 h-10 text-green-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Early Access</h3>
              <p className="text-green-100 text-sm">Be the first to use the app before public launch</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Clock className="w-10 h-10 text-green-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Exclusive Discounts</h3>
              <p className="text-green-100 text-sm">Special pricing for early survey participants</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-10 h-10 text-green-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Shape the Product</h3>
              <p className="text-green-100 text-sm">Your feedback directly influences our features</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={onSurveyClick}
              className="bg-white text-green-900 hover:bg-green-50 px-10 py-7 text-xl rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300 group"
            >
              Take the Survey Now
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-6 text-green-200 text-sm">
              ⏱️ Takes only 3 minutes • 🔒 Your responses are confidential
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}