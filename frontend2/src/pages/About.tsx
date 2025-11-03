import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Sparkles, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full text-center py-24 px-6 overflow-hidden">
        {/* Floating background blobs */}
        <div className="absolute top-10 left-10 w-60 h-60 bg-purple-300 rounded-full opacity-25 blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 mb-4">
            About HerHealth AI
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Empowering women with intelligent health insights and personalized PCOS management — through empathy, technology, and science.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-purple-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            To revolutionize women's healthcare with AI — making accurate, personalized PCOS insights accessible to every woman, everywhere.
          </p>
        </div>

        <Card className="bg-white/70 border-0 shadow-lg backdrop-blur-md hover:shadow-xl transition-all">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              HerHealth AI was created to bridge the gap in women's health technology. 
              We believe every woman deserves access to accurate, personalized health information. 
              Our AI-powered platform helps women understand PCOS, track symptoms, 
              and make informed decisions about their health journey.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Values Section */}
      <section className="relative bg-white/40 backdrop-blur-lg py-20">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-bold text-purple-700 mb-12">Our Core Values</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="h-12 w-12 text-purple-600 mx-auto" />,
                title: "Evidence-Based",
                desc: "Built on peer-reviewed medical research and clinical guidelines.",
              },
              {
                icon: <Users className="h-12 w-12 text-pink-500 mx-auto" />,
                title: "Women-Centered",
                desc: "Designed by and for women — empathy and understanding at our core.",
              },
              {
                icon: <Sparkles className="h-12 w-12 text-indigo-500 mx-auto" />,
                title: "AI-Powered",
                desc: "Leveraging cutting-edge AI for personalized health insights.",
              },
              {
                icon: <Shield className="h-12 w-12 text-emerald-500 mx-auto" />,
                title: "Privacy First",
                desc: "Your data is encrypted, secure, and never shared without consent.",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="p-6 rounded-3xl bg-white/70 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <CardContent className="space-y-3">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative container mx-auto px-6 py-20 max-w-5xl">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-8">
          Why We Built This
        </h2>

        <Card className="bg-gradient-to-br from-purple-100/60 to-pink-100/60 border-0 shadow-lg backdrop-blur-md">
          <CardContent className="p-10 text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              PCOS affects 1 in 10 women of reproductive age, yet diagnosis often takes years.
              Many women struggle with symptoms without understanding what's happening to their bodies.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We created HerHealth AI to change that — offering immediate, accessible, and
              personalized health insights to empower women to take control of their well-being.
            </p>
          </CardContent>
        </Card>
      </section>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default About;
