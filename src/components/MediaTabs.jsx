import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MediaCard from "./MediaCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const categories = ["all", "videos", "images"];

const MediaTabs = ({ mediaData, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  const filteredMedia =
    selectedCategory === "all"
      ? mediaData
      : mediaData.filter((media) => media.category === selectedCategory);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMedia.length / itemsPerPage)
  );
  const paginatedMedia = filteredMedia.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        minHeight: "400px",
        padding: 3,
        bgcolor: "#121212",
        borderRadius: "12px",
      }}
    >
      {/* Sidebar Category Menu */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          minWidth: "150px",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            color="#40a6ff"
            onClick={() => {
              setSelectedCategory(category);
              setPage(0);
            }}
          >
            {category.toUpperCase()}
          </Button>
        ))}
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 2, textAlign: "center" }}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : filteredMedia.length === 0 ? (
          <Typography variant="h6" color="gray">
            No media available
          </Typography>
        ) : (
          <>
            {/* Media Grid */}
            <Grid container spacing={2} justifyContent="center" width="100%">
              {paginatedMedia.map((media) => (
                <Grid key={media.id} size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  <MediaCard media={media} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <IconButton
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                >
                  <ArrowBackIosNewIcon
                    color={page === 0 ? "disabled" : "secondary"}
                  />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  Page {page + 1} of {totalPages}
                </Typography>
                <IconButton
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  disabled={page >= totalPages - 1}
                >
                  <ArrowForwardIosIcon
                    color={page >= totalPages - 1 ? "disabled" : "secondary"}
                  />
                </IconButton>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

MediaTabs.propTypes = {
  mediaData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MediaTabs;
