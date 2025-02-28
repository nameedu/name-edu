
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Download, Trash2, Plus, File, RefreshCw } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExamResultFile {
  id: string;
  exam_id: string;
  file_path: string;
  exam_date: string;
  created_at: string;
}

const ListResult = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: results, isLoading } = useQuery({
    queryKey: ["resultFiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exam_result_files")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ExamResultFile[];
    },
  });

  const deleteResultMutation = useMutation({
    mutationFn: async (id: string) => {
      // First get the file path
      const { data: fileData, error: fetchError } = await supabase
        .from("exam_result_files")
        .select("file_path")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      if (fileData?.file_path) {
        const { error: storageError } = await supabase.storage
          .from("exam-results")
          .remove([fileData.file_path]);

        if (storageError) throw storageError;
      }

      // Delete record
      const { error: deleteError } = await supabase
        .from("exam_result_files")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resultFiles"] });
      toast({
        title: "Success",
        description: "Result file deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete result file",
        variant: "destructive",
      });
    },
  });

  const refreshResultsMutation = useMutation({
    mutationFn: async (examId: string) => {
      const { error } = await supabase.functions.invoke("process-results", {
        body: { examId },
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resultFiles"] });
      toast({
        title: "Success",
        description: "Results processed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process results",
        variant: "destructive",
      });
    },
  });

  const filteredResults = results?.filter((result) =>
    result.exam_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Manage Results</h1>
            <Button asChild>
              <Link to="/admin/results/add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Result
              </Link>
            </Button>
          </div>

          <div className="mb-6 w-full md:w-1/3">
            <Input
              type="search"
              placeholder="Search by exam ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Exam ID</TableHead>
                    <TableHead>Exam Date</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults?.length ? (
                    filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">
                          {result.exam_id}
                        </TableCell>
                        <TableCell>
                          {new Date(result.exam_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-neutral-500" />
                            <span className="text-sm truncate max-w-[200px]">
                              {result.file_path.split("/").pop()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a
                                href={
                                  supabase.storage
                                    .from("exam-results")
                                    .getPublicUrl(result.file_path).data
                                    .publicUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                  Download
                                </span>
                              </a>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                refreshResultsMutation.mutate(result.exam_id)
                              }
                              className="flex items-center gap-1"
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span className="hidden sm:inline">Process</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 flex items-center gap-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="hidden sm:inline">
                                    Delete
                                  </span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete the result file
                                    and all associated student results. This
                                    action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      deleteResultMutation.mutate(result.id)
                                    }
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-24 text-center"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default ListResult;
