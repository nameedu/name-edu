
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Contact Us</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Get in touch with us for any queries or support
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                      <p className="text-neutral-600">{info.details}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-center">Visit Our Institute</h2>
              <p className="text-neutral-600 text-center mb-6">
                We'd love to meet you in person at our campus. Our facilities are open during regular business hours.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex items-center text-primary">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Everyday: 06:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center text-primary">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>NAME Building, Ramshah Path, Putalisadak</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-neutral-500">
                  For admission inquiries, please visit our campus or call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const contactInfo = [
  {
    title: "Phone",
    details: "+977 1 5331144",
    icon: Phone
  },
  {
    title: "Email",
    details: "info@name.edu.np",
    icon: Mail
  },
  {
    title: "Address",
    details: "NAME Building, Ramshah Path, Putalisadak",
    icon: MapPin
  },
  {
    title: "Office Hours",
    details: "Everyday: 06:00 AM - 6:00 PM",
    icon: Clock
  }
];

export default Contact;
