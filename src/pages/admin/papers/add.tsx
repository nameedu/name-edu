
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { previousPapersTable } from "@/lib/db";
import type { PreviousPaper } from "@/types/studentZone";

const paperTypes = [
  "Entrance Exam",
  "Semester Exam",
  "Test Series",
  "Mock Test",
  "Final Exam",
  "Mid-Term",
  "Other"
];

const years = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return year.toString();
});

const AddPreviousPaper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    paper_type: "Entrance Exam",
    year: new Date().getFullYear().toString(),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "File Required",
        description: "Please upload a PDF file of the previous paper",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `previous_papers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('student_resources')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Create database record
      const { data, error } = await previousPapersTable.create({
        title: formData.title,
        subject: formData.subject,
        paper_type: formData.paper_type,
        year: formData.year,
        file_path: filePath,
        created_by: (await supabase.auth.getUser()).data.user?.id || null
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Previous paper added successfully",
      });

      navigate('/admin/papers');
    } catch (error: any) {
      console.error("Error adding paper:", error);
      toast({
        title: "Error adding paper",
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
        <h1 className="text-3xl font-bold mb-8">Add Previous Paper</h1>
        
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
                <Label htmlFor="paper_type">Paper Type</Label>
                <Select
                  value={formData.paper_type}
                  onValueChange={(value) => handleSelectChange("paper_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select paper type" />
                  </SelectTrigger>
                  <SelectContent>
                    {paperTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="year">Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => handleSelectChange("year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="file">Paper File (PDF)</Label>
                <div className="mt-1">
                  <input
                    type="file"
                    id="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                    required
                  />
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-gray-50">
                    <label
                      htmlFor="file"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <span className="text-sm font-medium">
                        {selectedFile ? selectedFile.name : 'Click to upload PDF file'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PDF files only
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                Make sure to provide accurate information. Previous papers will be publicly accessible to students.
              </p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/papers')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Paper"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddPreviousPaper;
