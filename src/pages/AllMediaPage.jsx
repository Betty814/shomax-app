import React, { useState, useEffect } from "react";
import MediaCard from "../components/MediaCard"; // Use a generic MediaCard component
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { fetchMedia } from "../services/api"; // Fetch all media instead of just videos

const AllMediaPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaItems, setMediaItems] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mediaPerPage = 6;

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const fetchedMedia = await fetchMedia(); // API should return mixed media
        setMediaItems(fetchedMedia);
        setFilteredMedia(fetchedMedia);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    loadMedia();
  }, []);

  useEffect(() => {
    setFilteredMedia(
      mediaItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, mediaItems]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastMedia = currentPage * mediaPerPage;
  const indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
  const currentMedia = filteredMedia.slice(indexOfFirstMedia, indexOfLastMedia);

  return (
    <Box sx={{ padding: "16px" }}>
      <TextField
        label="Search Media"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginBottom: "16px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "var(--primary-color)" },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": { color: "var(--primary-color)" },
          },
        }}
      />
      <Grid container spacing={2} justifyContent="center">
        {currentMedia.map((media) => (
          <Grid key={media.id} item xs={12} sm={6} md={4}>
            <MediaCard media={media} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          count={Math.ceil(filteredMedia.length / mediaPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "var(--primary-color)",
              "&:hover": {
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
              },
              "&.Mui-selected": {
                backgroundColor: "white",
                color: "var(--primary-color)",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AllMediaPage;
