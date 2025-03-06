
import { FileText, Calendar, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ExamFile } from "@/types/exam";

interface ResultCardProps {
  file: ExamFile;
  isDeletingFile: string | null;
  onDelete: (fileId: string, filePath: string) => void;
}

const ResultCard = ({ file, isDeletingFile, onDelete }: ResultCardProps) => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
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
                {file.exam_date ? format(new Date(file.exam_date), 'PP') : "N/A"}
              </span>
              <span className="flex items-center gap-1">
                Uploaded: {format(new Date(file.uploaded_at), 'PPp')}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
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
            onClick={() => onDelete(file.id, file.file_path)}
            disabled={isDeletingFile === file.id}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeletingFile === file.id ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;
