
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, MessageSquare, Star, Target, Timer, Users, Smartphone, Apple } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Medical Focus */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto text-center">
          <span className="inline-block animate-fade-in opacity-0 [--delay:200ms] py-2 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            #1 Medical Entrance Preparation Institute in Nepal
          </span>
          <h1 className="animate-fade-in opacity-0 [--delay:400ms] text-4xl md:text-6xl font-bold text-neutral-800 mb-6">
            Your Path to Medical Success
          </h1>
          <p className="animate-fade-in opacity-0 [--delay:600ms] text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Comprehensive MBBS entrance exam preparation with expert guidance, proven study materials, and the highest success rate in Nepal.
          </p>
          <div className="animate-fade-in opacity-0 [--delay:800ms] flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-6">
              Start Your Journey
            </Button>
            <Button variant="outline" className="px-8 py-6">
              Book Free Counseling
            </Button>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Us?</h2>
          <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
            Experience the most comprehensive medical entrance preparation program in Nepal
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Study On The Go</h2>
              <p className="text-lg mb-8 text-white/90">
                Download our mobile app to access study materials, video lectures, and practice tests anytime, anywhere. Stay updated with your course progress and upcoming exams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="bg-black text-white border-white hover:bg-white hover:text-black">
                  <Apple className="mr-2 h-5 w-5" />
                  Download for iOS
                </Button>
                <Button variant="outline" className="bg-black text-white border-white hover:bg-white hover:text-black">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download for Android
                </Button>
              </div>
              <div className="mt-6 text-sm text-white/80">
                Available on all devices. Free download for registered students.
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/placeholder.svg" 
                    alt="Mobile App Preview" 
                    className="w-64"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Batches */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Upcoming Batches</h2>
          <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
            Join our new batches starting soon and begin your medical journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingBatches.map((batch, index) => (
              <Card key={index} className="p-6 border-2 border-primary/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{batch.name}</h3>
                    <p className="text-neutral-600">{batch.timing}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {batch.seats} seats left
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {batch.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-neutral-600">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Enroll Now</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-12">
            Have questions about our medical entrance preparation programs? We're here to help!
          </p>
          <div className="flex justify-center">
            <Card className="w-full max-w-lg p-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none h-32"
                    placeholder="Your message"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const stats = [
  { value: "10,000+", label: "Success Stories" },
  { value: "95%", label: "Selection Rate" },
  { value: "50+", label: "Expert Faculty" },
  { value: "20+", label: "Years Experience" },
];

const features = [
  {
    icon: GraduationCap,
    title: "Expert Medical Faculty",
    description: "Learn from experienced medical professionals and top educators.",
  },
  {
    icon: Target,
    title: "Focused Preparation",
    description: "Specialized coaching for MBBS entrance exams with proven methods.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Materials",
    description: "Access detailed study materials aligned with the latest syllabus.",
  },
  {
    icon: Timer,
    title: "Regular Mock Tests",
    description: "Practice with exam-pattern questions and get detailed analysis.",
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description: "Personalized attention with limited students per batch.",
  },
  {
    icon: MessageSquare,
    title: "Doubt Clearing Sessions",
    description: "Regular sessions to resolve your queries and difficulties.",
  },
];

const upcomingBatches = [
  {
    name: "Early Bird Batch",
    timing: "Starting from June 1st",
    seats: 20,
    features: [
      "Complete syllabus coverage",
      "Daily mock tests",
      "Personal mentoring",
      "Study materials included",
    ],
  },
  {
    name: "Regular Batch",
    timing: "Starting from July 1st",
    seats: 30,
    features: [
      "Flexible timing options",
      "Weekly mock tests",
      "Group discussions",
      "Online access to resources",
    ],
  },
  {
    name: "Crash Course",
    timing: "Starting from August 1st",
    seats: 25,
    features: [
      "Intensive preparation",
      "Daily problem solving",
      "Topic-wise tests",
      "Previous year analysis",
    ],
  },
];

export default Index;
