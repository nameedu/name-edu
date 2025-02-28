
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-neutral-400 mb-4">
              NAME Edu is a premier educational institution dedicated to providing quality education and empowering students for a successful future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/overview" className="text-neutral-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="text-neutral-400 hover:text-white transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/faculty" className="text-neutral-400 hover:text-white transition-colors">Faculty</Link>
              </li>
              <li>
                <Link to="/news" className="text-neutral-400 hover:text-white transition-colors">News & Events</Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Student Zone</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/portal" className="text-neutral-400 hover:text-white transition-colors">Student Portal</Link>
              </li>
              <li>
                <Link to="/materials" className="text-neutral-400 hover:text-white transition-colors">Study Materials</Link>
              </li>
              <li>
                <Link to="/results" className="text-neutral-400 hover:text-white transition-colors">Exam Results</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-neutral-400 hover:text-white transition-colors">Exam Schedule</Link>
              </li>
              <li>
                <Link to="/online-form" className="text-neutral-400 hover:text-white transition-colors">Online Form</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <Mail size={18} className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-neutral-400">info@nameedu.edu</p>
                  <p className="text-neutral-400">admissions@nameedu.edu</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <Phone size={18} className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-neutral-400">+91 1234567890</p>
                  <p className="text-neutral-400">+91 9876543210</p>
                </div>
              </li>
              <li>
                <p className="text-neutral-400">
                  123 Education Street, City Name,<br />
                  State - 123456, India
                </p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-neutral-800 my-6" />

        <div className="flex flex-wrap justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} NAME Edu. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
