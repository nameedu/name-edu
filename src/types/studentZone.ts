
export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  subject: string;
  material_type: string;
  file_path: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string | null;
}

export interface QuestionBankItem {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  question_text: string;
  answer_text: string | null;
  file_path: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string | null;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  due_date: string | null;
  file_path: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string | null;
}

export interface SyllabusItem {
  id: string;
  title: string;
  subject: string;
  code: string;
  units: string[];
  file_path: string | null;
  created_at: string;
  created_by: string | null;
  updated_at: string | null;
}

export interface PreviousPaper {
  id: string;
  title: string;
  paper_type: string;
  subject: string;
  year: string;
  file_path: string;
  created_at: string;
  created_by: string | null;
  updated_at: string | null;
}
