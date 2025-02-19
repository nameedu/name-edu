import { Trophy, Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Results = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header
        title="Our Results"
        subtitle="Celebrating the success of our students across various competitive examinations"
      />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Results</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Celebrating the success of our students across various competitive examinations
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {toppers.map((topper, index) => (
              <Card key={index} className="p-6">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{topper.name}</h3>
                  <p className="text-neutral-600">{topper.rank}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Exam</span>
                    <span className="font-medium">{topper.exam}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Year</span>
                    <span className="font-medium">{topper.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Achievement</span>
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8">Our Achievement Highlights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-4xl font-bold mb-2">{achievement.value}</h3>
                  <p className="text-neutral-600">{achievement.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const toppers = [
  {
    name: "John Doe",
    rank: "AIR 1",
    exam: "IIT-JEE",
    year: "2023"
  },
  {
    name: "Jane Smith",
    rank: "AIR 5",
    exam: "NEET",
    year: "2023"
  },
  {
    name: "Mike Johnson",
    rank: "AIR 10",
    exam: "IIT-JEE",
    year: "2023"
  }
];

const achievements = [
  {
    value: "1000+",
    label: "Students Selected"
  },
  {
    value: "95%",
    label: "Success Rate"
  },
  {
    value: "50+",
    label: "Top Ranks"
  }
];

export default Results;
