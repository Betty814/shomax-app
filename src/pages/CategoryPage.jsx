import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MediaCard from "../components/MediaCard";
import { fetchMedia } from "../services/api";

const CategoryPage = () => {
  const { category } = useParams();
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const fetchedMedia = await fetchMedia(category);
        setMediaItems(fetchedMedia);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    loadMedia();
  }, [category]);

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>
      {mediaItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No media available
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {mediaItems.map((media) => (
            <Grid key={media.id} item xs={12} sm={6} md={4}>
              <MediaCard media={media} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategoryPage;
