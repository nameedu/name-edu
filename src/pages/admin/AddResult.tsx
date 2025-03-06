
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { StudentResult } from "@/types/exam";
import FileUploader from "@/components/admin/results/FileUploader";
import FileSummary from "@/components/admin/results/FileSummary";
import ExamMetadataForm from "@/components/admin/results/ExamMetadataForm";
import { uploadExamResults } from "@/services/uploadService";

const AddResult = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [verificationChecked, setVerificationChecked] = useState(false);
  const [parsedResults, setParsedResults] = useState<StudentResult[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [examTitle, setExamTitle] = useState<string>("");
  const [examDate, setExamDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = (results: StudentResult[], file: File) => {
    setParsedResults(results);
    setSelectedFile(file);
    setVerificationChecked(false);
  };

  const handleUpload = async () => {
    if (!selectedFile || !verificationChecked || isUploading) return;

    setIsUploading(true);
    const fileInput = document.getElementById('csv-upload') as HTMLInputElement;

    try {
      const result = await uploadExamResults(
        selectedFile,
        parsedResults,
        examTitle,
        examDate
      );

      toast({
        title: "Success",
        description: `Uploaded ${result.resultsCount} results successfully`,
      });

      // Reset the form
      setSelectedFile(null);
      setParsedResults([]);
      setVerificationChecked(false);
      setExamTitle("");
      setExamDate(format(new Date(), "yyyy-MM-dd"));
      if (fileInput) {
        fileInput.value = '';
      }

      // Navigate to list page after successful upload
      navigate('/admin/list-result');
    } catch (error: any) {
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Upload Exam Results</h1>
          
          <Card className="p-6 max-w-2xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">CSV File Upload</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a CSV file with the following headers:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4 pl-4">
                  <li>Candidate ID</li>
                  <li>Exam ID</li>
                  <li>Exam Mark</li>
                  <li>Exam Rank</li>
                  <li>Percentage</li>
                </ul>
              </div>

              <ExamMetadataForm 
                examTitle={examTitle}
                examDate={examDate}
                onExamTitleChange={setExamTitle}
                onExamDateChange={setExamDate}
                isUploading={isUploading}
              />

              <FileUploader 
                isUploading={isUploading}
                onFileSelect={handleFileSelect}
              />

              <FileSummary
                parsedResults={parsedResults}
                examTitle={examTitle}
                examDate={examDate}
                verificationChecked={verificationChecked}
                onVerificationChange={setVerificationChecked}
                onUpload={handleUpload}
                isUploading={isUploading}
              />

              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Make sure your CSV file follows the required format. All fields are required and must match the specified data types.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AddResult;
