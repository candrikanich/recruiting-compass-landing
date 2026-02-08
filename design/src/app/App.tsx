import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { AppShowcase } from "./components/AppShowcase";
import { Testimonials } from "./components/Testimonials";
import { SurveyCTA } from "./components/SurveyCTA";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

export default function App() {
  const handleSurveyClick = () => {
    // Replace this URL with your actual survey link
    window.open("YOUR_SURVEY_URL_HERE", "_blank");
  };

  return (
    <div className="min-h-screen">
      <Hero onSurveyClick={handleSurveyClick} />
      <Stats />
      <Features />
      <HowItWorks />
      <AppShowcase />
      <Testimonials />
      <SurveyCTA onSurveyClick={handleSurveyClick} />
      <FAQ />
      <Footer />
    </div>
  );
}