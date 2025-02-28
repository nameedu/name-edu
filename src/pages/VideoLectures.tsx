import React, { useEffect, useState } from "react";
import { PlayCircle, Clock, BookOpen, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const API_URL = "https://www.googleapis.com/youtube/v3/search";

const VideoLectures = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState(""); // For pagination
  const [playingVideo, setPlayingVideo] = useState(null); // Track the currently playing video

  const fetchVideos = async (nextPageToken = "") => {
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID; // Use environment variable
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY; // Use environment variable

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=6&pageToken=${nextPageToken}`
      );
      const data = await response.json();

      // Make sure there are items in the response
      if (!data.items) {
        console.log("No video items found.");
        return;
      }

      // Filter to get recorded live videos (liveBroadcastContent === "none")
      const recordedLiveVideos = data.items.filter(
        (video) => video.snippet.liveBroadcastContent === "none"
      );

      // Sort recorded videos by published date (latest first)
      const sortedVideos = recordedLiveVideos.sort((a, b) =>
        new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
      );

      // Update the videos list with new data
      setVideos((prevVideos) => [...prevVideos, ...sortedVideos]);
      setPageToken(data.nextPageToken); // Update pagination token for further requests
      setLoading(false);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      setLoading(false);
    }
  };

  const handlePlayClick = (videoId) => {
    const iframe = document.getElementById(`video-${videoId}`);
    const playIcon = document.getElementById(`play-icon-${videoId}`);
    const src = iframe.src.split("?")[0]; // Remove any previous query parameters

    // If a video is already playing, stop it before starting a new one
    if (playingVideo && playingVideo !== videoId) {
      const previousIframe = document.getElementById(`video-${playingVideo}`);
      previousIframe.src = previousIframe.src.split("?")[0]; // Remove autoplay from previous iframe
    }

    // Set autoplay and trigger play
    iframe.src = `${src}?autoplay=1`;
    playIcon.style.display = "none"; // Hide the play button
    setPlayingVideo(videoId); // Set the currently playing video
  };

  const handleLoadMore = () => {
    fetchVideos(pageToken); // Fetch next page of videos
  };

  useEffect(() => {
    fetchVideos(); // Fetch initial set of videos
  }, []);

  if (loading && !videos.length) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Recorded Live Video Lectures</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Access our recorded live stream video lectures for enhanced learning
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.length === 0 ? (
              <div>No recorded live streams found.</div>
            ) : (
              videos.map((video, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video bg-neutral-100 relative group">
                    <div
                      id={`play-icon-${video.id.videoId}`}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <PlayCircle
                        className="w-16 h-16 text-primary/80 group-hover:text-primary transition-colors"
                        onClick={() => handlePlayClick(video.id.videoId)} // Handle play button click
                      />
                    </div>
                    <iframe
                      id={`video-${video.id.videoId}`}
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title={video.snippet.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2">{video.snippet.title}</h3>
                    <p className="text-sm text-neutral-600 mb-4">{video.snippet.description}</p>
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        <span>{video.snippet.channelTitle}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <div
                        key={index}
                        className="flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        Recorded Live Stream
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {pageToken && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VideoLectures;
