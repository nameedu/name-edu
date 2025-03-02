
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileText, 
  Edit, 
  Trash, 
  Calendar, 
  Download, 
  Plus,
  BookOpen
} from "lucide-react";

export default function ManagePapers() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('previous_papers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPapers(data || []);
    } catch (error) {
      console.error('Error fetching papers:', error);
      toast({
        title: "Error fetching papers",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this paper?')) return;

    try {
      const { error } = await supabase
        .from('previous_papers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Paper deleted",
        description: "The previous paper has been deleted successfully",
      });

      fetchPapers();
    } catch (error) {
      console.error('Error deleting paper:', error);
      toast({
        title: "Error deleting paper",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Previous Papers</h1>
          <Button onClick={() => navigate('/admin/add-paper')}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Paper
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : papers.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 mb-4">No previous papers found</p>
            <Button onClick={() => navigate('/admin/add-paper')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Paper
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => (
              <Card key={paper.id} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold line-clamp-1">{paper.title}</h3>
                      <p className="text-sm text-neutral-500">{paper.paper_type}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 flex-grow">
                    <div className="flex items-center text-sm">
                      <BookOpen className="w-4 h-4 mr-2 text-neutral-500" />
                      <span>{paper.subject}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-neutral-500" />
                      <span>{paper.year}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a 
                        href={supabase.storage.from('student_resources').getPublicUrl(paper.file_path).data.publicUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/admin/edit-paper/${paper.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(paper.id)}
                    >
                      <Trash className="h-4 w-4" />
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
}
