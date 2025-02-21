import { Users, GraduationCap, Award, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Faculty = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Faculty</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Meet our team of experienced educators dedicated to your academic success
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((member, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.designation}</p>
                  <p className="text-neutral-600 text-sm mb-4">{member.expertise}</p>
                  <div className="flex items-center justify-center space-x-2">
                    {member.qualifications.map((qualification, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {qualification}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const facultyMembers = [
  {
    name: "Dr. Sarah Johnson",
    designation: "Senior Physics Faculty",
    expertise: "Quantum Mechanics & Electromagnetic Theory",
    qualifications: ["Ph.D.", "M.Sc", "B.Ed"],
  },
  {
    name: "Prof. Michael Chen",
    designation: "Mathematics Expert",
    expertise: "Advanced Calculus & Linear Algebra",
    qualifications: ["M.Phil", "M.Sc"],
  },
  {
    name: "Dr. Emily Williams",
    designation: "Chemistry Faculty",
    expertise: "Organic Chemistry & Physical Chemistry",
    qualifications: ["Ph.D.", "M.Sc"],
  },
  {
    name: "Prof. David Miller",
    designation: "Biology Faculty",
    expertise: "Molecular Biology & Genetics",
    qualifications: ["M.Sc", "B.Ed"],
  },
  {
    name: "Dr. Robert Wilson",
    designation: "English Faculty",
    expertise: "Literature & Communication Skills",
    qualifications: ["Ph.D.", "M.A"],
  },
  {
    name: "Prof. Amanda Brown",
    designation: "Computer Science Faculty",
    expertise: "Programming & Data Structures",
    qualifications: ["M.Tech", "B.Tech"],
  },
];

export default Faculty;
