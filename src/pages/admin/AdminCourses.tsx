
import { useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCourses = () => {
  useEffect(() => {
    document.title = "Manage Courses | Admin Dashboard";
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Courses Management</CardTitle>
            <CardDescription>
              Add, edit, or remove courses offered by your institution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Course management functionality will be implemented soon. This page allows administrators to manage the courses displayed on the website.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;
