import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is PCOS?",
      answer:
        "Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age. Women with PCOS may have irregular periods, elevated male hormone levels, and may develop cysts in their ovaries.",
    },
    {
      question: "What are the common symptoms of PCOS?",
      answer:
        "Irregular periods, acne, weight gain, excess hair growth, hair thinning, and darkened skin patches are common symptoms of PCOS.",
    },
    {
      question: "Can PCOS affect fertility?",
      answer:
        "Yes. PCOS is one of the most common causes of infertility, but with proper management and treatment, many women can conceive successfully.",
    },
    {
      question: "Is my health information secure?",
      answer:
        "Absolutely. HerHealth AI uses enterprise-grade encryption and privacy-first design to ensure your personal health data stays protected.",
    },
    {
      question: "Is the assessment free?",
      answer:
        "Yes! The PCOS assessment on HerHealth AI is completely free to help every woman access trusted, evidence-based health insights.",
    },
    {
      question: "Can I use HerHealth AI if I'm already diagnosed with PCOS?",
      answer:
        "Of course. You can use HerHealth AI to track your symptoms, learn about PCOS management, and monitor lifestyle improvements over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center items-center gap-3">
            <HelpCircle className="h-10 w-10 text-pink-600 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Find quick answers about PCOS and how HerHealth AI helps empower
            women with data-driven health insights.
          </p>
        </div>
      </section>

      {/* Decorative Icons */}
      <div className="flex justify-center gap-6 pb-10">
        <HeartPulse className="h-10 w-10 text-rose-500 animate-bounce" />
        <Sparkles className="h-10 w-10 text-pink-500 animate-bounce delay-100" />
        <ShieldCheck className="h-10 w-10 text-purple-500 animate-bounce delay-200" />
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-pink-100 bg-white/70 backdrop-blur-md rounded-xl shadow-sm transition-all hover:shadow-md hover:border-pink-300"
            >
              <AccordionTrigger className="text-left px-6 py-4 text-lg font-semibold text-pink-800 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
