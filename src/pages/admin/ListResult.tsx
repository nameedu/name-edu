
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Search, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const ListResult = () => {
  const [selectedExam, setSelectedExam] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    data: results = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["results", selectedExam, searchTerm],
    queryFn: async () => {
      let query = supabase.from("results").select("*");
      
      if (selectedExam) {
        query = query.eq("exam_name", selectedExam);
      }
      
      if (searchTerm) {
        query = query.ilike("student_name", `%${searchTerm}%`);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) {
        throw new Error(error.message || "Failed to fetch results");
      }
      
      return data;
    },
    enabled: true,
  });

  const { data: examTypes = [] } = useQuery({
    queryKey: ["examTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("results")
        .select("exam_name")
        .order("exam_name");
      
      if (error) {
        throw new Error(error.message || "Failed to fetch exam types");
      }
      
      return Array.from(new Set(data.map(item => item.exam_name)));
    },
  });

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from("results")
        .delete()
        .eq("id", deleteId);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Result deleted",
        description: "The result has been permanently removed.",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete the result.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/results/edit/${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-8">Manage Results</h1>
        
        {isError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load results. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Exams</SelectItem>
                {examTypes.map((exam) => (
                  <SelectItem key={exam} value={exam}>
                    {exam}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search student name..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Button onClick={() => navigate("/admin/results/add")}>
            Add New Result
          </Button>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <div>Loading results...</div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No results found. Please adjust your filters or add a new result.
                  </TableCell>
                </TableRow>
              ) : (
                results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.student_name}</TableCell>
                    <TableCell>{result.exam_name}</TableCell>
                    <TableCell>{result.roll_number}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>{result.grade}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(result.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeleteId(result.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this result? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ListResult;
