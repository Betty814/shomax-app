import  { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Paper,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion, useScroll } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaCard from "./MediaCard";
import { fetchMedias } from "../services/api";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 100);
    });
  }, [scrollY]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await fetchMedias(searchTerm);
        setFilteredResults(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      animate={{ y: scrolled ? -80 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ position: "fixed", width: "100%", zIndex: 100 }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1E1E2E", padding: "8px 0" }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.8rem",
                border: "1px dotted #fff",
                padding: "0 10px",
                borderRadius: "5px",
              }}
            >
              SHOMAX
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button sx={{ color: "#fff", fontSize: "1rem" }}>About</Button>
              <Button sx={{ color: "#fff", fontSize: "1rem" }}>Contact</Button>
            </Box>

            <Box sx={{ position: "relative", width: "300px" }} ref={searchRef}>
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  width: "100%",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {showDropdown && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80vw",
                    maxHeight: "300px",
                    overflowY: "auto",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                    zIndex: 200,
                    padding: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Grid container spacing={2}>
                    {filteredResults.map((media) => (
                      <Grid key={media.id} item xs={12} sm={3} md={3}>
                        <MediaCard media={media} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Box>

            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#40a6ff",
                color: "#fff",
                fontSize: "1rem",
              }}
              onClick={() => navigate("/admin/upload")}
            >
              Upload
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
};

export default Header;
