
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <Separator className="mb-8" />
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-neutral-600 leading-relaxed">
                Welcome to NAME Institute. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">2.1 Eligibility</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    You must be at least 16 years old to use our Services. By using our Services, you represent and warrant that you meet this requirement.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">2.2 Account Registration</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    To access certain features of our Services, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">2.3 Prohibited Activities</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-1">
                    <li>Violate any applicable laws, regulations, or third-party rights</li>
                    <li>Use our Services for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to our Services or systems</li>
                    <li>Interfere with or disrupt the integrity or performance of our Services</li>
                    <li>Collect or harvest any information from our Services without permission</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation</li>
                    <li>Upload or transmit viruses, malware, or other malicious code</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
              <p className="text-neutral-600 leading-relaxed">
                The content, organization, graphics, design, compilation, and other matters related to our Services are protected by applicable copyrights, trademarks, and other proprietary rights. Unauthorized use of materials appearing on our Services may violate copyright, trademark, and other laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
              <p className="text-neutral-600 leading-relaxed">
                Our Services may allow you to upload, submit, store, send, or receive content. By providing content to our Services, you grant us a worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, and distribute such content in connection with our Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
              <p className="text-neutral-600 leading-relaxed">
                Certain aspects of our Services may require payment. All payments are non-refundable unless explicitly stated otherwise. We reserve the right to change our pricing at any time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <p className="text-neutral-600 leading-relaxed">
                We may terminate or suspend your access to our Services at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-neutral-600 leading-relaxed">
                Our Services are provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-neutral-600 leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="text-neutral-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-neutral-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on our website. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-neutral-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;
