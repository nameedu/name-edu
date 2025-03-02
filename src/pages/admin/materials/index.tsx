
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  File, 
  Edit, 
  Trash, 
  BookOpen, 
  Download, 
  Plus 
} from "lucide-react";

export default function ManageMaterials() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast({
        title: "Error fetching materials",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    try {
      const { error } = await supabase
        .from('study_materials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Material deleted",
        description: "The study material has been deleted successfully",
      });

      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
      toast({
        title: "Error deleting material",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    }
  };

  const getMaterialTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'notes':
        return <BookOpen className="h-5 w-5" />;
      case 'formula sheet':
        return <File className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Study Materials</h1>
          <Button onClick={() => navigate('/admin/add-material')}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Material
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : materials.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 mb-4">No study materials found</p>
            <Button onClick={() => navigate('/admin/add-material')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Material
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <Card key={material.id} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {getMaterialTypeIcon(material.material_type)}
                    </div>
                    <div>
                      <h3 className="font-semibold line-clamp-1">{material.title}</h3>
                      <p className="text-sm text-neutral-500">{material.subject}</p>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2 flex-grow">
                    {material.description}
                  </p>

                  <div className="flex space-x-2 mt-auto">
                    {material.file_path && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a 
                          href={supabase.storage.from('student_resources').getPublicUrl(material.file_path).data.publicUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/admin/edit-material/${material.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(material.id)}
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
