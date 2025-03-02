import { Building, Wifi, Monitor, BookOpen, Users, Coffee, Gamepad, Laptop } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Infrastructure = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Infrastructure & Facilities</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            State-of-the-art facilities designed to enhance your learning experience
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col items-center text-center">
                  <facility.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                  <p className="text-neutral-600">{facility.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Key Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const facilities = [
  {
    title: "Modern Classrooms",
    description: "Spacious, air-conditioned classrooms with multimedia facilities",
    icon: Building,
  },
  {
    title: "Computer Lab",
    description: "Well-equipped computer lab with high-speed internet",
    icon: Monitor,
  },
  {
    title: "Library",
    description: "Extensive collection of books, journals, and study materials",
    icon: BookOpen,
  },
  {
    title: "Discussion Rooms",
    description: "Dedicated spaces for group discussions and peer learning",
    icon: Users,
  },
  {
    title: "Student Lounge",
    description: "Comfortable space for breaks and informal discussions",
    icon: Coffee,
  },
  {
    title: "Digital Learning",
    description: "Online learning platforms and digital resources",
    icon: Laptop,
  },
];

const features = [
  {
    title: "High-Speed Internet",
    description: "Campus-wide Wi-Fi connectivity for seamless online learning",
    icon: Wifi,
  },
  {
    title: "Recreation Area",
    description: "Dedicated space for students to relax and rejuvenate",
    icon: Gamepad,
  },
];

export default Infrastructure;
