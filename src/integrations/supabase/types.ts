export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assignments: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          due_date: string | null
          file_path: string | null
          id: string
          subject: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          due_date?: string | null
          file_path?: string | null
          id?: string
          subject: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          due_date?: string | null
          file_path?: string | null
          id?: string
          subject?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exam_result_files: {
        Row: {
          exam_date: string
          exam_id: string
          file_path: string
          filename: string
          id: string
          total_results: number | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          exam_date: string
          exam_id: string
          file_path: string
          filename: string
          id?: string
          total_results?: number | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          exam_date?: string
          exam_id?: string
          file_path?: string
          filename?: string
          id?: string
          total_results?: number | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      exam_results: {
        Row: {
          candidate_id: string
          created_at: string | null
          exam_id: string
          exam_mark: number
          exam_rank: string
          file_id: string | null
          id: string
          percentage: number
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          exam_id: string
          exam_mark: number
          exam_rank: string
          file_id?: string | null
          id?: string
          percentage: number
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          exam_id?: string
          exam_mark?: number
          exam_rank?: string
          file_id?: string | null
          id?: string
          percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_results_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "exam_result_files"
            referencedColumns: ["id"]
          },
        ]
      }
      notice_attachments: {
        Row: {
          created_at: string | null
          file_path: string
          file_type: string
          id: string
          notice_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          file_type: string
          id?: string
          notice_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          file_type?: string
          id?: string
          notice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notice_attachments_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: false
            referencedRelation: "notices"
            referencedColumns: ["id"]
          },
        ]
      }
      notices: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          is_active: boolean | null
          link: string | null
          published_at: string | null
          title: string
          type: Database["public"]["Enums"]["notice_type"]
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          link?: string | null
          published_at?: string | null
          title: string
          type?: Database["public"]["Enums"]["notice_type"]
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          link?: string | null
          published_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notice_type"]
        }
        Relationships: []
      }
      previous_papers: {
        Row: {
          created_at: string
          created_by: string | null
          file_path: string
          id: string
          paper_type: string
          subject: string
          title: string
          updated_at: string | null
          year: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_path: string
          id?: string
          paper_type: string
          subject: string
          title: string
          updated_at?: string | null
          year: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_path?: string
          id?: string
          paper_type?: string
          subject?: string
          title?: string
          updated_at?: string | null
          year?: string
        }
        Relationships: []
      }
      question_bank: {
        Row: {
          answer_text: string | null
          created_at: string
          created_by: string | null
          difficulty: string
          file_path: string | null
          id: string
          question_text: string
          subject: string
          title: string
          updated_at: string | null
        }
        Insert: {
          answer_text?: string | null
          created_at?: string
          created_by?: string | null
          difficulty: string
          file_path?: string | null
          id?: string
          question_text: string
          subject: string
          title: string
          updated_at?: string | null
        }
        Update: {
          answer_text?: string | null
          created_at?: string
          created_by?: string | null
          difficulty?: string
          file_path?: string | null
          id?: string
          question_text?: string
          subject?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          file_path: string | null
          id: string
          material_type: string
          subject: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          file_path?: string | null
          id?: string
          material_type: string
          subject: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          file_path?: string | null
          id?: string
          material_type?: string
          subject?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      syllabus: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          file_path: string | null
          id: string
          subject: string
          title: string
          units: string[]
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          file_path?: string | null
          id?: string
          subject: string
          title: string
          units: string[]
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          file_path?: string | null
          id?: string
          subject?: string
          title?: string
          units?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_uuid: string
        }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      notice_type: "urgent" | "normal"
      user_role: "admin" | "student" | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
