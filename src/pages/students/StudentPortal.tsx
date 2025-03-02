import { User, Book, Calendar, CreditCard, FileText, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const StudentPortal = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Portal</h1>
              <p className="text-lg text-neutral-600">
                Access all your academic information and resources in one place
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Welcome, Student</h2>
                  <p className="text-neutral-600">Roll No: 2024001</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {portalSections.map((section, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{section.title}</h3>
                      <p className="text-sm text-neutral-600 mb-4">{section.description}</p>
                      <Button className="w-full">Access Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const portalSections = [
  {
    title: "Academic Records",
    description: "View your attendance, grades, and academic progress",
    icon: Book,
  },
  {
    title: "Exam Schedule",
    description: "Check upcoming tests and examination dates",
    icon: Calendar,
  },
  {
    title: "Fee Payment",
    description: "Pay your fees and view payment history",
    icon: CreditCard,
  },
  {
    title: "Study Materials",
    description: "Access course materials and resources",
    icon: FileText,
  },
  {
    title: "Notifications",
    description: "View important announcements and updates",
    icon: Bell,
  },
  {
    title: "Profile Settings",
    description: "Update your personal information and preferences",
    icon: User,
  },
];

export default StudentPortal;
