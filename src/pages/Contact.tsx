import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Contact = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header
        title="Contact Us"
        subtitle="Get in touch with us for any queries or support"
      />
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none h-32"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start">
                      <info.icon className="w-6 h-6 text-primary mr-4" />
                      <div>
                        <h3 className="font-medium mb-1">{info.title}</h3>
                        <p className="text-neutral-600">{info.details}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const contactInfo = [
  {
    title: "Phone",
    details: "+1 (234) 567-890",
    icon: Phone
  },
  {
    title: "Email",
    details: "info@example.com",
    icon: Mail
  },
  {
    title: "Address",
    details: "123 Education Street, City, State, 12345",
    icon: MapPin
  },
  {
    title: "Office Hours",
    details: "Monday - Saturday: 9:00 AM - 6:00 PM",
    icon: Clock
  }
];

export default Contact;
