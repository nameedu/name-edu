
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";

interface Result {
  id: string;
  name: string;
  roll_number: string;
  course: string;
  marks: number;
  created_at: string;
}

const ListResult = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "List Results | Admin Dashboard";
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      // Get results from the exam_results table instead of a non-existent "results" table
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching results:', error);
        toast({
          title: "Error fetching results",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Transform exam_results data into the Result interface format
      const formattedResults = data?.map(item => ({
        id: item.id,
        name: `Candidate ${item.candidate_id}`, // Using candidate_id as name
        roll_number: item.candidate_id,
        course: item.exam_id,
        marks: Number(item.exam_mark),
        created_at: item.created_at || ''
      })) || [];

      setResults(formattedResults);
    } catch (error) {
      console.error('Unexpected error fetching results:', error);
      toast({
        title: "Unexpected error",
        description: 'An unexpected error occurred while fetching results.',
        variant: "destructive",
      });
    }
  };

  const deleteResult = async (id: string) => {
    setIsDeleting(true);
    try {
      // Delete from exam_results instead of "results"
      const { error } = await supabase
        .from('exam_results')
        .delete()
        .eq('id', id);
    
      if (error) {
        throw error;
      }
    
      toast({
        title: "Result deleted successfully",
        description: "The result has been removed from the database.",
      });
    
      // Refresh results after deletion
      fetchResults();
    } catch (error) {
      console.error('Error deleting result:', error);
      toast({
        title: "Error deleting result",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredResults = results.filter(result =>
    result.name.toLowerCase().includes(search.toLowerCase()) ||
    result.roll_number.toLowerCase().includes(search.toLowerCase()) ||
    result.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container max-w-7xl py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Results</h1>
          <Input
            type="search"
            placeholder="Search by name, roll number, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="mt-4">
          <Table>
            <TableCaption>A list of recently added Results.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.name}</TableCell>
                  <TableCell>{result.roll_number}</TableCell>
                  <TableCell>{result.course}</TableCell>
                  <TableCell>{result.marks}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete result from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input type="text" id="name" value={result.name} className="col-span-3" disabled />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="roll_number" className="text-right">
                              Roll No.
                            </Label>
                            <Input type="text" id="roll_number" value={result.roll_number} className="col-span-3" disabled />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="course" className="text-right">
                              Course
                            </Label>
                            <Input type="text" id="course" value={result.course} className="col-span-3" disabled />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="secondary" onClick={() => {
                            const dialog = document.querySelector('[data-state="open"]');
                            if (dialog) {
                              (dialog as HTMLDialogElement).close();
                            }
                          }}>Cancel</Button>
                          <Button type="submit" variant="destructive" onClick={() => deleteResult(result.id)} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListResult;
