
import Layout from "@/components/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-neutral-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to NAME Edu. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>
            <p className="mt-4">
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use NAME Edu's website if you do not accept all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. License to Use</h2>
            <p>
              Unless otherwise stated, NAME Edu and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
            </p>
            <p className="mt-4">
              You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Restrictions</h2>
            <p>You must not:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Republish material from this website</li>
              <li>Sell, rent or sub-license material from this website</li>
              <li>Reproduce, duplicate or copy material from this website</li>
              <li>Redistribute content from NAME Edu (unless content is specifically made for redistribution)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>
              In these terms and conditions, "User Content" shall mean any audio, video, text, images or other material you choose to display on this website. By displaying your User Content, you grant NAME Edu a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
            </p>
            <p className="mt-4">
              Your User Content must be your own and must not be infringing on any third party's rights. NAME Edu reserves the right to remove any of your content from this website at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. No Warranties</h2>
            <p>
              This website is provided "as is," with all faults, and NAME Edu makes no express or implied representations or warranties, of any kind related to this website or the materials contained on this website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall NAME Edu, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law & Jurisdiction</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Email:</strong> legal@nameedu.edu</p>
              <p><strong>Phone:</strong> +91 1234567890</p>
              <p><strong>Address:</strong> NAME Edu, Main Campus, Example Street, City, State - 123456</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
