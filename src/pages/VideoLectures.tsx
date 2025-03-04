
import React, { useState, useEffect, useRef } from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Info, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Video {
  id: string;
  title: string;
  description: string;
  subject: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  uploadedAt: string;
}

const VideoLectures = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dummy data for now - would be fetched from API in production
  const videos: Video[] = [
    {
      id: '1',
      title: 'Introduction to Human Anatomy',
      description: 'This lecture covers the basic principles of human anatomy, including anatomical positions, planes, and terminology.',
      subject: 'Anatomy',
      thumbnail: '/Images/mbbs.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '45:30',
      uploadedAt: '2023-06-15'
    },
    {
      id: '2',
      title: 'Cell Biology and Division',
      description: 'Learn about cell structure, function, and the process of cell division including mitosis and meiosis.',
      subject: 'Biology',
      thumbnail: '/Images/bds.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '52:15',
      uploadedAt: '2023-06-10'
    },
    {
      id: '3',
      title: 'Cardiovascular System',
      description: 'This lecture discusses the heart, blood vessels, and circulation in the human body.',
      subject: 'Physiology',
      thumbnail: '/Images/bsc-nursing.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '63:20',
      uploadedAt: '2023-06-05'
    },
    {
      id: '4',
      title: 'Organic Chemistry Fundamentals',
      description: 'Introduction to organic chemistry concepts, functional groups, and reaction mechanisms.',
      subject: 'Chemistry',
      thumbnail: '/Images/bpt.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '58:45',
      uploadedAt: '2023-05-28'
    },
    {
      id: '5',
      title: 'Nervous System Part 1',
      description: 'This lecture covers the central nervous system, including the brain and spinal cord.',
      subject: 'Neurology',
      thumbnail: '/Images/b-pharmacy.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '47:50',
      uploadedAt: '2023-05-20'
    },
    {
      id: '6',
      title: 'Respiratory System',
      description: 'Learn about the organs of the respiratory system and the mechanics of breathing.',
      subject: 'Physiology',
      thumbnail: '/Images/bmlt.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '49:30',
      uploadedAt: '2023-05-15'
    },
  ];

  const handleVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setSelectedVideo(null);
  };

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    // No need to access src property here
    console.log("Iframe loaded successfully");
  };

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Video Lectures</h1>
          <p className="text-gray-600 mb-8">Access our comprehensive collection of video lectures for medical entrance preparation</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button 
                      onClick={() => handleVideo(video)} 
                      className="rounded-full w-14 h-14 bg-primary/90 hover:bg-primary"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setSelectedVideo(video);
                        setInfoOpen(true);
                      }}
                    >
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">{video.subject} • {video.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black" onInteractOutside={(e) => e.preventDefault()}>
          <div className="relative pt-[56.25%] w-full">
            {selectedVideo && (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
              ></iframe>
            )}
          </div>
          <DialogClose className="absolute top-2 right-2 z-10">
            <Button variant="ghost" size="icon" className="text-white bg-black/50 hover:bg-black/70 h-8 w-8" onClick={handleCloseVideo}>
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Video Info Dialog */}
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription className="text-gray-600">{selectedVideo?.subject} • {selectedVideo?.duration}</DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm">{selectedVideo?.description}</p>
            <p className="text-xs text-gray-500 mt-4">Uploaded on: {selectedVideo?.uploadedAt}</p>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => {
              setInfoOpen(false);
              handleVideo(selectedVideo!);
            }}>
              Watch Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default VideoLectures;
