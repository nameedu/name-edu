
import Layout from "@/components/Layout";

const CookiePolicy = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-neutral-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you.
            </p>
            <p className="mt-4">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
            <p>
              When you access and use our website, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Essential cookies:</strong> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.</li>
              <li><strong>Analytical/performance cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.</li>
              <li><strong>Functionality cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.</li>
              <li><strong>Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the service, and so on.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. What Are Your Choices Regarding Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
            </p>
            <p className="mt-4">
              Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Where Can You Find More Information About Cookies</h2>
            <p>
              You can learn more about cookies at the following third-party websites:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>AllAboutCookies: <a href="https://www.allaboutcookies.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.allaboutcookies.org/</a></li>
              <li>Network Advertising Initiative: <a href="https://www.networkadvertising.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.networkadvertising.org/</a></li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Email:</strong> privacy@nameedu.edu</p>
              <p><strong>Phone:</strong> +91 1234567890</p>
              <p><strong>Address:</strong> NAME Edu, Main Campus, Example Street, City, State - 123456</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
