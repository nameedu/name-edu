
import { GraduationCap, BookOpen, Award, MessageSquare, Building, Users, FileText, Video, Book, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-neutral-800 text-white py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Path to Academic Excellence
            </h1>
            <p className="text-lg text-neutral-300 mb-8">
              Join our comprehensive exam preparation programs and unlock your full potential
            </p>
            <div className="space-x-4">
              <Button size="lg" className="bg-primary hover:bg-primary-hover">
                Explore Courses
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We offer comprehensive exam preparation through expert guidance and innovative
              teaching methods
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Expert Faculty",
    description: "Learn from experienced educators who are experts in their fields",
    icon: Users,
  },
  {
    title: "Comprehensive Study Material",
    description: "Access detailed study materials designed for exam success",
    icon: Book,
  },
  {
    title: "Regular Mock Tests",
    description: "Practice with mock tests to improve your exam performance",
    icon: FileText,
  },
  {
    title: "Live Online Classes",
    description: "Attend interactive online sessions from anywhere",
    icon: Video,
  },
  {
    title: "Proven Results",
    description: "Track record of successful student achievements",
    icon: Award,
  },
  {
    title: "Doubt Clearing Sessions",
    description: "Get your doubts cleared through dedicated sessions",
    icon: MessageSquare,
  },
];

export default Index;
