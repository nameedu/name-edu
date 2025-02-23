
import { useState, useEffect } from "react";
import { Search, FileText, AlertCircle, Upload, Lock, Trash2, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface StudentResult {
  candidateId: string;
  examId: string;
  examMark: number;
  examRank: string;
  percentage: number;
}

interface ExamFile {
  id: string;
  filename: string;
  exam_id: string;
  exam_date: string;
  uploaded_at: string;
  total_results: number;
}

const ListResult = () => {
  const [searchId, setSearchId] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [resultsData, setResultsData] = useState<StudentResult[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<ExamFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check authentication status on component mount
  useEffect(() => {
    checkSession();
    fetchExamFiles();
    fetchResults();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);
    setIsLoading(false);
  };

  const fetchExamFiles = async () => {
    const { data, error } = await supabase
      .from('exam_result_files')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching files",
        description: error.message,
        variant: "destructive"
      });
    } else if (data) {
      setUploadedFiles(data);
    }
  };

  const fetchResults = async () => {
    const { data, error } = await supabase
      .from('exam_results')
      .select('*');

    if (error) {
      toast({
        title: "Error fetching results",
        description: error.message,
        variant: "destructive"
      });
    } else if (data) {
      setResultsData(data.map(r => ({
        candidateId: r.candidate_id,
        examId: r.exam_id,
        examMark: r.exam_mark,
        examRank: r.exam_rank,
        percentage: r.percentage
      })));
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // First, validate and parse the CSV
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      // Validate CSV structure
      const requiredHeaders = ['Candidate ID', 'Exam ID', 'Exam Mark', 'Exam Rank', 'Percentage'];
      const hasValidHeaders = requiredHeaders.every(header => 
        headers.includes(header)
      );

      if (!hasValidHeaders) {
        toast({
          title: "Invalid CSV Format",
          description: "Please ensure the CSV file has the correct headers",
          variant: "destructive"
        });
        return;
      }

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('exam_results')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Process CSV data
      const results = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const [candidateId, examId, examMark, examRank, percentage] = line.split(',').map(value => value.trim());
          return {
            candidate_id: candidateId,
            exam_id: examId,
            exam_mark: Number(examMark),
            exam_rank: examRank,
            percentage: Number(percentage)
          };
        });

      // Insert file metadata
      const { data: fileData, error: fileError } = await supabase
        .from('exam_result_files')
        .insert({
          filename: file.name,
          file_path: filePath,
          exam_id: results[0].exam_id,
          exam_date: new Date().toISOString(),
          total_results: results.length
        })
        .select()
        .single();

      if (fileError) throw fileError;

      // Insert results with file reference
      const { error: resultsError } = await supabase
        .from('exam_results')
        .insert(
          results.map(r => ({
            ...r,
            file_id: fileData.id
          }))
        );

      if (resultsError) throw resultsError;

      toast({
        title: "Success",
        description: `Uploaded ${results.length} results successfully`,
      });

      // Refresh data
      await Promise.all([fetchExamFiles(), fetchResults()]);

    } catch (error) {
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      // Delete results first (cascade should handle this in DB)
      const { data: resultsData, error: resultsError } = await supabase
        .from('exam_results')
        .delete()
        .eq('file_id', fileId);
  
      if (resultsError) throw resultsError;
  
      console.log("Deleted exam results:", resultsData);
  
      // Delete file metadata
      const { data: fileData, error: fileError } = await supabase
        .from('exam_result_files')
        .delete()
        .eq('id', fileId);
  
      if (fileError) throw fileError;
  
      console.log("Deleted file metadata:", fileData);
  
      toast({
        title: "Success",
        description: "File and associated results deleted successfully",
      });
  
      // Refresh data
      await Promise.all([fetchExamFiles(), fetchResults()]);
  
    } catch (error) {
      console.error("Error during deletion:", error);  // Added error logging for debugging
  
      toast({
        title: "Error deleting file",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    const foundResult = resultsData.find(r => 
      r.candidateId === searchId && 
      (selectedExam ? r.examId === selectedExam : true)
    );
    
    if (foundResult) {
      setResult(foundResult);
    } else {
      toast({
        title: "No Results Found",
        description: "Please check the Candidate ID and Exam ID and try again.",
        variant: "destructive"
      });
      setResult(null);
    }
    setIsSearching(false);
  };

  // Get unique exam IDs from the results data
  const uniqueExams = Array.from(new Set(resultsData.map(r => r.examId)));

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            Loading...
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Results List</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            List of the uploaded File
          </p>

          {/* Admin Dashboard */}
          
            <Card className="max-w-4xl mx-auto mb-12 p-6">
              <div className="space-y-6">
                {/* Uploaded Files List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Uploaded Files</h3>
                  <div className="space-y-4">
                    {uploadedFiles.map((file) => (
                      <Card key={file.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">{file.filename}</div>
                            <div className="text-sm text-neutral-500">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(file.uploaded_at), 'PPp')}
                              </div>
                              <div>Total Results: {file.total_results}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteFile(file.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {uploadedFiles.length === 0 && (
                      <p className="text-neutral-500 text-center py-4">
                        No files uploaded yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card> 
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListResult;