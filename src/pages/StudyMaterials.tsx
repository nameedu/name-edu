
import { Book, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";

const StudyMaterials = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Study Materials</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access comprehensive study materials and resources
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <Card key={index} className="p-6">
                <Book className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{material.title}</h3>
                <p className="text-neutral-600 mb-4">{material.description}</p>
                <Button className="w-full flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const materials = [
  {
    title: "Physics Study Material",
    description: "Complete study material for JEE Physics including solved examples and practice problems"
  },
  {
    title: "Chemistry Notes",
    description: "Comprehensive chemistry notes covering organic, inorganic, and physical chemistry"
  },
  {
    title: "Mathematics Formula Book",
    description: "Essential formulas and concepts for competitive exam preparation"
  }
];

export default StudyMaterials;
