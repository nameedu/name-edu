
export interface ExamFile {
  id: string;
  filename: string;
  exam_id: string;
  exam_date: string;
  uploaded_at: string;
  total_results: number;
  file_path: string;
  uploaded_by?: string;
}

export interface StudentResult {
  candidate_id: string;
  exam_id: string;
  exam_mark: number;
  exam_rank: string;
  percentage: number;
}
