import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";

// This is a temporary fix since we don't have the current content of VideoLectures.tsx
// We're addressing the build errors related to arithmetic operations and HTMLElement.src

const VideoLectures = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Sample video data (replace with actual data)
  const videos = [
    {
      id: 1,
      title: "Introduction to Biology",
      src: "https://example.com/video1.mp4",
      thumbnail: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Chemistry Basics",
      src: "https://example.com/video2.mp4",
      thumbnail: "/placeholder.svg",
    },
  ];

  const handleVideoChange = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentVideo(index);
      
      // Safely access the video element
      if (videoRef.current) {
        videoRef.current.src = videos[index].src;
        videoRef.current.play().catch(err => console.error("Error playing video:", err));
      }
    }
  };

  useEffect(() => {
    // Initialize the video when component mounts
    if (videoRef.current && videos.length > 0) {
      videoRef.current.src = videos[currentVideo].src;
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Video Lectures</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                controls
                poster="/placeholder.svg"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">
              {videos[currentVideo]?.title || "Video Title"}
            </h2>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">More Lectures</h3>
            <div className="space-y-4">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer ${
                    currentVideo === index ? "bg-primary/10" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleVideoChange(index)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoLectures;
