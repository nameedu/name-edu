
import { FileText, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const Assignments = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Assignments</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            View and submit your assignments
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignments.map((assignment, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{assignment.subject}</h3>
                        <p className="text-sm text-neutral-500">{assignment.topic}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      assignment.status === 'Due' 
                        ? 'bg-yellow-100 text-yellow-600'
                        : assignment.status === 'Submitted'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {assignment.status}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 flex-grow">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-neutral-500" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-neutral-500" />
                      <span>{assignment.timeAllowed}</span>
                    </div>
                    {assignment.status === 'Submitted' ? (
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Submitted on {assignment.submittedDate}</span>
                      </div>
                    ) : assignment.status === 'Overdue' ? (
                      <div className="flex items-center text-sm text-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        <span>Overdue by {assignment.overdueDays} days</span>
                      </div>
                    ) : null}
                  </div>

                  <Button 
                    className="w-full"
                    variant={assignment.status === 'Submitted' ? "outline" : "default"}
                  >
                    {assignment.status === 'Submitted' ? 'View Submission' : 'Start Assignment'}
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

const assignments = [
  {
    subject: "Physics",
    topic: "Mechanics Problem Set",
    status: "Due",
    dueDate: "March 20, 2024",
    timeAllowed: "2 hours",
  },
  {
    subject: "Chemistry",
    topic: "Organic Chemistry Quiz",
    status: "Submitted",
    dueDate: "March 15, 2024",
    timeAllowed: "1.5 hours",
    submittedDate: "March 14, 2024",
  },
  {
    subject: "Mathematics",
    topic: "Calculus Assignment",
    status: "Overdue",
    dueDate: "March 10, 2024",
    timeAllowed: "3 hours",
    overdueDays: "5",
  },
  {
    subject: "Biology",
    topic: "Cell Biology Test",
    status: "Due",
    dueDate: "March 22, 2024",
    timeAllowed: "1 hour",
  },
  {
    subject: "English",
    topic: "Grammar Exercise",
    status: "Submitted",
    dueDate: "March 12, 2024",
    timeAllowed: "45 minutes",
    submittedDate: "March 11, 2024",
  },
  {
    subject: "Computer Science",
    topic: "Programming Lab",
    status: "Due",
    dueDate: "March 25, 2024",
    timeAllowed: "2.5 hours",
  },
];

export default Assignments;
