
import { Link } from "react-router-dom";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="bg-neutral-800 text-white py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">{title}</h1>
        <p className="text-lg text-neutral-300 text-center max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Header;
