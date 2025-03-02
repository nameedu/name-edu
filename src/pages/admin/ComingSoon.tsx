import React from "react";
import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";

const ComingSoon = () => {
  return (
    <AdminGuard>
      <AdminLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800">Under Development</h1>
          <p className="text-lg text-gray-600 mt-4">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
      </div>
      </AdminLayout>
      </AdminGuard>
  );
};

export default ComingSoon;
