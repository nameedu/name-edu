
import { useState } from "react";
import { Search, FileText, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";

interface StudentResult {
  candidateId: string;
  name: string;
  rank: string;
  totalMarks: number;
  physics: number;
  chemistry: number;
  biology: number;
  examYear: string;
}

const Results = () => {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Simulated results data (in real app, this would come from a CSV file or API)
  const resultsData: StudentResult[] = [
    {
      candidateId: "MED2023001",
      name: "John Doe",
      rank: "1",
      totalMarks: 650,
      physics: 95,
      chemistry: 90,
      biology: 98,
      examYear: "2023"
    },
    {
      candidateId: "MED2023002",
      name: "Jane Smith",
      rank: "2",
      totalMarks: 645,
      physics: 92,
      chemistry: 93,
      biology: 95,
      examYear: "2023"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call delay
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
            Enter your Candidate ID to view your medical entrance examination results
          </p>

          {/* Search Form */}
          <Card className="max-w-2xl mx-auto mb-12 p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Candidate ID (e.g., MED2023001)"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
                <Button 
                  type="submit" 
                  disabled={!searchId || isSearching}
                  className="min-w-[120px]"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
              <p className="text-sm text-neutral-500">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                Your Candidate ID can be found on your admit card
              </p>
            </form>
          </Card>

          {/* Result Display */}
          {result && (
            <Card className="max-w-2xl mx-auto p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{result.name}</h2>
                  <p className="text-neutral-600">Candidate ID: {result.candidateId}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary mb-1">Rank {result.rank}</div>
                  <p className="text-neutral-600">Year {result.examYear}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Subject-wise Marks</h3>
                  <div className="space-y-3">
                    {[
                      { subject: "Physics", marks: result.physics },
                      { subject: "Chemistry", marks: result.chemistry },
                      { subject: "Biology", marks: result.biology }
                    ].map((subject) => (
                      <div key={subject.subject} className="flex items-center justify-between">
                        <span className="text-neutral-600">{subject.subject}</span>
                        <span className="font-medium">{subject.marks}/100</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Total Score</h3>
                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {result.totalMarks}
                    </div>
                    <div className="text-neutral-600">out of 700</div>
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
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Top Performers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {resultsData.slice(0, 3).map((topper, index) => (
                <Card key={index} className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">#{topper.rank}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{topper.name}</h3>
                    <p className="text-neutral-600">Total Score: {topper.totalMarks}/700</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
