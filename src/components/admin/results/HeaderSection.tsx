
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeaderSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Results Management</h1>
        <p className="text-gray-600 mt-1">View and manage uploaded exam results</p>
      </div>
      <Link to="/admin/add-result">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Results
        </Button>
      </Link>
    </div>
  );
};

export default HeaderSection;
