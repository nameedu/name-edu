
import { GraduationCap, BookOpen, Award, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center">
              <img
                src="/lovable-uploads/2717d708-aa29-4f6e-adae-571558619133.png"
                alt="NAME Edu"
                className="h-8"
              />
            </a>
            <div className="hidden md:flex space-x-4">
              <a href="#courses" className="nav-link">Courses</a>
              <a href="#results" className="nav-link">Results</a>
              <a href="#resources" className="nav-link">Resources</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Student Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <span className="inline-block animate-fade-in opacity-0 [--delay:200ms] py-2 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Excellence in Education
          </span>
          <h1 className="animate-fade-in opacity-0 [--delay:400ms] text-4xl md:text-6xl font-bold text-neutral-800 mb-6">
            Your Gateway to Success
          </h1>
          <p className="animate-fade-in opacity-0 [--delay:600ms] text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Comprehensive entrance exam preparation with expert guidance, quality study materials, and proven results.
          </p>
          <div className="animate-fade-in opacity-0 [--delay:800ms] flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-6">
              Explore Courses
            </Button>
            <Button variant="outline" className="px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="courses" className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center">Our Programs</h2>
          <p className="section-subheading text-center">
            Comprehensive courses designed for your success
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-heading">Get in Touch</h2>
          <p className="section-subheading">
            Have questions? We're here to help you succeed.
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
    </div>
  );
};

const features = [
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    description: "Learn from experienced educators dedicated to your success.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Materials",
    description: "Access detailed study materials and practice resources.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Track record of successful student placements.",
  },
  {
    icon: MessageSquare,
    title: "Personal Guidance",
    description: "One-on-one mentoring and doubt clearing sessions.",
  },
];

export default Index;
