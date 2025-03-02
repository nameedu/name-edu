import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Bell, Link2, Trophy, Video, PlusCircle, Calendar } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  description,
  iconColor
}: { 
  icon: any; 
  title: string; 
  value: string | number; 
  description: string;
  iconColor?: string;
}) => (
  <Card className="shadow-md transition-transform hover:scale-[1.02]">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${iconColor || "text-muted-foreground"}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ActionCard = ({
  title,
  description,
  icon: Icon,
  link,
  bgColor
}: {
  title: string;
  description: string;
  icon: any;
  link: string;
  bgColor?: string;
}) => (
  <RouterLink to={link}>
    <Card className="hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer h-full">
      <CardHeader className={`${bgColor || "bg-gray-100"} rounded-t-lg`}>
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  </RouterLink>
);

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to NAME Institute!</h1>
          <p className="text-muted-foreground">
            Manage all sections of the website from here. More features will be added soon.
          </p>
        </header>
        
        {/* Stats Cards */}
        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={Bell} title="Notices" value={3} description="Active notices" iconColor="text-blue-500" />
          <StatCard icon={BookOpen} title="Notes" value={3} description="Study materials" iconColor="text-green-500" />
          <StatCard icon={Video} title="Videos" value={3} description="Video lectures" iconColor="text-red-500" />
          <StatCard icon={Calendar} title="Exam Schedule" value={3} description="Upcoming exams" iconColor="text-purple-500" />
          <StatCard icon={Link2} title="Links" value={3} description="Useful external links" iconColor="text-orange-500" />
          <StatCard icon={Trophy} title="Results" value={3} description="Latest exam results" iconColor="text-yellow-500" />
        </section>
        
        {/* Quick Actions */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Action
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <ActionCard title="Manage Notices" description="Edit announcements" icon={Bell} link="/admin/notices" bgColor="bg-blue-50" />
            <ActionCard title="Publish Results" description="Add new exam results" icon={Trophy} link="/admin/add-result" bgColor="bg-yellow-50" />
            <ActionCard title="Upload Study Materials" description="Share notes with students" icon={BookOpen} link="/admin/materials" bgColor="bg-green-50" />
            <ActionCard title="Add Video Lectures" description="Upload video lessons" icon={Video} link="/admin/videos" bgColor="bg-red-50" />
            <ActionCard title="Manage Exam Schedule" description="Edit upcoming exams" icon={Calendar} link="/admin/schedule" bgColor="bg-purple-50" />
            <ActionCard title="Important Links" description="Add useful resources" icon={Link2} link="/admin/links" bgColor="bg-orange-50" />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
