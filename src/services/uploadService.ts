
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
  // Ensure the file path starts with the user ID to comply with our RLS policy
  const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;
  
  console.log('Uploading file to path:', filePath);
  const { error: uploadError } = await supabase.storage
    .from('exam_results')
    .upload(filePath, selectedFile);

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw uploadError;
  }

  // Create a filename with the title if provided
  const displayFilename = examTitle ? 
    `${examTitle} - ${selectedFile.name}` : 
    selectedFile.name;

  console.log('Creating exam_result_files record');
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

  if (fileError) {
    console.error('File record error:', fileError);
    throw fileError;
  }

  console.log('Inserting exam results');
  const { error: resultsError } = await supabase
    .from('exam_results')
    .insert(
      parsedResults.map(r => ({
        ...r,
        file_id: fileData.id
      }))
    );

  if (resultsError) {
    console.error('Results insert error:', resultsError);
    throw resultsError;
  }

  return {
    fileData,
    resultsCount: parsedResults.length
  };
};
