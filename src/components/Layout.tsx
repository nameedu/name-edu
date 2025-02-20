
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
} from "@/components/ui/navigation-menu";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/2717d708-aa29-4f6e-adae-571558619133.png"
                alt="NAME Edu"
                className="h-8"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* About Us Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 bg-white shadow-lg rounded-lg">
                        {aboutUsLinks.map((item) => (
                          <li key={item.title}>
                            <Link
                              to={item.href}
                              className="flex items-start space-x-2 p-3 hover:bg-neutral-100 rounded-md group"
                            >
                              <item.icon className="h-5 w-5 text-primary group-hover:text-primary-hover mt-1" />
                              <div>
                                <div className="text-sm font-medium">{item.title}</div>
                                <p className="text-sm text-neutral-600 line-clamp-2">{item.description}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Student Zone Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Student Zone</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[800px] md:grid-cols-3 bg-white shadow-lg rounded-lg">
                        {/* Study Resources */}
                        <div className="space-y-4">
                          <h4 className="font-medium text-sm text-neutral-700 mb-2">Study Resources</h4>
                          <ul className="space-y-2">
                            {studentZoneLinks.map((item) => (
                              <li key={item.title}>
                                <Link
                                  to={item.href}
                                  className="flex items-start space-x-2 p-2 hover:bg-neutral-100 rounded-md group"
                                >
                                  <item.icon className="h-5 w-5 text-primary group-hover:text-primary-hover mt-1" />
                                  <div>
                                    <div className="text-sm font-medium">{item.title}</div>
                                    <p className="text-xs text-neutral-600 line-clamp-2">{item.description}</p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Downloads */}
                        <div className="space-y-4">
                          <h4 className="font-medium text-sm text-neutral-700 mb-2">Downloads</h4>
                          <ul className="space-y-2">
                            {downloadLinks.map((item) => (
                              <li key={item.title}>
                                <Link
                                  to={item.href}
                                  className="flex items-start space-x-2 p-2 hover:bg-neutral-100 rounded-md group"
                                >
                                  <Download className="h-5 w-5 text-primary group-hover:text-primary-hover mt-1" />
                                  <div>
                                    <div className="text-sm font-medium">{item.title}</div>
                                    <p className="text-xs text-neutral-600 line-clamp-2">{item.description}</p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Important Links */}
                        <div className="space-y-4">
                          <h4 className="font-medium text-sm text-neutral-700 mb-2">Important Links</h4>
                          <ul className="space-y-2">
                            {importantLinks.map((item) => (
                              <li key={item.title}>
                                <Link
                                  to={item.href}
                                  className="flex items-start space-x-2 p-2 hover:bg-neutral-100 rounded-md group"
                                >
                                  <Download className="h-5 w-5 text-primary group-hover:text-primary-hover mt-1" />
                                  <div>
                                    <div className="text-sm font-medium">{item.title}</div>
                                    <p className="text-xs text-neutral-600 line-clamp-2">{item.description}</p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Regular Menu Items */}
                  <NavigationMenuItem>
                    <Link to="/courses" className="nav-link flex items-center space-x-2 px-3 py-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Courses</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/results" className="nav-link flex items-center space-x-2 px-3 py-2">
                      <Award className="h-4 w-4" />
                      <span>Results</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/online-form" className="nav-link flex items-center space-x-2 px-3 py-2">
                      <FileText className="h-4 w-4" />
                      <span>Online Form</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/online-class" className="nav-link flex items-center space-x-2 px-3 py-2">
                      <Video className="h-4 w-4" />
                      <span>Online Class</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contact" className="nav-link flex items-center space-x-2 px-3 py-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact</span>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Student Login
            </Button>
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

// Navigation Links Data
const aboutUsLinks = [
  {
    title: "Institute Overview",
    description: "Learn about our mission, vision, and commitment to education",
    href: "/overview",
    icon: Building,
  },
  {
    title: "Our Faculty",
    description: "Meet our experienced and dedicated teaching staff",
    href: "/faculty",
    icon: Users,
  },
];

const studentZoneLinks = [
  {
    title: "Study Materials",
    description: "Access comprehensive study materials and resources",
    href: "/study-materials",
    icon: Book,
  },
  {
    title: "Video Lectures",
    description: "Watch recorded lectures and educational content",
    href: "/video-lectures",
    icon: Video,
  },
  {
    title: "Question Bank",
    description: "Practice with our extensive collection of questions",
    href: "/question-bank",
    icon: FileText,
  },
];

const downloadLinks = [
  {
    title: "Sample Papers",
    description: "Download sample question papers for practice",
    href: "/downloads/sample-papers",
  },
  {
    title: "Study Notes",
    description: "Access comprehensive study notes for all subjects",
    href: "/downloads/study-notes",
  },
];

const importantLinks = [
  {
    title: "Time Table",
    description: "View current class and exam schedules",
    href: "/timetable",
  },
  {
    title: "Notice Board",
    description: "Stay updated with latest announcements",
    href: "/notices",
  },
];

export default Layout;
