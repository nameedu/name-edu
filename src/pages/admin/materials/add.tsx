
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { studyMaterialsTable } from "@/lib/db";
import type { StudyMaterial } from "@/types/studentZone";

const materialTypes = [
  "Notes",
  "Textbook",
  "Solution",
  "Practice Paper",
  "Reference Material",
  "Other"
];

const AddMaterial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    material_type: "Notes",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let filePath = null;

      // Upload file if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        filePath = `study_materials/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('student_resources')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;
      }

      // Create database record
      const { data, error } = await studyMaterialsTable.create({
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        material_type: formData.material_type,
        file_path: filePath,
        created_by: (await supabase.auth.getUser()).data.user?.id || null
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Study material added successfully",
      });

      navigate('/admin/materials');
    } catch (error: any) {
      console.error("Error adding material:", error);
      toast({
        title: "Error adding material",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add Study Material</h1>
        
        <Card className="p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="material_type">Material Type</Label>
                <Select
                  value={formData.material_type}
                  onValueChange={(value) => handleSelectChange("material_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="file">Material File (Optional)</Label>
                <div className="mt-1">
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-gray-50">
                    <label
                      htmlFor="file"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <span className="text-sm font-medium">
                        {selectedFile ? selectedFile.name : 'Click to upload file'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                Make sure to provide accurate information. Study materials will be publicly accessible to students.
              </p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/materials')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Material"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddMaterial;
