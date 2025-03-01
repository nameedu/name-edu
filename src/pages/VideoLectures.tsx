import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample video lecture data
const videoLectures = [
  {
    id: 1,
    title: "Introduction to Anatomy",
    subject: "Anatomy",
    thumbnail: "https://placehold.co/600x400/667fff/ffffff.png?text=Anatomy",
    videoUrl: "https://www.youtube.com/embed/Ie4y-huLJuU",
    instructor: "Dr. Sarah Johnson",
    duration: "45 minutes",
    views: 1250,
  },
  {
    id: 2,
    title: "Pharmacology Basics",
    subject: "Pharmacology",
    thumbnail: "https://placehold.co/600x400/ff6666/ffffff.png?text=Pharmacology",
    videoUrl: "https://www.youtube.com/embed/F-qbg5zApI4",
    instructor: "Dr. Michael Chen",
    duration: "38 minutes",
    views: 980,
  },
  {
    id: 3,
    title: "Biochemistry - The Cell",
    subject: "Biochemistry",
    thumbnail: "https://placehold.co/600x400/66ff99/ffffff.png?text=Biochemistry",
    videoUrl: "https://www.youtube.com/embed/rPA0Utc6E9w",
    instructor: "Dr. Emily White",
    duration: "52 minutes",
    views: 1520,
  },
  {
    id: 4,
    title: "Physiology of the Heart",
    subject: "Physiology",
    thumbnail: "https://placehold.co/600x400/ff66cc/ffffff.png?text=Physiology",
    videoUrl: "https://www.youtube.com/embed/jGWu6PAmG9M",
    instructor: "Dr. David Lee",
    duration: "41 minutes",
    views: 1100,
  },
  {
    id: 5,
    title: "Microbiology - Bacteria",
    subject: "Microbiology",
    thumbnail: "https://placehold.co/600x400/cc66ff/ffffff.png?text=Microbiology",
    videoUrl: "https://www.youtube.com/embed/4CW4wnpwPEw",
    instructor: "Dr. Karen Brown",
    duration: "48 minutes",
    views: 1380,
  },
  {
    id: 6,
    title: "Pathology - Inflammation",
    subject: "Pathology",
    thumbnail: "https://placehold.co/600x400/ffcc66/ffffff.png?text=Pathology",
    videoUrl: "https://www.youtube.com/embed/Vn1JYN4-4WQ",
    instructor: "Dr. Thomas Green",
    duration: "35 minutes",
    views: 890,
  },
  {
    id: 7,
    title: "Surgical Techniques",
    subject: "Surgery",
    thumbnail: "https://placehold.co/600x400/66ccff/ffffff.png?text=Surgery",
    videoUrl: "https://www.youtube.com/embed/Y27vC-GB9Co",
    instructor: "Dr. Lisa Wilson",
    duration: "60 minutes",
    views: 1650,
  },
  {
    id: 8,
    title: "Internal Medicine Cases",
    subject: "Internal Medicine",
    thumbnail: "https://placehold.co/600x400/ff9966/ffffff.png?text=Internal+Medicine",
    videoUrl: "https://www.youtube.com/embed/XP-jtNPnZqI",
    instructor: "Dr. Robert Taylor",
    duration: "49 minutes",
    views: 1420,
  },
  {
    id: 9,
    title: "Pediatrics - Child Development",
    subject: "Pediatrics",
    thumbnail: "https://placehold.co/600x400/9966ff/ffffff.png?text=Pediatrics",
    videoUrl: "https://www.youtube.com/embed/WwzwJdtmWj0",
    instructor: "Dr. Jennifer Clark",
    duration: "44 minutes",
    views: 1200,
  },
  {
    id: 10,
    title: "Obstetrics and Gynecology",
    subject: "Obstetrics",
    thumbnail: "https://placehold.co/600x400/66ffcc/ffffff.png?text=Obstetrics",
    videoUrl: "https://www.youtube.com/embed/xXLyKDRupCc",
    instructor: "Dr. Amanda Hill",
    duration: "55 minutes",
    views: 1580,
  },
];

const VideoLectures = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  
  const toggleFullscreen = (videoElement: HTMLIFrameElement | null) => {
    if (!videoElement) return;
    
    if (!document.fullscreenElement) {
      videoElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const filteredLectures = videoLectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lecture.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return lecture.subject.toLowerCase() === activeTab.toLowerCase() && matchesSearch;
  });

  const subjects = Array.from(new Set(videoLectures.map(lecture => lecture.subject.toLowerCase())));

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Video Lectures</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              {subjects.map(subject => (
                <TabsTrigger key={subject} value={subject}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLectures.map(lecture => (
              <Card key={lecture.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video cursor-pointer" onClick={() => setOpenVideo(lecture.videoUrl)}>
                  <img src={lecture.thumbnail} alt={lecture.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{lecture.title}</h3>
                  <div className="flex flex-wrap justify-between text-sm text-gray-500">
                    <span>{lecture.instructor}</span>
                    <span>{lecture.duration}</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{lecture.views} views</span>
                    <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">{lecture.subject}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {subjects.map(subject => (
          <TabsContent key={subject} value={subject} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLectures.map(lecture => (
                <Card key={lecture.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video cursor-pointer" onClick={() => setOpenVideo(lecture.videoUrl)}>
                    <img src={lecture.thumbnail} alt={lecture.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{lecture.title}</h3>
                    <div className="flex flex-wrap justify-between text-sm text-gray-500">
                      <span>{lecture.instructor}</span>
                      <span>{lecture.duration}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{lecture.views} views</span>
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">{lecture.subject}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </div>
      
      <Dialog open={!!openVideo} onOpenChange={(open) => !open && setOpenVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-white">Video Lecture</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video">
            {openVideo && (
              <iframe 
                src={openVideo}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default VideoLectures;
