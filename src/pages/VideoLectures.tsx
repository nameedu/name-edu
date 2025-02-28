
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Search, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

// Sample video data - in a real app, this would come from an API
const videoData = [
  {
    id: 1,
    title: "Introduction to Physics",
    description: "Learn the basic concepts of Physics with Professor Smith",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/physics-intro.mp4",
    duration: "45:30",
    instructor: "Dr. Smith",
    category: "Physics",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Organic Chemistry Basics",
    description: "Understand the fundamentals of organic chemistry reactions",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/chemistry-basics.mp4",
    duration: "52:15",
    instructor: "Dr. Johnson",
    category: "Chemistry",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Calculus: Differentiation",
    description: "Master the techniques of differentiation in calculus",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/calculus.mp4",
    duration: "58:45",
    instructor: "Prof. Williams",
    category: "Mathematics",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Cell Biology: Mitosis",
    description: "Learn about cell division process in detail",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/biology-mitosis.mp4",
    duration: "38:20",
    instructor: "Dr. Garcia",
    category: "Biology",
    level: "Intermediate",
  },
];

const VideoLectures = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredVideos = videoData.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, 100);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Video Lectures</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access our comprehensive collection of video lectures to enhance your learning experience
          </p>

          {/* Search bar */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search video lectures..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              {selectedVideo ? (
                <div className="bg-neutral-900 rounded-lg overflow-hidden">
                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="w-full aspect-video"
                      poster={selectedVideo.thumbnail}
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src={selectedVideo.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white"
                            onClick={togglePlay}
                          >
                            {isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white"
                            onClick={toggleMute}
                          >
                            {isMuted ? (
                              <VolumeX className="h-5 w-5" />
                            ) : (
                              <Volume2 className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white"
                          onClick={handleFullscreen}
                        >
                          <Maximize className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {selectedVideo.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-neutral-400 text-sm">
                        Instructor: {selectedVideo.instructor}
                      </span>
                      <span className="text-neutral-400 text-sm">
                        Duration: {selectedVideo.duration}
                      </span>
                    </div>
                    <p className="text-neutral-300">
                      {selectedVideo.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-100 rounded-lg h-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      No Video Selected
                    </h3>
                    <p className="text-neutral-600">
                      Please select a video from the list to start watching
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Video List Section */}
            <div className="space-y-4 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2">
              <h2 className="text-xl font-bold mb-4">Available Lectures</h2>
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedVideo?.id === video.id
                        ? "border-primary border-2"
                        : ""
                    }`}
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-2">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium truncate">{video.title}</h3>
                      <p className="text-sm text-neutral-600 line-clamp-2 mt-1">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
                          {video.category}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {video.instructor}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="bg-neutral-50 rounded-lg p-6 text-center">
                  <p className="text-neutral-500">
                    No videos found matching your search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoLectures;
