
import { Newspaper, Calendar, AlertCircle, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";

const News = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">News & Updates</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Stay informed with the latest announcements and updates
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.isImportant && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-600 mb-3">{item.content}</p>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{item.date}</span>
                    </div>
                  </div>
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

const newsItems = [
  {
    title: "Exam Schedule Update",
    content: "The mock test series for JEE Advanced will begin from next week. Check the schedule for your batch.",
    date: "March 15, 2024",
    icon: Calendar,
    isImportant: true,
  },
  {
    title: "New Study Resources",
    content: "New practice materials for Physics and Chemistry have been uploaded to the student portal.",
    date: "March 14, 2024",
    icon: Newspaper,
    isImportant: false,
  },
  {
    title: "Holiday Notice",
    content: "The institute will remain closed on March 25th for Holi celebrations. Online classes will continue as scheduled.",
    date: "March 13, 2024",
    icon: Bell,
    isImportant: true,
  },
  {
    title: "Workshop Announcement",
    content: "Special problem-solving workshop for Mathematics on Sunday. Registration is mandatory.",
    date: "March 12, 2024",
    icon: AlertCircle,
    isImportant: false,
  },
];

export default News;
