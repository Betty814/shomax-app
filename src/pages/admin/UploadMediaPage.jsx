import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import { uploadMedia } from "../../services/api";

const categories = ["Images", "Videos"];

const UploadMediaPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!title || !category || !file) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category.toLowerCase());
    formData.append("file", file);

    try {
      await uploadMedia(formData);
      setSuccess("Media uploaded successfully!");
      setError("");
      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
      setProgress(0);
    } catch (error) {
      setError("Error uploading media");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const isValid =
        selectedFile.type.startsWith("video/") ||
        selectedFile.type.startsWith("image/");
      if (!isValid) {
        setError("Invalid file type. Please upload an image or video.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #40a6ff, #1e3c72)",
      }}
    >
      <Card
        sx={{
          width: 500,
          padding: 4,
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            color="#fff"
            gutterBottom
          >
            Upload Media
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
            }}
          />

          <TextField
            select
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Box
            sx={{
              border: "2px dashed #40a6ff",
              borderRadius: 2,
              textAlign: "center",
              padding: 3,
              cursor: "pointer",
              mb: 2,
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <input
              type="file"
              accept="video/*,image/*"
              onChange={handleFileChange}
              hidden
              id="upload-input"
            />
            <label htmlFor="upload-input">
              <IconButton component="span">
                <CloudUpload sx={{ fontSize: 50, color: "#40a6ff" }} />
              </IconButton>
              <Typography variant="body1">
                Drag & Drop or Click to Upload
              </Typography>
            </label>
          </Box>

          {preview && (
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                borderRadius: "10px",
                overflow: "hidden",
                mb: 2,
              }}
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
                />
              ) : (
                <video width="100%" height="200px" controls>
                  <source src={preview} type="video/mp4" />
                </video>
              )}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
              >
                <Delete sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          )}

          {loading && (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mb: 2 }}
            />
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleUpload}
            disabled={loading}
            sx={{
              mb: 2,
              backgroundColor: "#40a6ff",
              "&:hover": { backgroundColor: "#3382cc" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload"
            )}
          </Button>

          {/* Success & Error Messages */}
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", mt: 2 }}
            >
              {error}
            </Typography>
          )}
          {success && (
            <Typography
              variant="body2"
              color="success"
              sx={{ textAlign: "center", mt: 2 }}
            >
              {success}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadMediaPage;
