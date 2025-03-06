
import { FileText, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  searchTerm: string;
}

const EmptyState = ({ searchTerm }: EmptyStateProps) => {
  return (
    <Card className="p-8 text-center">
      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        {searchTerm ? "No matching results found" : "No Results Uploaded"}
      </h2>
      <p className="text-gray-600 mb-4">
        {searchTerm 
          ? "Try adjusting your search terms"
          : "Upload your first results file to get started"}
      </p>
      {!searchTerm && (
        <Link to="/admin/add-result">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Upload Results
          </Button>
        </Link>
      )}
    </Card>
  );
};

export default EmptyState;
