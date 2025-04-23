import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fetchMedias } from "../../services/api";
import { Box } from "@mui/material";
import { Movie, VideoLibrary, Image } from "@mui/icons-material";

const categoryConfig = {
  videos: {
    gradient: "linear-gradient(135deg, #ff6b6b, #ff4757)",
    icon: <VideoLibrary sx={{ fontSize: 50, color: "#fff" }} />,
  },
  images: {
    gradient: "linear-gradient(135deg, #1e90ff, #3742fa)",
    icon: <Image sx={{ fontSize: 50, color: "#fff" }} />,
  },
  movies: {
    gradient: "linear-gradient(135deg, #2ed573, #10ac84)",
    icon: <Movie sx={{ fontSize: 50, color: "#fff" }} />,
  },
};

const ViewCards = () => {
  const categories = Object.keys(categoryConfig);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        const counts = categories.map((category) => ({
          category,
          count: medias.filter((media) => media.category === category).length,
        }));
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    loadMedias();
  }, [categories]);

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="#fff">
        Overview
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categoryCounts.map(({ category, count }) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card
              sx={{
                borderRadius: "20px",
                textAlign: "center",
                height: "14rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(15px)",
                color: "#fff",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                border: "2px solid transparent",
                backgroundImage: categoryConfig[category].gradient,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 15px 40px rgba(0,0,0,0.3)",
                  border: `2px solid rgba(255, 255, 255, 0.4)`,
                },
              }}
            >
              <CardContent>
                <Box>{categoryConfig[category].icon}</Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ letterSpacing: "1px", mt: 1 }}
                >
                  {category.toUpperCase()}
                </Typography>
                <Typography variant="h3" fontWeight="bold" mt={1}>
                  {count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewCards;
