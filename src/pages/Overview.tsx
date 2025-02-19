
import { Building, GraduationCap, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";

const Overview = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Institute Overview</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Discover our commitment to excellence in education and comprehensive exam preparation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-neutral-600">{stat.label}</p>
              </Card>
            ))}
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-3xl font-bold mb-6">Our Legacy</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Founded in 2000, our institute has been at the forefront of educational excellence,
                helping thousands of students achieve their academic and career goals through
                comprehensive coaching and mentorship programs.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Recognition & Achievements</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-6">
                    <Award className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-neutral-600">{achievement.description}</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Students Trained",
  },
  {
    icon: GraduationCap,
    value: "95%",
    label: "Success Rate",
  },
  {
    icon: Building,
    value: "20+",
    label: "Years Experience",
  },
  {
    icon: Award,
    value: "50+",
    label: "Awards Won",
  },
];

const achievements = [
  {
    title: "Best Coaching Institute 2023",
    description: "Recognized for excellence in educational services and student outcomes.",
  },
  {
    title: "Top Performance Center",
    description: "Awarded for consistently high student success rates in competitive exams.",
  },
  {
    title: "Innovation in Education",
    description: "Recognized for implementing innovative teaching methodologies.",
  },
];

export default Overview;
