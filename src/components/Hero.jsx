import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import hero from "../assets/images/images03.jpg";

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "flex-start",
        position: "relative",
        textAlign: isMobile ? "center" : "left",
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: isMobile ? "20px" : "5vw",
      }}
    >
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          maxWidth: isMobile ? "100%" : "50%",
          zIndex: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#fff",
            letterSpacing: "2px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          Share Your Moments Through Videos & Images
        </Typography>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              fontStyle: "italic",
              marginTop: "15px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Rate, Comment, and Connect with Others
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Hero;
