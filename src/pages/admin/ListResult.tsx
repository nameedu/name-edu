
import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { useToast } from "@/components/ui/use-toast";
import { ExamFile } from "@/types/exam";
import HeaderSection from "@/components/admin/results/HeaderSection";
import SearchBar from "@/components/admin/results/SearchBar";
import LoadingState from "@/components/admin/results/LoadingState";
import EmptyState from "@/components/admin/results/EmptyState";
import ResultCard from "@/components/admin/results/ResultCard";
import { fetchExamFiles, deleteExamFile } from "@/services/examService";

const ListResult = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ExamFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingFile, setIsDeletingFile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const loadExamFiles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await fetchExamFiles();
      
      if (error) {
        toast({
          title: "Error fetching files",
          description: error,
          variant: "destructive"
        });
        return;
      }
      
      setUploadedFiles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExamFiles();
  }, []);

  const handleDeleteFile = async (fileId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return;
    }

    setIsDeletingFile(fileId);
    console.log('Starting deletion process for file:', fileId, 'path:', filePath);

    const { success, warning, error } = await deleteExamFile(fileId, filePath);
    
    if (success) {
      // Update local state to remove the deleted file
      setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      
      if (warning) {
        toast({
          title: "Warning",
          description: warning,
          variant: "default"
        });
      } else {
        toast({
          title: "Success",
          description: "File and associated results deleted successfully",
        });
      }
    } else {
      toast({
        title: "Error deleting file",
        description: error || "An unknown error occurred",
        variant: "destructive"
      });
    }
    
    setIsDeletingFile(null);
  };

  const filteredFiles = uploadedFiles.filter(file =>
    file.exam_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <HeaderSection />
          
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {isLoading ? (
            <LoadingState />
          ) : filteredFiles.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <div className="grid gap-4">
              {filteredFiles.map((file) => (
                <ResultCard 
                  key={file.id} 
                  file={file} 
                  isDeletingFile={isDeletingFile} 
                  onDelete={handleDeleteFile}
                />
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default ListResult;
