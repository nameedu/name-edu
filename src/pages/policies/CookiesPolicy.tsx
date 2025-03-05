
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";

const CookiesPolicy = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Cookies Policy</h1>
          <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <Separator className="mb-8" />
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-neutral-600 leading-relaxed">
                This Cookies Policy explains how NAME Institute ("we", "our", or "us") uses cookies and similar technologies on our website. This policy should be read alongside our Privacy Policy, which explains how we use your personal information.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
              <p className="text-neutral-600 leading-relaxed">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. They allow us to recognize your device and remember certain information about your visit, such as your preferences and actions on our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">3.1 Essential Cookies</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    These cookies are necessary for our website to function properly. They enable basic functions like page navigation, secure areas access, and form submissions. The website cannot function properly without these cookies.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">3.2 Performance Cookies</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    These cookies collect information about how visitors use our website, such as which pages they visit most often and if they receive error messages. They help us improve our website's performance.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">3.3 Functionality Cookies</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">3.4 Targeting/Advertising Cookies</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
              <p className="text-neutral-600 leading-relaxed">
                Some cookies are placed by third parties on our website. These third parties may include analytics providers (like Google Analytics), social media platforms, and advertising networks. These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our website and other websites.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
              <p className="text-neutral-600 leading-relaxed">
                Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. You can delete existing cookies, allow or block all cookies, or block cookies from particular sites.
              </p>
              <p className="text-neutral-600 leading-relaxed mt-2">
                Please note that deleting or blocking cookies may affect your experience on our website, as some features may not function properly.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
              <p className="text-neutral-600 leading-relaxed">
                We may update this Cookies Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
              <p className="text-neutral-600 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
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

export default CookiesPolicy;
