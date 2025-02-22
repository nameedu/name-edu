import { MessageSquare, Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Testimonials = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Student Testimonials</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Hear what our students have to say about their learning journey with us
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col h-full">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-neutral-600 mb-6 flex-grow">{testimonial.content}</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Success Stories */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                      <p className="text-neutral-600 mb-4">{story.content}</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{story.name}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-primary">{story.achievement}</span>
                      </div>
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

const testimonials = [
  {
    name: "Avhi",
    course: "JEE Advanced Preparation",
    content: "This is the best place for medical entrance preparation. They teach with their best. They explain all the topics in the understandable ways. They provide all the required materials.",
    rating: 4,
  },
  {
    name: "시진",
    course: "NEET Preparation",
    content: "It's no doubt Name institute is one of finest institute of medical entrance preparation in our country.Here,you can get all type of quality educator and better education.",
    rating: 4,
  },
  {
    name: "Aman Kumar Shah",
    course: "Foundation Course",
    content: "This institute is best for MEDICAL PREPARATION . Here you can get a good environment for study, friendly teacher teams and others institute teams, a well managed library for study and a quality full study.",
    rating: 4,
  },
  {
    name: "Pratibha Chaudhary",
    course: "Crash Course",
    content: "If you want to get daily question practice for medical entrance exams, nursing, and lokesewa. This institute is ideal for them.",
    rating: 5,
  },
  {
    name: "Om Shankar Gupta",
    course: "GATE Preparation",
    content: "One of the best institute in the country. Good education with Good environment. You can achieve your goals through this institute. It provides best learning facilities with best tutors.",
    rating: 5,
  },
  {
    name: "Dipal Malla",
    course: "SAT Preparation",
    content: "Nepal's top bridge course institution for various courses, that has been providing its service for a long time. It has its own building with very big room",
    rating: 4,
  },
];

const successStories = [
  {
    title: "From Average to Extraordinary",
    content: "Started with average scores in mock tests but with dedicated guidance and hard work, secured AIR under 1000 in JEE Advanced.",
    name: "Rajesh Kumar",
    achievement: "IIT Bombay - CSE",
  },
  {
    title: "Dream Come True",
    content: "The structured approach and motivation from teachers helped me achieve my dream of getting into a premier medical college.",
    name: "Ananya Singh",
    achievement: "AIIMS Delhi",
  },
];

export default Testimonials;
