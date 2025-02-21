import { BookOpen, CheckCircle, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const Syllabus = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Course Syllabus</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Detailed course content and learning objectives for each subject
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{subject.name}</h3>
                      <p className="text-sm text-neutral-500">{subject.code}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    {subject.units.map((unit, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2" />
                        <span className="text-sm text-neutral-600">{unit}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Syllabus
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

const subjects = [
  {
    name: "Physics",
    code: "PHY-101",
    units: [
      "Mechanics and Waves",
      "Electromagnetism",
      "Modern Physics",
      "Thermodynamics",
      "Optics",
    ],
  },
  {
    name: "Chemistry",
    code: "CHEM-101",
    units: [
      "Physical Chemistry",
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Chemical Bonding",
      "Equilibrium",
    ],
  },
  {
    name: "Mathematics",
    code: "MATH-101",
    units: [
      "Algebra and Functions",
      "Calculus",
      "Coordinate Geometry",
      "Trigonometry",
      "Statistics",
    ],
  },
  {
    name: "Biology",
    code: "BIO-101",
    units: [
      "Cell Biology",
      "Genetics",
      "Human Physiology",
      "Plant Biology",
      "Evolution",
    ],
  },
  {
    name: "English",
    code: "ENG-101",
    units: [
      "Grammar and Usage",
      "Reading Comprehension",
      "Writing Skills",
      "Literature",
      "Communication",
    ],
  },
  {
    name: "Computer Science",
    code: "CS-101",
    units: [
      "Programming Basics",
      "Data Structures",
      "Algorithms",
      "Database Concepts",
      "Web Development",
    ],
  },
];

export default Syllabus;
