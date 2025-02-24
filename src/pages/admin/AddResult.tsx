
import { useState, useEffect } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StudentResult {
  candidateId: string;
  examId: string;
  examMark: number;
  examRank: string;
  percentage: number;
}

const AddResult = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Validate file type
      if (!file.name.endsWith('.csv')) {
        throw new Error('Please upload a CSV file');
      }

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
        throw new Error('Invalid CSV format. Please ensure the CSV file has the correct headers: Candidate ID, Exam ID, Exam Mark, Exam Rank, Percentage');
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

      // Reset file input
      event.target.value = '';

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
                onChange={handleFileUpload}
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
                  {isUploading ? 'Uploading...' : 'Click to upload CSV file'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  CSV files only
                </span>
              </label>
            </div>

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
