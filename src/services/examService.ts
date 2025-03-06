
import { supabase } from "@/integrations/supabase/client";
import { ExamFile } from "@/types/exam";
import { useToast } from "@/components/ui/use-toast";

export const fetchExamFiles = async () => {
  try {
    // Get the user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("You must be logged in to view results");
    }
    
    const { data, error } = await supabase
      .from('exam_result_files')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Failed to fetch exam files" };
  }
};

export const deleteExamFile = async (fileId: string, filePath: string) => {
  try {
    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('You must be logged in to delete results');
    }
    
    // First delete all results associated with this file
    console.log('Deleting exam results...');
    const { error: resultsError } = await supabase
      .from('exam_results')
      .delete()
      .eq('file_id', fileId);

    if (resultsError) {
      console.error('Error deleting results:', resultsError);
      throw new Error(`Failed to delete results: ${resultsError.message || 'Unknown error'}`);
    }

    // Then delete the file record
    console.log('Deleting file record...');
    const { error: fileError } = await supabase
      .from('exam_result_files')
      .delete()
      .eq('id', fileId);

    if (fileError) {
      console.error('Error deleting file record:', fileError);
      throw new Error(`Failed to delete file record: ${fileError.message || 'Unknown error'}`);
    }

    // Finally delete the file from storage
    console.log('Deleting file from storage...');
    const { error: storageError } = await supabase.storage
      .from('exam_results')
      .remove([filePath]);

    if (storageError) {
      console.error('Error deleting from storage:', storageError);
      return { 
        success: true, 
        warning: `The file record was deleted but the actual file could not be removed from storage: ${storageError.message || 'Unknown error'}` 
      };
    }

    return { success: true, warning: null };
  } catch (error: any) {
    console.error('Deletion process failed:', error);
    return { 
      success: false, 
      error: error.message || "An unknown error occurred" 
    };
  }
};
