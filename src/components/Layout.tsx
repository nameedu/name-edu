
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, BookOpen, Award, MessageSquare, Building, Users, FileText, Video, Book, Newspaper, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
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
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

const aboutUsLinks = [
  {
    title: "Institute Overview",
    href: "/overview",
    icon: Building,
    description: "Learn about our history, achievements, and educational philosophy",
  },
  {
    title: "Mission & Vision",
    href: "/mission",
    icon: Award,
    description: "Discover our goals and commitment to educational excellence",
  },
  {
    title: "Faculty & Staff",
    href: "/faculty",
    icon: Users,
    description: "Meet our experienced team of educators and administrators",
  },
  {
    title: "Infrastructure & Facilities",
    href: "/infrastructure",
    icon: Building,
    description: "Explore our state-of-the-art campus and learning facilities",
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    icon: MessageSquare,
    description: "Read success stories from our students and alumni",
  },
];

const studentZoneLinks = [
  {
    title: "Study Materials",
    href: "/materials",
    icon: Book,
    description: "Access comprehensive study notes and resources",
  },
  {
    title: "Video Lectures",
    href: "/videos",
    icon: Video,
    description: "Watch recorded lectures and educational content",
  },
  {
    title: "Question Bank PDF",
    href: "/questionbank",
    icon: FileText,
    description: "Download practice questions and sample papers",
  },
  {
    title: "News",
    href: "/news",
    icon: Newspaper,
    description: "Stay updated with latest educational news and updates",
  },
];

const downloadLinks = [
  {
    title: "Assignments",
    href: "/assignments",
    description: "Download weekly assignments and worksheets",
  },
  {
    title: "Syllabus",
    href: "/syllabus",
    description: "Access course-wise detailed syllabus",
  },
  {
    title: "Previous Papers",
    href: "/papers",
    description: "Get last 5 years solved question papers",
  },
];

const importantLinks = [
  {
    title: "Student Portal",
    href: "/portal",
    description: "Access your student dashboard and profile",
  },
  {
    title: "Exam Schedule",
    href: "/schedule",
    description: "View upcoming test and exam dates",
  },
  {
    title: "Fee Payment",
    href: "/payment",
    description: "Make online fee payments securely",
  },
];

export default Layout;
