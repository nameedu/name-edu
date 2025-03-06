
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StudentResult } from "@/types/exam";

interface FileSummaryProps {
  parsedResults: StudentResult[];
  examTitle: string;
  examDate: string;
  verificationChecked: boolean;
  onVerificationChange: (checked: boolean) => void;
  onUpload: () => void;
  isUploading: boolean;
}

const FileSummary = ({
  parsedResults,
  examTitle,
  examDate,
  verificationChecked,
  onVerificationChange,
  onUpload,
  isUploading
}: FileSummaryProps) => {
  if (parsedResults.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 p-4 rounded-lg">
        <p className="text-sm font-medium">File Summary:</p>
        <ul className="mt-2 text-sm">
          <li>Total Results: {parsedResults.length}</li>
          <li>Exam ID: {parsedResults[0].exam_id}</li>
          {examTitle && <li>Exam Title: {examTitle}</li>}
          {examDate && <li>Exam Date: {format(new Date(examDate), "PPP")}</li>}
        </ul>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="verification"
          checked={verificationChecked}
          onCheckedChange={(checked) => onVerificationChange(checked === true)}
        />
        <label
          htmlFor="verification"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have verified that the data in this file is correct and ready to be uploaded
        </label>
      </div>

      <Button
        onClick={onUpload}
        disabled={!verificationChecked || isUploading}
        className="w-full"
      >
        {isUploading ? "Uploading..." : "Upload Results"}
      </Button>
    </div>
  );
};

export default FileSummary;
