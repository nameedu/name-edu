
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
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${iconColor || "text-muted-foreground"}`} />
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
    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
      <CardHeader className={`${bgColor || "bg-gray-50"} rounded-t-lg`}>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administrator Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to <strong>NAME Institute!</strong> <br />Manage all sections of the website from here. Note: This is a demo dashboard and will be updated with more features soon.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            icon={Bell}
            title="Notices"
            value={3}
            description="Active notices"
            iconColor="text-blue-500"
          />
          <StatCard
            icon={BookOpen}
            title="Notes"
            value={3}
            description="Study materials"
            iconColor="text-green-500"
          />
          <StatCard
            icon={Video}
            title="Videos"
            value={3}
            description="Video lectures"
            iconColor="text-red-500"
          />
          <StatCard
            icon={Calendar}
            title="Exam Schedule"
            value={3}
            description="Downloadable resources"
            iconColor="text-purple-500"
          />
          <StatCard
            icon={Link2}
            title="Links"
            value={3}
            description="Important external links"
            iconColor="text-orange-500"
          />
          <StatCard
            icon={Trophy}
            title="Results"
            value={3}
            description="Exam results"
            iconColor="text-yellow-500"
          />
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Action
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              title="Manage Notices"
              description="Add or update important announcements"
              icon={Bell}
              link="/admin/notices"
              bgColor="bg-blue-50"
            />
            <ActionCard
              title="Publish Results"
              description="Share exam results and scorecards"
              icon={Trophy}
              link="/admin/add-result"
              bgColor="bg-yellow-50"
            />
            <ActionCard
              title="Upload Study Materials"
              description="Share study materials with students"
              icon={BookOpen}
              link="/admin/materials"
              bgColor="bg-green-50"
            />
            <ActionCard
              title="Add Video Lectures"
              description="Upload educational videos"
              icon={Video}
              link="/admin/videos"
              bgColor="bg-red-50"
            />
            <ActionCard
              title="Manage Exam Schedule"
              description="Add resources for students to download"
              icon={Calendar}
              link="/admin/Schedule"
              bgColor="bg-purple-50"
            />
            <ActionCard
              title="Important Links"
              description="Add external resources and useful websites"
              icon={Link2}
              link="/admin/links"
              bgColor="bg-orange-50"
            />
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;