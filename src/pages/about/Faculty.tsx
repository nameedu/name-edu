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
    name: "Dr. Navin Sharma",
    designation: "Director",
    
  },
  {
    name: "Rabindra Sharma",
    designation: "Chief Executive Officer",
    
  },
  {
    name: "Suman Sharma",
    designation: "Chairman",
    
  },
  {
    name: "Netra Pokhrel",
    designation: "Administrative Officer",
   
  },
  {
    name: "Sujan Dhungel",
    designation: "Finance Chief",
   
  },
  {
    name: "Bidur Bhattarai",
    designation: "Counselor",
   
  },
  {
    name: "Achyut Kandel",
    designation: "Accountant",
   
  },
  {
    name: "Udesh Shrestha",
    designation: "System Administrator",
   
  },
];

export default Faculty;
