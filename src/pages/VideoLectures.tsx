import { PlayCircle, Clock, BookOpen, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

const VideoLectures = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Video Lectures</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access our comprehensive collection of video lectures for enhanced learning
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-neutral-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-primary/80 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">{video.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{video.subject}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {video.tags.map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className="flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const videos = [
  {
    title: "Introduction to Quantum Mechanics",
    description: "Learn the fundamental principles of quantum mechanics and wave functions",
    duration: "45 mins",
    subject: "Physics",
    tags: ["Advanced", "Theory"],
  },
  {
    title: "Organic Chemistry Reactions",
    description: "Comprehensive guide to important organic chemistry reactions",
    duration: "60 mins",
    subject: "Chemistry",
    tags: ["Important", "Reactions"],
  },
  {
    title: "Calculus: Integration Techniques",
    description: "Master various methods of integration with solved examples",
    duration: "55 mins",
    subject: "Mathematics",
    tags: ["Advanced", "Calculus"],
  },
  {
    title: "Cell Biology and Genetics",
    description: "Detailed explanation of cell structure and genetic principles",
    duration: "50 mins",
    subject: "Biology",
    tags: ["Foundation", "NEET"],
  },
  {
    title: "Data Structures: Arrays & Linked Lists",
    description: "Implementation and operations on basic data structures",
    duration: "65 mins",
    subject: "Computer Science",
    tags: ["Programming", "DSA"],
  },
  {
    title: "English Grammar Masterclass",
    description: "Complete guide to English grammar rules and usage",
    duration: "40 mins",
    subject: "English",
    tags: ["Grammar", "Language"],
  },
];

export default VideoLectures;
