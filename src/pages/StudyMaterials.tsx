import { Book, Download, FileText, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const StudyMaterials = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Study Materials</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Comprehensive study resources to help you excel in your preparation
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <material.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{material.subject}</h3>
                      <p className="text-sm text-neutral-500">{material.type}</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-4 flex-grow">{material.description}</p>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const materials = [
  {
    subject: "Physics",
    type: "Study Notes",
    description: "Comprehensive notes covering mechanics, electromagnetism, and modern physics",
    icon: Book,
  },
  {
    subject: "Chemistry",
    type: "Formula Sheet",
    description: "Quick reference guide for important chemical equations and reactions",
    icon: FileText,
  },
  {
    subject: "Mathematics",
    type: "Problem Set",
    description: "Extensive collection of solved problems and practice exercises",
    icon: BookOpen,
  },
  {
    subject: "Biology",
    type: "Chapter Notes",
    description: "Detailed notes on human physiology, genetics, and ecology",
    icon: Book,
  },
  {
    subject: "English",
    type: "Grammar Guide",
    description: "Complete guide to English grammar and composition",
    icon: FileText,
  },
  {
    subject: "Computer Science",
    type: "Programming Notes",
    description: "Notes on data structures, algorithms, and programming concepts",
    icon: BookOpen,
  },
];

export default StudyMaterials;
