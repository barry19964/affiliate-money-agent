import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, Users, TrendingUp, Star } from "lucide-react";
import { useLocation } from "wouter";

interface LeadMagnetLandingProps {
  magnet?: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    benefits: string[];
    testimonials: { name: string; text: string; rating: number }[];
    downloadUrl: string;
    estimatedLeads: number;
    conversionRate: number;
  };
}

export default function LeadMagnetLanding({ magnet }: LeadMagnetLandingProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  // Default magnet if not provided
  const defaultMagnet = {
    id: "1",
    title: "10 AI Tools That Save 10 Hours Per Week",
    subtitle: "Complete Guide to the Best AI Tools for Productivity",
    description:
      "Discover the 10 most powerful AI tools that can save you 10+ hours per week. Used by thousands of entrepreneurs and professionals.",
    benefits: [
      "Save 10+ hours per week on repetitive tasks",
      "Automate your entire workflow with AI",
      "Generate content, images, and ideas instantly",
      "Earn more money with less effort",
      "Stay ahead of the competition",
      "Access exclusive tools and resources",
    ],
    testimonials: [
      {
        name: "Sarah M.",
        text: "This guide saved me so much time! I implemented the tools and now I'm 3x more productive.",
        rating: 5,
      },
      {
        name: "John D.",
        text: "The best resource I've found on AI tools. Highly recommended!",
        rating: 5,
      },
      {
        name: "Emma L.",
        text: "I went from struggling to keep up to leading my team. This guide is a game-changer.",
        rating: 5,
      },
    ],
    downloadUrl: "/lead-magnets/ai-tools-guide.pdf",
    estimatedLeads: 150,
    conversionRate: 0.25,
  };

  const currentMagnet = magnet || defaultMagnet;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send the data to your backend
    // to add the subscriber to Mailchimp and send the lead magnet
    console.log("Subscriber:", { email, firstName });

    setSubmitted(true);

    // Redirect to thank you page after 2 seconds
    setTimeout(() => {
      setLocation("/thank-you");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Check Your Email!</h1>
          <p className="text-gray-300">
            We've sent you the guide. Check your inbox (and spam folder just in case).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-400">Affiliate Money Agent</div>
          <Button variant="outline">← Back</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-white mb-4">{currentMagnet.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{currentMagnet.subtitle}</p>
          <p className="text-gray-400 mb-8">{currentMagnet.description}</p>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            {currentMagnet.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-800 rounded-lg">
              <Users className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-2xl font-bold text-white">
                {currentMagnet.estimatedLeads}+
              </p>
              <p className="text-sm text-gray-400">People Downloaded</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
              <p className="text-2xl font-bold text-white">
                {(currentMagnet.conversionRate * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-gray-400">Conversion Rate</p>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-white mb-6">Get Your Free Guide</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <Input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
              <Download className="w-4 h-4 mr-2" />
              Download Now (Free)
            </Button>

            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-400 mb-3">Join thousands who've downloaded this guide</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">5.0 (247 reviews)</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">What People Are Saying</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentMagnet.testimonials.map((testimonial, idx) => (
            <Card key={idx} className="bg-gray-900 border-gray-800 p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold text-white">— {testimonial.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>

        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2">Is this guide really free?</h3>
            <p className="text-gray-400">
              Yes! This guide is completely free. We just ask for your email so we can send you
              exclusive tips and offers.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2">How long is the guide?</h3>
            <p className="text-gray-400">
              The guide is approximately 30-40 pages with detailed instructions, screenshots, and
              bonus resources.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2">Will you spam me?</h3>
            <p className="text-gray-400">
              No! We respect your inbox. You'll receive valuable tips and exclusive offers, but
              nothing excessive. Unsubscribe anytime.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2">What if I don't like the guide?</h3>
            <p className="text-gray-400">
              If you're not satisfied, simply unsubscribe. No questions asked. But we're confident
              you'll love it!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 mb-0">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Save 10+ Hours Per Week?</h2>
          <p className="text-blue-100 mb-8">
            Join thousands of people who've already downloaded this guide and transformed their
            productivity.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
            <Download className="w-5 h-5 mr-2" />
            Download Your Free Guide
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Affiliate Money Agent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
