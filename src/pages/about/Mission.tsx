import { Target, Rocket, Award, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

const Mission = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Mission & Vision</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Our commitment to educational excellence and student success
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <Target className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-neutral-600">
                  To provide quality education through innovative teaching methods and comprehensive study materials,
                  enabling students to achieve their academic goals and excel in competitive examinations.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <Rocket className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-neutral-600">
                  To be the leading educational institution that transforms students into successful professionals
                  through excellence in teaching, personalized guidance, and comprehensive exam preparation.
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-neutral-600 text-sm">{value.description}</p>
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

const coreValues = [
  {
    title: "Excellence",
    description: "Striving for the highest standards in education and student success",
  },
  {
    title: "Innovation",
    description: "Embracing new teaching methods and technologies",
  },
  {
    title: "Integrity",
    description: "Maintaining ethical standards and transparency in all operations",
  },
  {
    title: "Student-Centric",
    description: "Focusing on individual student growth and development",
  },
];

export default Mission;
