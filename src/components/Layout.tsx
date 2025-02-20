
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Award, MessageSquare, Building, Users, FileText, Video, Book, Newspaper, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/2717d708-aa29-4f6e-adae-571558619133.png"
                alt="NAME Edu"
                className="h-8"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Regular Menu Items */}
                  <NavigationMenuItem>
                    <Link to="/courses" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <GraduationCap className="h-4 w-4" />
                      <span>Courses</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/results" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <Award className="h-4 w-4" />
                      <span>Results</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/online-form" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <FileText className="h-4 w-4" />
                      <span>Online Form</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/online-class" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <Video className="h-4 w-4" />
                      <span>Online Class</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/study-materials" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <Book className="h-4 w-4" />
                      <span>Study Materials</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/video-lectures" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <Video className="h-4 w-4" />
                      <span>Video Lectures</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/question-bank" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <FileText className="h-4 w-4" />
                      <span>Question Bank</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contact" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact</span>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Button className="bg-primary hover:bg-primary-hover text-white ml-4">
                Student Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
