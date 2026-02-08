import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const testimonials = [
  {
    quote: "As a parent, I felt completely lost in the recruiting process. The Recruiting Compass gave us a clear path forward and peace of mind that we weren't missing critical steps.",
    author: "Jennifer M.",
    role: "Parent of D1 Soccer Recruit",
    rating: 5,
  },
  {
    quote: "Having everything in one place—my stats, coach contacts, deadlines—was a game changer. I signed with my dream school and I know this app helped me get there.",
    author: "Marcus T.",
    role: "Baseball Player, Class of 2025",
    rating: 5,
  },
  {
    quote: "The timeline feature alone is worth it. We knew exactly what to do and when to do it. No more guessing or panicking about whether we were on track.",
    author: "David & Sarah K.",
    role: "Parents of Track & Field Athlete",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <div className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Families Like Yours
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of student-athletes and parents who found clarity in their recruiting journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 relative"
            >
              <Quote className="w-10 h-10 text-green-300 mb-4" />
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1631490238101-a1156ce9bb3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwc2Nob29sJTIwYXRobGV0ZSUyMHJlY3J1aXRpbmd8ZW58MXx8fHwxNzcwNTU4MDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="High school athlete recruiting"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-transparent flex items-center">
            <div className="p-12 max-w-2xl">
              <h3 className="text-4xl font-bold text-white mb-4">
                Your Success Story Starts Here
              </h3>
              <p className="text-xl text-green-100">
                Every great athlete's journey begins with a single step. Take yours today.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}