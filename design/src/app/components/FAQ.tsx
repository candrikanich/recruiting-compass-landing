import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "Who is The Recruiting Compass for?",
    answer: "The Recruiting Compass is designed for high school student-athletes (grades 9-12) and their parents who want to navigate the college recruiting process with confidence. Whether you're just starting or in the middle of recruiting, we're here to help.",
  },
  {
    question: "What sports does the app support?",
    answer: "We support all NCAA sports including football, basketball, baseball, softball, soccer, track & field, volleyball, lacrosse, swimming, tennis, golf, and more. Our platform adapts to the unique recruiting timeline and requirements of each sport.",
  },
  {
    question: "How much does it cost?",
    answer: "We're still finalizing our pricing, but we're committed to making The Recruiting Compass accessible to all families. Early survey participants will receive exclusive discounts and beta access. Take our survey to learn more!",
  },
  {
    question: "When will the app be available?",
    answer: "We're launching in Spring 2026 with both web and iOS versions. Join our survey to get early access and be among the first to experience the platform.",
  },
  {
    question: "How is this different from working with a recruiting service?",
    answer: "The Recruiting Compass empowers you to take control of your own recruiting journey at a fraction of the cost of traditional recruiting services. You get the tools, guidance, and organization you need—all in your pocket. Plus, you maintain full ownership of your relationships with coaches.",
  },
  {
    question: "Do you help with academic requirements?",
    answer: "Yes! We track both athletic and academic progress. Our platform helps you monitor GPA, test scores, and NCAA eligibility requirements so you can ensure you qualify for the programs you're targeting.",
  },
  {
    question: "Can multiple family members access the same account?",
    answer: "Absolutely. We designed The Recruiting Compass with families in mind. Parents and athletes can collaborate on the same account, ensuring everyone stays informed and on the same page.",
  },
  {
    question: "What if I'm not sure about my recruiting timeline?",
    answer: "That's exactly what we're here for! Once you create your profile, we'll generate a personalized recruiting roadmap based on your sport, grade level, and goals. You'll know exactly what to do and when to do it.",
  },
];

export function FAQ() {
  return (
    <div className="py-20 sm:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about The Recruiting Compass
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
