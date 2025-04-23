import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signUp } from "../services/authService";

const SignUpPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      console.log("username", username);
      console.log("password", password);
      const user = await signUp({ username, password });
      if (user) {
        console.log("Sign-up successful:", user);
        setError("");
        alert("Sign up successful. Please log in.");
        // Redirect to login page
        window.location.href = "/login";
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "16px",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "60%",
      }}
    >
      <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom sx={{ color: "black" }}>
        Sign Up
      </Typography>
      {error && (
        <Typography
          color="error"
          variant={isVerySmallScreen ? "body2" : isSmallScreen ? "h6" : "h4"}
          sx={{ fontSize: "12px" }}
        >
          {error}
        </Typography>
      )}
      <form onSubmit={handleSignUp}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "var(--primary-color)",
              },
            },
            marginBottom: "16px",
            marginTop: "16px",
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "var(--primary-color)",
              },
            },
            marginBottom: "16px",
            marginTop: "16px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "var(--primary-color)",
            "&:hover": {
              backgroundColor: "var(--primary-color)",
            },
          }}
        >
          Sign Up
        </Button>
      </form>
      <Typography
        variant="body2"
        sx={{
          marginTop: "16px",
          textAlign: "center",
          color: "#555",
        }}
      >
       Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "var(--primary-color)",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Sign In
        </Link>
      </Typography>
    </div>
  );
};

export default SignUpPage;
