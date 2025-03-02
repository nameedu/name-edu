
import { supabase } from '@/integrations/supabase/client';
import type { 
  StudyMaterial, 
  QuestionBankItem, 
  Assignment, 
  SyllabusItem, 
  PreviousPaper 
} from '@/types/studentZone';

// Helper function to access study materials with proper typing
export const studyMaterialsTable = {
  async getAll() {
    const { data, error } = await supabase
      .from('study_materials')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data: data as StudyMaterial[] | null, error };
  },
  
  async getById(id: string) {
    const { data, error } = await supabase
      .from('study_materials')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data: data as StudyMaterial | null, error };
  },
  
  async create(material: Omit<StudyMaterial, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('study_materials')
      .insert(material)
      .select()
      .single();
    
    return { data: data as StudyMaterial | null, error };
  },
  
  async update(id: string, updates: Partial<Omit<StudyMaterial, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('study_materials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data: data as StudyMaterial | null, error };
  },
  
  async delete(id: string) {
    const { error } = await supabase
      .from('study_materials')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

// Helper function to access previous papers with proper typing
export const previousPapersTable = {
  async getAll() {
    const { data, error } = await supabase
      .from('previous_papers')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data: data as PreviousPaper[] | null, error };
  },
  
  async getById(id: string) {
    const { data, error } = await supabase
      .from('previous_papers')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data: data as PreviousPaper | null, error };
  },
  
  async create(paper: Omit<PreviousPaper, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('previous_papers')
      .insert(paper)
      .select()
      .single();
    
    return { data: data as PreviousPaper | null, error };
  },
  
  async update(id: string, updates: Partial<Omit<PreviousPaper, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('previous_papers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data: data as PreviousPaper | null, error };
  },
  
  async delete(id: string) {
    const { error } = await supabase
      .from('previous_papers')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

// Add similar helper functions for question_bank, assignments, and syllabus tables
export const questionBankTable = {
  // Similar methods as above for question_bank
  // ...
};

export const assignmentsTable = {
  // Similar methods as above for assignments
  // ...
};

export const syllabusTable = {
  // Similar methods as above for syllabus
  // ...
};
