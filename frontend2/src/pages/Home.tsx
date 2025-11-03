import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, Heart, Brain, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // ✅ Inside component

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your AI-Powered{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  PCOS Health
                </span>{" "}
                Companion
              </h1>
              <p className="text-xl text-muted-foreground">
                Get personalized insights, track symptoms, and take control of
                your PCOS journey with intelligent health assessments.
              </p>

              {/* Hero Buttons */}
              <div className="flex gap-4">
  <Button
    size="lg"
    className="group flex items-center gap-2 cursor-pointer"
    onClick={() => navigate("/chat")}
  >
    Start Assessment
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Button>

  <Button
    size="lg"
    variant="outline"
    className="cursor-pointer"
    onClick={() =>
      window.scrollTo({
        top: document.getElementById("pcos-info")?.offsetTop || 0,
        behavior: "smooth",
      })
    }
  >
    Learn More
  </Button>
</div>


            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Women's health and wellness"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PCOS Information Section */}
      <section
        id="pcos-info"
        className="py-20 bg-gradient-to-b from-transparent to-secondary/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Understanding PCOS</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Polycystic Ovary Syndrome affects millions of women worldwide.
              Knowledge is power in managing your health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="pt-6">
                <Activity className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Symptoms</h3>
                <p className="text-muted-foreground">
                  Irregular periods, hormonal imbalances, weight changes, and
                  metabolic concerns are common PCOS symptoms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-all">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Management</h3>
                <p className="text-muted-foreground">
                  Lifestyle modifications, proper nutrition, exercise, and
                  medical care can effectively manage PCOS.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Support</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your symptoms and provides personalized
                  recommendations for better health outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Take Test Section */}
      <section id="test" className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-2">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Take Control?</h2>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                Our comprehensive AI-powered assessment takes just 5 minutes
                and provides personalized insights about your PCOS risk and
                management strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="group flex items-center gap-2"
                  onClick={() => navigate("/chat")}
                >
                  Start Assessment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  Free • Confidential • Evidence-based
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="text-left hover:no-underline">
                  What is PCOS?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  PCOS (Polycystic Ovary Syndrome) is a hormonal disorder
                  affecting women of reproductive age. It's characterized by
                  irregular menstrual periods, excess androgen levels, and
                  polycystic ovaries.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="text-left hover:no-underline">
                  How accurate is the AI assessment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI assessment is based on medical research and guidelines,
                  providing risk indicators. However, it's not a medical
                  diagnosis. Always consult healthcare professionals for proper
                  diagnosis and treatment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="text-left hover:no-underline">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. We use enterprise-grade encryption and never share
                  your personal health information. Your privacy and security
                  are our top priorities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="text-left hover:no-underline">
                  Can PCOS be cured?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While there's no cure for PCOS, symptoms can be effectively
                  managed through lifestyle changes, medication, and proper
                  medical care. Many women with PCOS lead healthy, fulfilling
                  lives.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
