import { FileText, Download, BookOpen, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const PreviousPapers = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Previous Papers</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access previous year question papers and practice tests
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {papers.map((paper, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{paper.title}</h3>
                      <p className="text-sm text-neutral-500">{paper.type}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center text-sm">
                      <BookOpen className="w-4 h-4 mr-2 text-neutral-500" />
                      <span>{paper.subject}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-neutral-500" />
                      <span>{paper.year}</span>
                    </div>
                  </div>

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

const papers = [
  {
    title: "JEE Advanced",
    type: "Entrance Exam",
    subject: "Physics, Chemistry, Mathematics",
    year: "2023",
  },
  {
    title: "NEET",
    type: "Medical Entrance",
    subject: "Biology, Chemistry, Physics",
    year: "2023",
  },
  {
    title: "JEE Main",
    type: "Engineering Entrance",
    subject: "Physics, Chemistry, Mathematics",
    year: "2023",
  },
  {
    title: "Mock Test Series",
    type: "Practice Test",
    subject: "All Subjects",
    year: "2024",
  },
  {
    title: "Sample Papers",
    type: "Practice Material",
    subject: "All Subjects",
    year: "2024",
  },
  {
    title: "Previous Year Solutions",
    type: "Study Material",
    subject: "All Subjects",
    year: "2023",
  },
];

export default PreviousPapers;
