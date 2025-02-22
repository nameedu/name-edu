import { Building, GraduationCap, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Overview = () => {
  return (
    <Layout>
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
              <p className="text-lg text-neutral-600 leading-relaxed text-justify">
              It all began in 1996 with just two rented rooms in Putalisadak, opposite Shanker Dev Campus. At that time, finding qualified teachers for medical entrance preparation was a significant challenge. There were no entrance guides, and no fixed syllabus to follow. Over the past 25 years, we have witnessed the emergence of over 20 highly skilled teachers and a variety of entrance guides that now rival any Indian textbook. In 2006, NAME moved into its own building, and since then, it has experienced growth and progress in every aspect.</p>
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
    </Layout>
  );
};

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Students Every Year",
  },
  {
    icon: GraduationCap,
    value: "95%",
    label: "Success Rate",
  },
  {
    icon: Building,
    value: "29+",
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
    title: "Best Coaching Institute",
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
