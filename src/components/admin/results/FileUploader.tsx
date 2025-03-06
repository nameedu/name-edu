
import { useState } from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  isUploading: boolean;
  onFileSelect: (results: any[], file: File) => void;
}

const FileUploader = ({ isUploading, onFileSelect }: FileUploaderProps) => {
  const { toast } = useToast();

  const parseCSV = async (file: File) => {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
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
      if (!file.name.endsWith('.csv')) {
        throw new Error('Please upload a CSV file');
      }

      const results = await parseCSV(file);
      onFileSelect(results, file);
    } catch (error: any) {
      toast({
        title: "Error parsing file",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
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
          Click to upload CSV file
        </span>
        <span className="text-xs text-gray-500 mt-1">
          CSV files only
        </span>
      </label>
    </div>
  );
};

export default FileUploader;
