import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const VideoLectures = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header
        title="Video Lectures"
        subtitle="Access our recorded video lectures and educational content"
      />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Video Lectures</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access our recorded video lectures and educational content
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lectures.map((lecture, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-neutral-100 relative">
                  <Play className="w-12 h-12 text-neutral-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{lecture.title}</h3>
                  <p className="text-neutral-600 mb-4">{lecture.description}</p>
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {lecture.duration}
                  </div>
                  <Button className="w-full">Watch Now</Button>
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

const lectures = [
  {
    title: "Introduction to Quantum Mechanics",
    description: "Understanding the fundamentals of quantum mechanics and wave functions",
    duration: "45 minutes"
  },
  {
    title: "Organic Chemistry Reactions",
    description: "Complete guide to important organic chemistry reactions",
    duration: "60 minutes"
  },
  {
    title: "Calculus Masterclass",
    description: "Advanced calculus concepts and problem-solving techniques",
    duration: "90 minutes"
  }
];

export default VideoLectures;
