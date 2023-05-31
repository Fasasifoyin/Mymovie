import React from "react";
import Box from "./Box";
import ReactPlayer from "react-player";

const VideoBox = ({ videos, setVideoIndex, videoIndex, setShowVideo }) => {
  const shownVideo = videos?.results[videoIndex];
  const length = videos.results.length;

  return (
    <Box
      setShow={setShowVideo}
      index={videoIndex}
      setIndex={setVideoIndex}
      length={length}
    >
      <ReactPlayer
        className="w-100 h-100"
        url={`https://www.youtube.com/watch?v=${shownVideo?.key}`}
        controls
      />
    </Box>
  );
};

export default VideoBox;
