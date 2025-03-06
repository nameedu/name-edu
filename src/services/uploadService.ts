
import { supabase } from "@/integrations/supabase/client";
import { StudentResult } from "@/types/exam";

export const uploadExamResults = async (
  selectedFile: File,
  parsedResults: StudentResult[],
  examTitle: string,
  examDate: string
) => {
  // Get current user session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('You must be logged in to upload results');
  }
  
  const userId = session.user.id;
  const fileExt = selectedFile.name.split('.').pop();
  const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('exam_results')
    .upload(filePath, selectedFile);

  if (uploadError) throw uploadError;

  // Create a filename with the title if provided
  const displayFilename = examTitle ? 
    `${examTitle} - ${selectedFile.name}` : 
    selectedFile.name;

  const { data: fileData, error: fileError } = await supabase
    .from('exam_result_files')
    .insert({
      filename: displayFilename,
      file_path: filePath,
      exam_id: parsedResults[0].exam_id,
      exam_date: examDate || new Date().toISOString().split('T')[0],
      total_results: parsedResults.length,
      uploaded_by: userId // Set the user ID who uploaded the file
    })
    .select()
    .single();

  if (fileError) throw fileError;

  const { error: resultsError } = await supabase
    .from('exam_results')
    .insert(
      parsedResults.map(r => ({
        ...r,
        file_id: fileData.id
      }))
    );

  if (resultsError) throw resultsError;

  return {
    fileData,
    resultsCount: parsedResults.length
  };
};
