
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <Separator className="mb-8" />
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-neutral-600 leading-relaxed">
                This Privacy Policy describes how NAME Institute ("we", "our", or "us") collects, uses, and shares your information when you use our website, services, and applications (collectively, the "Services").
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    When you use our Services, we may collect the following types of personal information:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-1">
                    <li>Contact information (name, email address, phone number)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Educational background and academic records</li>
                    <li>Payment information for course registrations</li>
                    <li>Communications with us</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">2.2 Automatically Collected Information</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    When you use our Services, we automatically collect certain information, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-1">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage information (pages visited, time spent on pages)</li>
                    <li>Location information (general geographic location)</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-neutral-600 leading-relaxed">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-1">
                <li>Providing and improving our Services</li>
                <li>Processing enrollment and course registrations</li>
                <li>Communicating with you about our Services</li>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Complying with legal obligations</li>
                <li>Protecting our rights and preventing fraud</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-neutral-600 leading-relaxed">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-1">
                <li>With service providers who perform services on our behalf</li>
                <li>With educational partners and affiliated institutions</li>
                <li>To comply with legal obligations</li>
                <li>In connection with a merger, sale, or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
              <p className="text-neutral-600 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-1">
                <li>Accessing, correcting, or deleting your personal information</li>
                <li>Objecting to or restricting certain processing activities</li>
                <li>Data portability</li>
                <li>Withdrawing consent</li>
              </ul>
              <p className="text-neutral-600 leading-relaxed mt-2">
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p className="text-neutral-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
              <p className="text-neutral-600 leading-relaxed">
                Our Services are not directed to children under 16 years of age. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p className="text-neutral-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="text-neutral-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-2 text-neutral-600">
                <p>NAME Institute</p>
                <p>Email: info@name.edu.np</p>
                <p>Phone: +977 1 5331144</p>
                <p>Address: NAME Building, Ramshah Path, Putalisadak</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
