
import { FileText, Download, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const QuestionBank = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Question Bank</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access our extensive collection of practice questions and previous year papers
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {questions.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.subject}</h3>
                        <p className="text-sm text-neutral-500">{item.type}</p>
                      </div>
                    </div>
                    {item.isNew && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-4 flex-grow">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>{item.questions} Questions</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 text-primary mr-2" />
                      <span>{item.difficulty} Level</span>
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
      <Footer />
    </div>
  );
};

const questions = [
  {
    subject: "Physics",
    type: "Previous Year Papers",
    questions: "150+",
    difficulty: "Advanced",
    isNew: true,
  },
  {
    subject: "Chemistry",
    type: "Topic-wise Questions",
    questions: "200+",
    difficulty: "Intermediate",
    isNew: false,
  },
  {
    subject: "Mathematics",
    type: "Practice Problems",
    questions: "300+",
    difficulty: "Mixed",
    isNew: true,
  },
  {
    subject: "Biology",
    type: "NEET Questions",
    questions: "250+",
    difficulty: "Advanced",
    isNew: false,
  },
  {
    subject: "Computer Science",
    type: "Programming Problems",
    questions: "100+",
    difficulty: "Intermediate",
    isNew: false,
  },
  {
    subject: "English",
    type: "Grammar Exercises",
    questions: "175+",
    difficulty: "Basic",
    isNew: false,
  },
];

export default QuestionBank;
