import React from "react";
import { Image } from "react-bootstrap";
import Box from "./Box";

const Imagebox = ({ setShowImage, images, imageIndex, setImageIndex }) => {
  const shownImage = images[imageIndex];

  const length = images.length;

  return (
    <Box
      index={imageIndex}
      setIndex={setImageIndex}
      length={length}
      setShow={setShowImage}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${shownImage?.file_path}`}
        className="w-100 h-100"
        style={{ objectFit: "fill" }}
      />
    </Box>
  );
};

export default Imagebox;
