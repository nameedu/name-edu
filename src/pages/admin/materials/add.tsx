
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FileUploadForm from "@/components/admin/FileUploadForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

export default function AddMaterial() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState("");
  const [publicUrl, setPublicUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject || !materialType || !description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('study_materials')
        .insert({
          title,
          subject,
          material_type: materialType,
          description,
          file_path: filePath,
          created_by: userData.user?.id,
        })
        .select();

      if (error) throw error;

      toast({
        title: "Material added",
        description: "The study material has been added successfully",
      });

      navigate('/admin/materials');
    } catch (error) {
      console.error('Error adding material:', error);
      toast({
        title: "Error adding material",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = (newFilePath: string, newPublicUrl: string) => {
    setFilePath(newFilePath);
    setPublicUrl(newPublicUrl);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/materials')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Add New Study Material</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Material Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Physics Mechanics Notes"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Physics"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material-type">Material Type</Label>
                  <Select 
                    value={materialType} 
                    onValueChange={setMaterialType}
                  >
                    <SelectTrigger id="material-type">
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Notes">Study Notes</SelectItem>
                      <SelectItem value="Formula Sheet">Formula Sheet</SelectItem>
                      <SelectItem value="Problem Set">Problem Set</SelectItem>
                      <SelectItem value="Chapter Notes">Chapter Notes</SelectItem>
                      <SelectItem value="Reference Guide">Reference Guide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description of the material"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Upload Material File (PDF, DOC, DOCX)</Label>
                  <FileUploadForm 
                    onFileUpload={handleFileUpload}
                    contentType="study_materials"
                  />
                  
                  {publicUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600">File uploaded successfully!</p>
                      <a 
                        href={publicUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View uploaded file
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Material
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
