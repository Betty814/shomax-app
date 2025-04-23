import { Card, Typography, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import Image1 from "../assets/images/images01.jpg";
import Image2 from "../assets/images/images02.jpg";
import Image3 from "../assets/images/images04.jpg";

const defaultThumbnails = {
  video: [Image1, Image2, Image3],
  movie: [Image1, Image2, Image3],
  image: [Image1, Image2, Image3],
};

const getRandomThumbnail = (type) => {
  const images = defaultThumbnails[type] || defaultThumbnails.image;
  return images[Math.floor(Math.random() * images.length)];
};

const renderStars = (rating) => (
  <Box sx={{ display: "flex", gap: "3px" }}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        sx={{ color: i < rating ? "#FFD700" : "#BBB", fontSize: "16px" }}
      />
    ))}
  </Box>
);

const MediaCard = ({ media }) => {
  const isVideoOrMovie =
    media.category === "videos" || media.category === "movies";
  const thumbnail = isVideoOrMovie
    ? getRandomThumbnail(media.category)
    : media.url || getRandomThumbnail(media.category || "image");

  return (
    <Card
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        height: 300,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: `url(${thumbnail}) center/cover`,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))",
        }}
      />
      <Box sx={{ padding: "12px", position: "relative", zIndex: 2 }}>
        <Typography
          variant="h6"
          component={Link}
          to={`/media/${media.id}`}
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textDecoration: "none",
            "&:hover": { color: "#40a6ff" },
          }}
        >
          {media.title || "Untitled"}
        </Typography>
        {renderStars(media.averageRating || 0)}
      </Box>
      {isVideoOrMovie && (
        <IconButton
          component={Link}
          to={`/media/${media.id}`}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            padding: "12px",
            borderRadius: "50%",
            transition: "background 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
            },
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 50 }} />
        </IconButton>
      )}
    </Card>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string,
    averageRating: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
  }).isRequired,
};

export default MediaCard;
