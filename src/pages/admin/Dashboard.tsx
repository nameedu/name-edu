
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, FileText, Video } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "500+",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: "12",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      title: "Result Files",
      value: "25",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "Video Lectures",
      value: "150+",
      icon: Video,
      color: "bg-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color} text-white`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">No recent activities</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Select an option from the sidebar to get started
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
