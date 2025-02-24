import Layout from "@/components/Layout";

const OnlineForm = () => {
  return (
    <Layout>
      <div className="online-form-page h-screen overflow-hidden pt-16">
        {/* Full-page iframe container */}
        <iframe
          src="https://nameonline.paathshala.com.np/"
          className="w-full h-full"
          title="Online Form"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
};

export default OnlineForm;
