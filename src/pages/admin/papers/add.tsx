
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FileUploadForm from "@/components/admin/FileUploadForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

export default function AddPaper() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [paperType, setPaperType] = useState("");
  const [year, setYear] = useState("");
  const [filePath, setFilePath] = useState("");
  const [publicUrl, setPublicUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject || !paperType || !year || !filePath) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and upload a file",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('previous_papers')
        .insert({
          title,
          subject,
          paper_type: paperType,
          year,
          file_path: filePath,
          created_by: userData.user?.id,
        })
        .select();

      if (error) throw error;

      toast({
        title: "Paper added",
        description: "The previous paper has been added successfully",
      });

      navigate('/admin/papers');
    } catch (error) {
      console.error('Error adding paper:', error);
      toast({
        title: "Error adding paper",
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

  // Generate years for the select dropdown, from current year back to 2000
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => (currentYear - i).toString());

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/papers')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Add New Previous Paper</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Paper Details</CardTitle>
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
                    placeholder="e.g., JEE Advanced"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Physics, Chemistry, Mathematics"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paper-type">Paper Type</Label>
                  <Select 
                    value={paperType} 
                    onValueChange={setPaperType}
                  >
                    <SelectTrigger id="paper-type">
                      <SelectValue placeholder="Select paper type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entrance Exam">Entrance Exam</SelectItem>
                      <SelectItem value="Medical Entrance">Medical Entrance</SelectItem>
                      <SelectItem value="Engineering Entrance">Engineering Entrance</SelectItem>
                      <SelectItem value="Practice Test">Practice Test</SelectItem>
                      <SelectItem value="Sample Paper">Sample Paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select 
                    value={year} 
                    onValueChange={setYear}
                  >
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Upload Paper File (PDF)</Label>
                  <FileUploadForm 
                    onFileUpload={handleFileUpload}
                    contentType="previous_papers"
                    acceptedFileTypes=".pdf"
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
                  disabled={submitting || !filePath}
                >
                  {submitting ? "Saving..." : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Paper
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
