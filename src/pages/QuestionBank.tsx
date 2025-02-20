
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";

const QuestionBank = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Question Bank</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access comprehensive question banks and practice papers
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {questions.map((item, index) => (
              <Card key={index} className="p-6">
                <FileText className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-600 mb-4">{item.description}</p>
                <div className="text-sm text-neutral-500 mb-4">
                  {item.questions} questions • {item.pages} pages
                </div>
                <Button className="w-full flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const questions = [
  {
    title: "JEE Main Practice Set",
    description: "Complete practice set with previous year questions and solutions",
    questions: "500+",
    pages: "100"
  },
  {
    title: "NEET Question Bank",
    description: "Comprehensive question bank for NEET preparation",
    questions: "1000+",
    pages: "200"
  },
  {
    title: "Mock Test Series",
    description: "Series of mock tests with detailed solutions",
    questions: "300+",
    pages: "75"
  }
];

export default QuestionBank;
