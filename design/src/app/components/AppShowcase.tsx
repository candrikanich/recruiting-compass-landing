import { motion } from "motion/react";
import { useState } from "react";
import { Smartphone, Monitor } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function AppShowcase() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <div className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Your Recruiting Command Center
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Access your personalized recruiting dashboard anywhere—on your desktop at home or 
            on your phone between classes. Everything syncs seamlessly across all your devices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="web" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white/10 backdrop-blur-sm p-1 rounded-full">
              <TabsTrigger 
                value="web" 
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-green-900 text-white flex items-center gap-2"
              >
                <Monitor className="w-4 h-4" />
                Web App
              </TabsTrigger>
              <TabsTrigger 
                value="ios" 
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-green-900 text-white flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                iOS App
              </TabsTrigger>
            </TabsList>

            <TabsContent value="web" className="mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Web App Preview */}
                <div className="bg-gray-800 rounded-t-2xl p-2 shadow-2xl">
                  <div className="flex gap-1.5 mb-2 px-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden border-4 border-gray-700">
                    {/* Replace this image with your actual web app screenshot */}
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZCUyMG1vZGVybnxlbnwxfHx8fDE3NzA1NTg5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Web App Dashboard"
                      className="w-full h-auto"
                    />
                    {/* Overlay text for placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-green-900/80 backdrop-blur-sm">
                      <div className="text-center p-8">
                        <Monitor className="w-16 h-16 text-white mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Web App Screenshot Coming Soon
                        </h3>
                        <p className="text-green-100">
                          Full-featured dashboard with recruiting timeline, coach contacts, and progress tracking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature highlights for web */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Complete Dashboard View</h4>
                    <p className="text-green-100 text-sm">
                      See your entire recruiting journey at a glance with comprehensive analytics and insights
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Manage Multiple Prospects</h4>
                    <p className="text-green-100 text-sm">
                      Track conversations with dozens of coaches across different programs simultaneously
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Upload & Share Documents</h4>
                    <p className="text-green-100 text-sm">
                      Easily upload highlight videos, transcripts, and share them instantly with coaches
                    </p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="ios" className="mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex justify-center"
              >
                {/* iOS App Preview */}
                <div className="relative max-w-sm">
                  {/* Phone frame */}
                  <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
                    {/* Notch */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                    
                    <div className="bg-white rounded-[2.5rem] overflow-hidden relative" style={{ aspectRatio: '9/19.5' }}>
                      {/* Replace this image with your actual iOS app screenshot */}
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcwNTU4OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="iOS App Interface"
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay text for placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-green-900/80 backdrop-blur-sm">
                        <div className="text-center p-8">
                          <Smartphone className="w-16 h-16 text-white mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-white mb-2">
                            iOS App Screenshot Coming Soon
                          </h3>
                          <p className="text-green-100 text-sm">
                            Stay connected on the go with push notifications and instant updates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature highlights for iOS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">On-the-Go Access</h4>
                    <p className="text-green-100 text-sm">
                      Check your recruiting status between classes, at practice, or during tournaments
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Push Notifications</h4>
                    <p className="text-green-100 text-sm">
                      Never miss a deadline, coach response, or important recruiting opportunity
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Quick Updates</h4>
                    <p className="text-green-100 text-sm">
                      Log conversations, update stats, and mark tasks complete in seconds
                    </p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
