import { Video, Monitor, Book } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const features = [
  {
    title: "Live Classes",
    description: "Interactive sessions with expert faculty members",
    icon: Monitor,
  },
  {
    title: "Recorded Lectures",
    description: "Access course content at your convenience",
    icon: Video,
  },
  {
    title: "Study Materials",
    description: "Comprehensive digital resources and notes",
    icon: Book,
  },
];

const ContactInfo = ({ label, value }) => (
  <div className="flex items-center justify-center md:justify-start">
    <span className="font-semibold text-neutral-700 w-28">{label}</span>
    <span className="text-neutral-600">{value}</span>
  </div>
);

const OnlineClass = () => {
  return (
    <Layout>
      <main className="pt-24 pb-16 px-6 bg-neutral-50 text-neutral-900">
        <section className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Unlock Your Potential with <span className="text-red-600">NAME Online</span> Classes
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
            Learn from anywhere with interactive live classes and recorded content, all at your fingertips.
          </p>

          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-4">Get Started with NAME Online</h2>
            <p className="text-lg mb-6 text-neutral-600">
              Download the NAME Online App to access live sessions, lectures, and study materials.
            </p>
            <a
              href="https://qwik.one/NAMEOnline"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-300 mb-4"
              aria-label="Download NAME Online App"
            >
              ⬇️ Download Now
            </a>
            <p className="text-sm text-neutral-600">
              After downloading, sign up at:{" "}
              <a href="https://name.avyaas.com/" className="text-red-600 font-semibold">
                https://name.avyaas.com/
              </a>
            </p>
          </div>
        </section>

        <section className="mt-16 text-center bg-neutral-100 py-16">
          <h2 className="text-2xl font-semibold text-red-600 mb-6">Contact Information</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            We are here to assist you! Reach out to us using the contact details below:
          </p>

          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <ContactInfo label="📍 Location:" value="Putalisadak, Kathmandu, Nepal" />
            <ContactInfo label="📧 Email:" value={<a href="mailto:instnameonline@gmail.com" className="text-red-600">instnameonline@gmail.com</a>} />
            <ContactInfo label="📞 Contact:" value={
              <div className="flex space-x-6 text-red-600">
                <a href="tel:+9779802369440" className="hover:underline">9802369440</a>
                <a href="tel:+9779801235896" className="hover:underline">9801235896</a>
                <a href="tel:+9779704658573" className="hover:underline">9704658573</a>
              </div>
            } />
          </div>
        </section>

        <section className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <feature.icon className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-red-600">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </Card>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default OnlineClass;