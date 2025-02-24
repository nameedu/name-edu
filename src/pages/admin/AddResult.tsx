
import { useState, useEffect } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

interface StudentResult {
  candidate_id: string;
  exam_id: string;
  exam_mark: number;
  exam_rank: string;
  percentage: number;
}

const AddResult = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [verificationChecked, setVerificationChecked] = useState(false);
  const [parsedResults, setParsedResults] = useState<StudentResult[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const parseCSV = async (file: File): Promise<StudentResult[]> => {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Validate CSV structure
    const requiredHeaders = ['Candidate ID', 'Exam ID', 'Exam Mark', 'Exam Rank', 'Percentage'];
    const hasValidHeaders = requiredHeaders.every(header => 
      headers.includes(header)
    );

    if (!hasValidHeaders) {
      throw new Error('Invalid CSV format. Please ensure the CSV file has the correct headers: Candidate ID, Exam ID, Exam Mark, Exam Rank, Percentage');
    }

    return lines.slice(1)
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
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Validate file type
      if (!file.name.endsWith('.csv')) {
        throw new Error('Please upload a CSV file');
      }

      const results = await parseCSV(file);
      setParsedResults(results);
      setSelectedFile(file);
      setVerificationChecked(false); // Reset verification when new file is selected
    } catch (error: any) {
      toast({
        title: "Error parsing file",
        description: error.message,
        variant: "destructive"
      });
      setParsedResults([]);
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !verificationChecked || isUploading) return;

    setIsUploading(true);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('exam_results')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Insert file metadata
      const { data: fileData, error: fileError } = await supabase
        .from('exam_result_files')
        .insert({
          filename: selectedFile.name,
          file_path: filePath,
          exam_id: parsedResults[0].exam_id,
          exam_date: new Date().toISOString(),
          total_results: parsedResults.length
        })
        .select()
        .single();

      if (fileError) throw fileError;

      // Insert results with file reference
      const { error: resultsError } = await supabase
        .from('exam_results')
        .insert(
          parsedResults.map(r => ({
            ...r,
            file_id: fileData.id
          }))
        );

      if (resultsError) throw resultsError;

      toast({
        title: "Success",
        description: `Uploaded ${parsedResults.length} results successfully`,
      });

      // Reset form
      setSelectedFile(null);
      setParsedResults([]);
      setVerificationChecked(false);
      
      if (event.target) {
        event.target.value = '';
      }

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

            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-gray-50">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csv-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="csv-upload"
                className={`flex flex-col items-center justify-center cursor-pointer ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <span className="text-sm font-medium">
                  {selectedFile ? selectedFile.name : 'Click to upload CSV file'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  CSV files only
                </span>
              </label>
            </div>

            {parsedResults.length > 0 && (
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm font-medium">File Summary:</p>
                  <ul className="mt-2 text-sm">
                    <li>Total Results: {parsedResults.length}</li>
                    <li>Exam ID: {parsedResults[0].exam_id}</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verification"
                    checked={verificationChecked}
                    onCheckedChange={(checked) => setVerificationChecked(checked === true)}
                  />
                  <label
                    htmlFor="verification"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have verified that the data in this file is correct and ready to be uploaded
                  </label>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={!verificationChecked || isUploading}
                  className="w-full"
                >
                  {isUploading ? "Uploading..." : "Upload Results"}
                </Button>
              </div>
            )}

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
  );
};

export default AddResult;
