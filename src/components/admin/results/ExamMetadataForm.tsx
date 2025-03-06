
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ExamMetadataFormProps {
  examTitle: string;
  examDate: string;
  onExamTitleChange: (value: string) => void;
  onExamDateChange: (value: string) => void;
  isUploading: boolean;
}

const ExamMetadataForm = ({
  examTitle,
  examDate,
  onExamTitleChange,
  onExamDateChange,
  isUploading
}: ExamMetadataFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="exam-title">Exam Title (Optional)</Label>
        <Input
          id="exam-title"
          type="text"
          placeholder="e.g. Midterm Physics 2023"
          value={examTitle}
          onChange={(e) => onExamTitleChange(e.target.value)}
          disabled={isUploading}
        />
        <p className="text-xs text-gray-500">
          A descriptive title for this exam
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="exam-date">Exam Date</Label>
        <Input
          id="exam-date"
          type="date"
          value={examDate}
          onChange={(e) => onExamDateChange(e.target.value)}
          disabled={isUploading}
        />
        <p className="text-xs text-gray-500">
          The date when the exam was conducted
        </p>
      </div>
    </>
  );
};

export default ExamMetadataForm;
