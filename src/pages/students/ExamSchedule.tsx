import { Calendar, Clock, MapPin, Users, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const ExamSchedule = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Exam Schedule</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            View upcoming examination dates and important details
          </p>

          <div className="grid gap-6">
            {examSchedule.map((exam, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{exam.subject}</h3>
                      <p className="text-neutral-600">{exam.examType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm">{exam.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm">{exam.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm">{exam.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm">{exam.batch}</span>
                    </div>
                  </div>

                  {exam.important && (
                    <div className="mt-4 md:mt-0 flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-sm text-red-500">{exam.important}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const examSchedule = [
  {
    subject: "Physics",
    examType: "Mid-Term Examination",
    date: "March 25, 2024",
    time: "10:00 AM - 1:00 PM",
    venue: "Hall A",
    batch: "JEE Advanced Batch",
    important: "Bring scientific calculator",
  },
  {
    subject: "Chemistry",
    examType: "Unit Test",
    date: "March 27, 2024",
    time: "2:00 PM - 4:00 PM",
    venue: "Hall B",
    batch: "NEET Batch",
  },
  {
    subject: "Mathematics",
    examType: "Mock Test",
    date: "March 30, 2024",
    time: "9:00 AM - 12:00 PM",
    venue: "Hall C",
    batch: "JEE Main Batch",
    important: "Complete syllabus mock test",
  },
  {
    subject: "Biology",
    examType: "Practical Examination",
    date: "April 2, 2024",
    time: "10:00 AM - 1:00 PM",
    venue: "Lab 1",
    batch: "NEET Batch",
  },
];

export default ExamSchedule;
