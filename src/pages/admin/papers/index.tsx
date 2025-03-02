
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, Trash2, Search, Plus, Edit, Eye, FileUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { previousPapersTable } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import type { PreviousPaper } from "@/types/studentZone";

const PapersList = () => {
  const [papers, setPapers] = useState<PreviousPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchPapers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await previousPapersTable.getAll();
      
      if (error) throw error;
      setPapers(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching papers",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleDeletePaper = async (id: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this paper? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(id);

    try {
      // First delete the file from storage
      const { error: storageError } = await supabase.storage
        .from('student_resources')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Then delete the database record
      const { error } = await previousPapersTable.delete(id);
      
      if (error) throw error;

      setPapers(prevPapers => prevPapers.filter(paper => paper.id !== id));
      
      toast({
        title: "Success",
        description: "Paper deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting paper",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.paper_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.year.includes(searchTerm)
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Previous Papers</h1>
            <p className="text-gray-600 mt-1">Manage previous exam papers for students</p>
          </div>
          <Link to="/admin/add-paper">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Paper
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by title, subject, type or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>
        </Card>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading papers...</p>
          </div>
        ) : filteredPapers.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {searchTerm ? "No matching papers found" : "No Papers Added"}
            </h2>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? "Try adjusting your search terms"
                : "Add your first previous paper to get started"}
            </p>
            {!searchTerm && (
              <Link to="/admin/add-paper">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Paper
                </Button>
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPapers.map((paper) => (
              <Card key={paper.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium">{paper.title}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(paper.created_at), 'PPp')}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{paper.subject}</Badge>
                        <Badge>{paper.paper_type}</Badge>
                        <Badge variant="secondary">{paper.year}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const fileUrl = supabase.storage
                          .from('student_resources')
                          .getPublicUrl(paper.file_path).data.publicUrl;
                        window.open(fileUrl, '_blank');
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/admin/edit-paper/${paper.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePaper(paper.id, paper.file_path)}
                      disabled={isDeleting === paper.id}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {isDeleting === paper.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PapersList;
