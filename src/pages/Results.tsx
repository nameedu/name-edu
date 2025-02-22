
import { useState } from "react";
import { Search, FileText, AlertCircle, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";

interface StudentResult {
  candidateId: string;
  examId: string;
  examMark: number;
  examRank: string;
  percentage: number;
}

const Results = () => {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [resultsData, setResultsData] = useState<StudentResult[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        // Validate CSV structure
        const requiredHeaders = ['Candidate ID', 'Exam ID', 'Exam Mark', 'Exam Rank', 'Percentage'];
        const hasValidHeaders = requiredHeaders.every(header => 
          headers.includes(header)
        );

        if (!hasValidHeaders) {
          toast({
            title: "Invalid CSV Format",
            description: "Please ensure the CSV file has the correct headers: Candidate ID, Exam ID, Exam Mark, Exam Rank, and Percentage",
            variant: "destructive"
          });
          return;
        }

        // Process CSV data
        const results: StudentResult[] = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const [candidateId, examId, examMark, examRank, percentage] = line.split(',').map(value => value.trim());
            return {
              candidateId,
              examId,
              examMark: Number(examMark),
              examRank,
              percentage: Number(percentage)
            };
          });

        setResultsData(results);
        toast({
          title: "CSV File Uploaded",
          description: `Successfully loaded ${results.length} results`,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      const foundResult = resultsData.find(r => r.candidateId === searchId);
      
      if (foundResult) {
        setResult(foundResult);
      } else {
        toast({
          title: "No Results Found",
          description: "Please check the Candidate ID and try again.",
          variant: "destructive"
        });
        setResult(null);
      }
      setIsSearching(false);
    }, 500);
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Exam Results</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Upload results CSV file and search using Candidate ID
          </p>

          {/* CSV Upload */}
          <Card className="max-w-2xl mx-auto mb-8 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload Results</h3>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <span>Choose CSV file</span>
                </label>
                <div className="text-sm text-neutral-600">
                  {resultsData.length > 0 ? `${resultsData.length} results loaded` : "No file uploaded"}
                </div>
              </div>
            </div>
          </Card>

          {/* Search Form */}
          <Card className="max-w-2xl mx-auto mb-12 p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Candidate ID"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
                <Button 
                  type="submit" 
                  disabled={!searchId || isSearching || resultsData.length === 0}
                  className="min-w-[120px]"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
              <p className="text-sm text-neutral-500">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                Upload a CSV file first, then search using Candidate ID
              </p>
            </form>
          </Card>

          {/* Result Display */}
          {result && (
            <Card className="max-w-2xl mx-auto p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Result Details</h2>
                  <p className="text-neutral-600">Candidate ID: {result.candidateId}</p>
                  <p className="text-neutral-600">Exam ID: {result.examId}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary mb-1">Rank {result.examRank}</div>
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

              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Result PDF
                </Button>
              </div>
            </Card>
          )}

          {/* Top Performers Section */}
          {resultsData.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Top Performers</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {resultsData
                  .sort((a, b) => b.percentage - a.percentage)
                  .slice(0, 3)
                  .map((topper, index) => (
                    <Card key={index} className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                        </div>
                        <h3 className="text-xl font-semibold">Candidate ID: {topper.candidateId}</h3>
                        <p className="text-neutral-600">Score: {topper.percentage}%</p>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Results;
