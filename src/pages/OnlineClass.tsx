import { Video, Monitor, Book, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const OnlineClass = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header
        title="Online Classes"
        subtitle="Access high-quality education from anywhere with our online learning platform"
      />
      <div className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Online Classes</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access high-quality education from anywhere with our online learning platform
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-neutral-100 relative">
                  <Video className="w-12 h-12 text-neutral-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
                  <p className="text-neutral-600 mb-4">{classItem.description}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {classItem.schedule}
                    </div>
                  </div>
                  <Button className="w-full">Join Class</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const features = [
  {
    title: "Live Classes",
    description: "Interactive sessions with expert faculty members",
    icon: Monitor
  },
  {
    title: "Recorded Lectures",
    description: "Access course content at your convenience",
    icon: Video
  },
  {
    title: "Study Materials",
    description: "Comprehensive digital resources and notes",
    icon: Book
  }
];

const classes = [
  {
    title: "Physics Live Class",
    description: "Advanced topics in mechanics and electromagnetism",
    schedule: "Mon, Wed, Fri - 10:00 AM"
  },
  {
    title: "Chemistry Masterclass",
    description: "Organic chemistry reaction mechanisms",
    schedule: "Tue, Thu, Sat - 11:00 AM"
  },
  {
    title: "Mathematics Problem Solving",
    description: "Advanced problem-solving techniques",
    schedule: "Mon, Wed, Fri - 2:00 PM"
  }
];

export default OnlineClass;
