
import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StudentResult {
  candidateId: string;
  examId: string;
  examMark: number;
  examRank: string;
  percentage: number;
}

const Results = () => {
  const [searchId, setSearchId] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [resultsData, setResultsData] = useState<StudentResult[]>([]);
  const [examOptions, setExamOptions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchExamOptions();
  }, []);

  const fetchExamOptions = async () => {
    const { data, error } = await supabase
      .from('exam_result_files')
      .select('exam_id')
      .order('exam_date', { ascending: false });

    if (error) {
      console.error('Error fetching exam options:', error);
      return;
    }

    const uniqueExamIds = Array.from(new Set(data.map(d => d.exam_id)));
    setExamOptions(uniqueExamIds);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResult(null);

    try {
      const query = supabase
        .from('exam_results')
        .select('*')
        .eq('candidate_id', searchId);

      if (selectedExam) {
        query.eq('exam_id', selectedExam);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data && data.length > 0) {
        const foundResult = {
          candidateId: data[0].candidate_id,
          examId: data[0].exam_id,
          examMark: data[0].exam_mark,
          examRank: data[0].exam_rank,
          percentage: data[0].percentage
        };
        setResult(foundResult);
      } else {
        toast({
          title: "No Results Found",
          description: "Please check your Candidate ID and try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Exam Results</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Enter your Candidate ID to view your results
          </p>

          <Card className="max-w-2xl mx-auto mb-12 p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="candidateId" className="block text-sm font-medium mb-2">
                    Candidate ID
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      id="candidateId"
                      type="text"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      placeholder="Enter your Candidate ID"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="examId" className="block text-sm font-medium mb-2">
                    Select Exam (Optional)
                  </label>
                  <select
                    id="examId"
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  >
                    <option value="">All Exams</option>
                    {examOptions.map((examId) => (
                      <option key={examId} value={examId}>
                        {examId}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search Results"}
              </Button>
            </form>
          </Card>

          {result && (
            <Card className="max-w-2xl mx-auto p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Result Details</h2>
                  <p className="text-neutral-600">Candidate ID: {result.candidateId}</p>
                  <p className="text-neutral-600">Exam ID: {result.examId}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary mb-1">Rank: {result.examRank}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Exam Score</h3>
                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {result.examMark}
                    </div>
                    <div className="text-neutral-600">Marks</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Percentage</h3>
                  <div className={`rounded-lg p-4 text-center ${
                    result.percentage >= 50 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <div className={`text-3xl font-bold mb-1 ${
                      result.percentage >= 50 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.percentage}%
                    </div>
                    <div className="text-neutral-600">
                      {result.percentage >= 50 ? 'Passed' : 'Failed'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Results;
