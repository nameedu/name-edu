
import { Building, Mail, MapPin, Phone, Shield, FileText, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <img
                src="/Images/logo.png"
                alt="NAME Edu"
                className="h-12 mb-4"
              />
              <p className="text-neutral-300 text-sm leading-relaxed">
                Empowering students through quality education and comprehensive exam preparation.
                Join us in your journey towards academic excellence.
              </p>
            </div>
            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/overview" className="text-neutral-300 hover:text-white text-sm">Institute Overview</Link></li>
              <li><Link to="/courses" className="text-neutral-300 hover:text-white text-sm">Our Courses</Link></li>
              <li><Link to="/faculty" className="text-neutral-300 hover:text-white text-sm">Faculty & Staff</Link></li>
              <li><Link to="/results" className="text-neutral-300 hover:text-white text-sm">Results</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-white text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Student Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/materials" className="text-neutral-300 hover:text-white text-sm">Study Materials</Link></li>
              <li><Link to="/videos" className="text-neutral-300 hover:text-white text-sm">Video Lectures</Link></li>
              <li><Link to="/news" className="text-neutral-300 hover:text-white text-sm">News</Link></li>
              <li><Link to="/questionbank" className="text-neutral-300 hover:text-white text-sm">Question Bank</Link></li>
              <li><Link to="/papers" className="text-neutral-300 hover:text-white text-sm">Papers</Link></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com/nameinstitute/" className="bg-neutral-700 p-2 rounded-full hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://twitter.com/name_mbbs?lang=en" className="bg-neutral-700 p-2 rounded-full hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UC-QKMRJF2cUB0LagjN9Ueuw" className="bg-neutral-700 p-2 rounded-full hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M23.498 6.186a2.752 2.752 0 0 0-1.945-1.944C20.973 3.75 12 3.75 12 3.75s-8.973 0-9.553.492a2.752 2.752 0 0 0-1.945 1.944C0 7.766 0 12 0 12s0 4.234.492 5.814a2.752 2.752 0 0 0 1.945 1.944C3.027 20.25 12 20.25 12 20.25s8.973 0 9.553-.492a2.752 2.752 0 0 0 1.945-1.944C24 16.234 24 12 24 12s0-4.234-.492-5.814zm-14.524 7.582V9.648l6.77 2.59-6.77 2.59z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/name_institute/" className="bg-neutral-700 p-2 rounded-full hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="space-y-2">
              <a href="tel:+1234567890" className="flex items-center text-sm text-neutral-300 hover:text-white">
                <Phone className="h-4 w-4 mr-2" />
                +977 1 5331144
              </a>
              <a href="mailto:info@name.edu.np" className="flex items-center text-sm text-neutral-300 hover:text-white">
                <Mail className="h-4 w-4 mr-2" />
                info@name.edu.np
              </a>
              <div className="flex items-center text-sm text-neutral-300">
                <MapPin className="h-4 w-4 mr-2" />
                NAME Building, Ramshah Path, Putalisadak
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-neutral-400">
              <p>© {new Date().getFullYear()} NAME Institute. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap gap-4 text-sm text-neutral-400">
                <li>
                  <Link to="/privacy-policy" className="flex items-center hover:text-white">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="flex items-center hover:text-white">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cookies-policy" className="flex items-center hover:text-white">
                    <Info className="h-4 w-4 mr-1" />
                    <span>Cookies Policy</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
