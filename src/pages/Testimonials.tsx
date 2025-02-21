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
                        <p className="text-sm text-neutral-500">{testimonial.course}</p>
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
    name: "Alex Thompson",
    course: "JEE Advanced Preparation",
    content: "The quality of teaching and study materials provided here is exceptional. The faculty's dedication helped me achieve my dream rank.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    course: "NEET Preparation",
    content: "The systematic approach to preparation and regular mock tests helped me build confidence. Grateful for the guidance!",
    rating: 5,
  },
  {
    name: "John Martinez",
    course: "Foundation Course",
    content: "Starting early with the foundation course gave me a strong base. The concepts are explained thoroughly with practical examples.",
    rating: 4,
  },
  {
    name: "Sarah Wilson",
    course: "Crash Course",
    content: "Even though I joined late, the crash course helped me cover all important topics effectively. Thank you for the support!",
    rating: 5,
  },
  {
    name: "Rahul Patel",
    course: "GATE Preparation",
    content: "The online resources and doubt clearing sessions were incredibly helpful. Secured a good rank thanks to the guidance.",
    rating: 5,
  },
  {
    name: "Emily Brown",
    course: "SAT Preparation",
    content: "The personalized attention and strategy sessions made all the difference. Highly recommend their SAT prep program.",
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
