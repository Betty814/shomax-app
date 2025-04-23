import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Skeleton,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CommentSection from "../components/CommentSection";
import Rating from "../components/Rating";
import { fetchMedia, submitComment } from "../services/api";
import banner from "../assets/images/images03.jpg";

const MediaDetails = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      try {
        const fetchedMedia = await fetchMedia(id);
        setMedia(fetchedMedia);
        setComments(fetchedMedia.comments || []);
      } catch (error) {
        console.error("Failed to load media", error);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    const username = localStorage.getItem("username") || "Guest";
    setComments([
      ...comments,
      { username, text: comment, timestamp: new Date().toISOString() },
    ]);
    setComment("");
    await submitComment({ uploadId: id, comment });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        marginTop: 8,
      }}
    >
      {/* Hero Banner */}
      <Box
        sx={{
          height: 280,
          backgroundImage: `url(${
            media?.category === "images" ? media.url : banner
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            p: 2,
          }}
        >
          {loading ? (
            <Skeleton variant="text" width="50%" height={40} />
          ) : (
            <Typography variant="h5">{media?.title}</Typography>
          )}
          <Rating mediaId={media?.id} initialRating={media?.rating} />
        </Box>
      </Box>

      {/* Content Tabs */}
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        centered
        sx={{ marginTop: 2, color: "white" }}
      >
        <Tab label="Details" sx={{ color: "white" }} />
        <Tab label="Comments" sx={{ color: "white" }} />
      </Tabs>

      <Box
        sx={{ p: 3, margin: "0 auto", width: "60%", backgroundColor: "white" }}
      >
        {tab === 0 ? (
          media?.category === "videos" || media?.category === "movies" ? (
            <Box
              component="video"
              controls
              src={media?.url}
              sx={{
                width: "100%",
                maxHeight: 360,
                borderRadius: "8px",
                boxShadow: 3,
                objectFit: "contain",
                margin: "0 auto",
              }}
            />
          ) : (
            <Box
              component="img"
              src={media?.url}
              alt={media?.title}
              sx={{
                width: "100%",
                maxHeight: 360,
                borderRadius: "8px",
                boxShadow: 3,
                objectFit: "contain",
                margin: "0 auto",
              }}
            />
          )
        ) : (
          <>
            <CommentSection comments={comments} />
            <Box
              sx={{
                bgcolor: "white",
                p: 2,
                display: "flex",
                alignItems: "center",
                mt: 4,
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Avatar>{media?.title?.charAt(0).toUpperCase()}</Avatar>
              <TextField
                fullWidth
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mx: 2, backgroundColor: "#f7f7f7", borderRadius: "4px" }}
              />
              <IconButton
                sx={{ bgcolor: "var(--primary-color)", color: "#fff" }}
                onClick={handleAddComment}
                disabled={!comment.trim()}
              >
                <PlayCircleOutlineIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MediaDetails;
