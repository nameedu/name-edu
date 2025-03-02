import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Video,
  BookOpen,
  Bell,
  Calendar,
  Menu,
  LogOut,
  X,
  List,
  Trophy,
  Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StudentGuard from "@/components/StudentGuard";  // Import the StudentGuard component

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout = ({ children }: StudentLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/student",
    },
    {
      title: "Notices",
      icon: Bell,
      href: "/student/notices",
    },
    {
      title: "Results",
      icon: Trophy,
      href: "#",
      subItems: [
        {
          title: "View Results",
          icon: List,
          href: "/student/results",
        },
      ],
    },
    {
      title: "Courses",
      icon: GraduationCap,
      href: "/student/courses",
    },
    {
      title: "Study Materials",
      icon: BookOpen,
      href: "/student/materials",
    },
    {
      title: "Video Lectures",
      icon: Video,
      href: "/student/videos",
    },
    {
      title: "Exam Schedule",
      icon: Calendar,
      href: "/student/schedule",
    },
    {
      title: "Important Links",
      icon: Link2,
      href: "/student/links",
    },
  ];

  return (
    <StudentGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="flex flex-col h-full w-64 bg-white border-r">
            <div className="flex items-center justify-between p-4 border-b">
              <Link to="/student" className="flex items-center">
                <img
                  src="/lovable-uploads/2717d708-aa29-4f6e-adae-571558619133.png"
                  alt="NAME Edu"
                  className="h-8"
                />
                <span className="ml-2 font-semibold">Student</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <div className="space-y-1">
                      <Link
                        to={item.href}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                          location.pathname === item.href
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.title}
                      </Link>
                      {item.subItems && (
                        <ul className="ml-6 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                to={subItem.href}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                                  location.pathname === subItem.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                              >
                                <subItem.icon className="h-4 w-4 mr-2" />
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Main content */}
        <div className={`md:ml-64 p-8 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          {children}
        </div>
      </div>
    </StudentGuard>
  );
};

export default StudentLayout;
