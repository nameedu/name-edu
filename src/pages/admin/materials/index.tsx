
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, Trash2, Search, Plus, Edit, Eye, FileUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { studyMaterialsTable } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import type { StudyMaterial } from "@/types/studentZone";

const MaterialsList = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await studyMaterialsTable.getAll();
      
      if (error) throw error;
      setMaterials(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching materials",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDeleteMaterial = async (id: string, filePath: string | null) => {
    if (!confirm('Are you sure you want to delete this material? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(id);

    try {
      // First delete the file from storage if it exists
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from('student_resources')
          .remove([filePath]);

        if (storageError) throw storageError;
      }

      // Then delete the database record
      const { error } = await studyMaterialsTable.delete(id);
      
      if (error) throw error;

      setMaterials(prevMaterials => prevMaterials.filter(material => material.id !== id));
      
      toast({
        title: "Success",
        description: "Material deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting material",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.material_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Study Materials</h1>
            <p className="text-gray-600 mt-1">Manage study materials for students</p>
          </div>
          <Link to="/admin/add-material">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Material
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by title, subject or material type..."
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
            <p className="mt-4 text-gray-600">Loading materials...</p>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {searchTerm ? "No matching materials found" : "No Materials Added"}
            </h2>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? "Try adjusting your search terms"
                : "Add your first study material to get started"}
            </p>
            {!searchTerm && (
              <Link to="/admin/add-material">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Material
                </Button>
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium">{material.title}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(material.created_at), 'PPp')}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{material.subject}</Badge>
                        <Badge>{material.material_type}</Badge>
                        {material.file_path && (
                          <Badge variant="secondary">
                            <FileUp className="w-3 h-3 mr-1" />
                            Has attachment
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {material.file_path && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const fileUrl = supabase.storage
                            .from('student_resources')
                            .getPublicUrl(material.file_path!).data.publicUrl;
                          window.open(fileUrl, '_blank');
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/admin/edit-material/${material.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteMaterial(material.id, material.file_path)}
                      disabled={isDeleting === material.id}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {isDeleting === material.id ? 'Deleting...' : 'Delete'}
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

export default MaterialsList;
