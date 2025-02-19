
import { BookOpen, GraduationCap, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Courses = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header
        title="Our Courses"
        subtitle="Comprehensive courses designed to help you excel in your academic journey"
      />
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-neutral-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <course.icon className="w-12 h-12 text-neutral-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-neutral-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} students
                    </div>
                  </div>
                  <Button className="w-full">Learn More</Button>
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

const courses = [
  {
    title: "IIT-JEE Preparation",
    description: "Comprehensive preparation for IIT-JEE with focus on Physics, Chemistry, and Mathematics",
    duration: "2 years",
    students: "500+",
    icon: GraduationCap
  },
  {
    title: "NEET Coaching",
    description: "Expert guidance for medical entrance examination preparation",
    duration: "2 years",
    students: "400+",
    icon: BookOpen
  },
  {
    title: "Foundation Course",
    description: "Strong foundation building for students in classes 9th and 10th",
    duration: "1 year",
    students: "300+",
    icon: BookOpen
  }
];

export default Courses;
