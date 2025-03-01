
import { useState, useEffect } from "react";
import { FileText, Calendar, Trash2, Search, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface ExamFile {
  id: string;
  filename: string;
  exam_id: string;
  exam_date: string;
  uploaded_at: string;
  total_results: number;
  file_path: string;
}

const ListResult = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ExamFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingFile, setIsDeletingFile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchExamFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('exam_result_files')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setUploadedFiles(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching files",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExamFiles();
  }, []);

  const handleDeleteFile = async (fileId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return;
    }

    setIsDeletingFile(fileId);
    console.log('Starting deletion process for file:', fileId, 'path:', filePath);

    try {
      // First delete all results associated with this file
      console.log('Deleting exam results...');
      const { error: resultsError } = await supabase
        .from('exam_results')
        .delete()
        .eq('file_id', fileId)
        .throwOnError();

      if (resultsError) {
        console.error('Error deleting results:', resultsError);
        throw new Error(`Failed to delete results: ${resultsError.message}`);
      }

      // Then delete the file from storage
      console.log('Deleting file from storage...');
      const { error: storageError } = await supabase.storage
        .from('exam_results')
        .remove([filePath]);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
        throw new Error(`Failed to delete file from storage: ${storageError.message}`);
      }

      // Finally delete the file record
      console.log('Deleting file record...');
      const { error: fileError } = await supabase
        .from('exam_result_files')
        .delete()
        .eq('id', fileId)
        .throwOnError();

      if (fileError) {
        console.error('Error deleting file record:', fileError);
        throw new Error(`Failed to delete file record: ${fileError.message}`);
      }

      // Update local state to remove the deleted file
      setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));

      toast({
        title: "Success",
        description: "File and associated results deleted successfully",
      });
      
      console.log('Deletion process completed successfully');

      // Refresh the file list after successful deletion
      await fetchExamFiles();
    } catch (error: any) {
      console.error('Deletion process failed:', error);
      toast({
        title: "Error deleting file",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsDeletingFile(null);
    }
  };

  const filteredFiles = uploadedFiles.filter(file =>
    file.exam_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Results Management</h1>
            <p className="text-gray-600 mt-1">View and manage uploaded exam results</p>
          </div>
          <Link to="/admin/add-result">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Results
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by exam ID or filename..."
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
            <p className="mt-4 text-gray-600">Loading results...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
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
        ) : (
          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium">{file.filename}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(file.uploaded_at), 'PPp')}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          Exam ID: {file.exam_id}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {file.total_results} Results
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteFile(file.id, file.file_path)}
                      disabled={isDeletingFile === file.id}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {isDeletingFile === file.id ? 'Deleting...' : 'Delete'}
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

export default ListResult;
