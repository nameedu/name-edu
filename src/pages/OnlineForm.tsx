import { FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const OnlineForm = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Online Forms</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access and submit your applications online with ease
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forms.map((form, index) => (
              <Card key={index} className="p-6">
                <FileText className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{form.title}</h3>
                <p className="text-neutral-600 mb-4">{form.description}</p>
                <ul className="space-y-2 mb-6">
                  {form.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-neutral-600">{req}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">{form.status === "open" ? "Apply Now" : "Coming Soon"}</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const forms = [
  {
    title: "IIT-JEE Admission Form",
    description: "Apply for our comprehensive IIT-JEE preparation program",
    status: "open",
    requirements: [
      "Class X Mark Sheet",
      "Recent Photograph",
      "Valid ID Proof",
      "Parent's Income Certificate"
    ]
  },
  {
    title: "NEET Registration",
    description: "Register for our NEET coaching program",
    status: "open",
    requirements: [
      "Class XII Mark Sheet",
      "Recent Photograph",
      "Valid ID Proof",
      "Medical Certificate"
    ]
  },
  {
    title: "Foundation Course",
    description: "Enroll in our foundation course for classes 9th and 10th",
    status: "coming_soon",
    requirements: [
      "Previous Year Mark Sheet",
      "Recent Photograph",
      "School ID Card",
      "Parent's Consent Form"
    ]
  }
];

export default OnlineForm;
