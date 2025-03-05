
import { useState } from "react";
import { Search, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface StudentResult {
  candidateId: string;
  examId: string;
  examMark: number;
  examRank: string;
  percentage: number;
}

interface ExamInfo {
  examId: string;
  examTitle?: string;
  examDate?: string;
}

const Results = () => {
  const [searchId, setSearchId] = useState("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [examInfo, setExamInfo] = useState<ExamInfo | null>(null);
  const { toast } = useToast();

  // Fetch exam options
  const { data: examOptions } = useQuery({
    queryKey: ["examOptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exam_result_files')
        .select('exam_id, filename, exam_date')
        .order('exam_date', { ascending: false });

      if (error) throw error;
      
      // Create a map to store unique exam IDs with their titles
      const examsMap = new Map();
      
      data.forEach(item => {
        if (!examsMap.has(item.exam_id)) {
          const titleMatch = item.filename.match(/^(.*?) - /);
          examsMap.set(item.exam_id, {
            examId: item.exam_id,
            examTitle: titleMatch ? titleMatch[1] : undefined,
            examDate: item.exam_date
          });
        }
      });
      
      return Array.from(examsMap.values());
    }
  });

  // Fetch top performers when an exam is selected
  const { data: topPerformers } = useQuery({
    queryKey: ["topPerformers", selectedExam],
    enabled: !!selectedExam,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('exam_id', selectedExam)
        .order('percentage', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam) {
      toast({
        title: "Error",
        description: "Please select an exam first",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('candidate_id', searchId)
        .eq('exam_id', selectedExam)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const foundResult = {
          candidateId: data.candidate_id,
          examId: data.exam_id,
          examMark: data.exam_mark,
          examRank: data.exam_rank,
          percentage: data.percentage
        };
        setResult(foundResult);
        
        if (examOptions) {
          const selectedExamInfo = examOptions.find(exam => exam.examId === selectedExam);
          if (selectedExamInfo) {
            setExamInfo(selectedExamInfo);
          }
        }
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
            Select an exam and enter your Candidate ID to view your results
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="p-6">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-4 ">
                    <div>
                      <label htmlFor="examId" className="block text-sm font-medium mb-2 ">
                        Select Exam
                      </label>
                      <Select
                        value={selectedExam}
                        onValueChange={(value) => {
                          setSelectedExam(value);
                          const selected = examOptions?.find(exam => exam.examId === value);
                          if (selected) {
                            setExamInfo(selected);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an exam" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg z-50">
                          {examOptions?.map((exam) => (
                            <SelectItem key={exam.examId} value={exam.examId} className="hover:bg-gray-100 px-4 py-2">
                              {exam.examTitle ? `${exam.examTitle} (${exam.examId})` : exam.examId}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

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
                  </div>

                  <Button type="submit" className="w-full" disabled={isSearching || !selectedExam}>
                    {isSearching ? "Searching..." : "Search Results"}
                  </Button>
                </form>
              </Card>

              {result && (
                <Card className="p-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Result Details</h2>
                      <p className="text-neutral-600">Candidate ID: {result.candidateId}</p>
                      <p className="text-neutral-600">
                        {examInfo?.examTitle ? examInfo.examTitle : `Exam ID: ${result.examId}`}
                        {examInfo?.examDate && ` (${new Date(examInfo.examDate).toLocaleDateString()})`}
                      </p>
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

            {selectedExam && (
              <div>
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-xl font-bold">Top Performers</h2>
                    {examInfo?.examTitle && <span className="text-sm text-neutral-600 ml-2">({examInfo.examTitle})</span>}
                  </div>
                  
                  <div className="space-y-4">
                    {topPerformers?.map((performer, index) => (
                      <div
                        key={performer.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium
                            ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                              index === 1 ? 'bg-neutral-200 text-neutral-700' :
                              index === 2 ? 'bg-orange-100 text-orange-700' :
                              'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">Candidate {performer.candidate_id}</div>
                            <div className="text-sm text-neutral-500">Rank: {performer.exam_rank}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{performer.percentage}%</div>
                          <div className="text-sm text-neutral-500">{performer.exam_mark} marks</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
