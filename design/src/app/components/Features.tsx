import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Calendar, 
  Users, 
  Target, 
  BarChart3, 
  MessageSquare,
  FileCheck,
  Bell
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const features = [
  {
    icon: Target,
    title: "Personalized Recruiting Roadmap",
    description: "Get a custom timeline based on your sport, grade level, and goals. Never miss a critical deadline or opportunity.",
    forWho: "For Players & Parents",
  },
  {
    icon: Users,
    title: "Coach Communication Hub",
    description: "Track all your interactions with college coaches in one place. Know who you've contacted, when, and what's next.",
    forWho: "For Players",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling & Reminders",
    description: "Automated reminders for campus visits, showcase events, and NCAA compliance deadlines. Stay ahead of the game.",
    forWho: "For Parents",
  },
  {
    icon: BarChart3,
    title: "Athletic & Academic Progress Tracker",
    description: "Monitor your stats, GPA, test scores, and see how you stack up against college program requirements.",
    forWho: "For Players",
  },
  {
    icon: FileCheck,
    title: "Document Management",
    description: "Store and organize highlight videos, transcripts, test scores, and athletic resumes. Share them instantly with coaches.",
    forWho: "For Players & Parents",
  },
  {
    icon: MessageSquare,
    title: "Expert Guidance & Resources",
    description: "Access expert tips, sample emails, NCAA rules explained simply, and answers to your toughest questions.",
    forWho: "For Parents",
  },
  {
    icon: Bell,
    title: "Opportunity Alerts",
    description: "Get notified about camps, showcases, and recruiting events that match your profile and goals.",
    forWho: "For Players",
  },
  {
    icon: CheckCircle2,
    title: "Task Management System",
    description: "Break down the recruiting process into manageable steps. Check off tasks and watch your progress grow.",
    forWho: "For Players & Parents",
  },
];

export function Features() {
  return (
    <div id="features" className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop juggling spreadsheets, emails, and sticky notes. The Recruiting Compass brings
            clarity and confidence to your recruiting journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-3 text-sm">{feature.description}</p>
                <span className="inline-block text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  {feature.forWho}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Image showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1489824740691-7a25f94fc85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwc3BvcnRzfGVufDF8fHx8MTc3MDU1ODA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="College campus sports"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Your Dream School is Waiting</h3>
              <p className="text-lg text-green-100">Let us help you get there with confidence and clarity.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}