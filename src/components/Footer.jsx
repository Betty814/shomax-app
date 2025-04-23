import {
  Box,
  Typography,
  Link,
  Container,
  Divider,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        padding: "40px 0",
        marginTop: "80px",
        textAlign: "center",
        boxShadow: "0px -5px 15px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {/* Brand Info */}
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
          >
            &copy; {new Date().getFullYear()} Shomax. All rights reserved.
          </Typography>

          {/* Social Media Icons */}
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              marginTop: { xs: "15px", sm: "0" },
            }}
          >
            {[
              { icon: <Facebook />, link: "https://facebook.com" },
              { icon: <Twitter />, link: "https://twitter.com" },
              { icon: <Instagram />, link: "https://instagram.com" },
              { icon: <YouTube />, link: "https://youtube.com" },
            ].map((social, index) => (
              <IconButton
                key={index}
                href={social.link}
                target="_blank"
                sx={{
                  color: "#fff",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "50%",
                  transition: "0.3s",
                  "&:hover": {
                    background: "rgba(255,255,255,0.4)",
                    transform: "scale(1.1)",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Divider */}
        <Divider
          sx={{ backgroundColor: "rgba(255,255,255,0.3)", margin: "20px 0" }}
        />

        {/* Additional Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "start",
            textAlign: "left",
            gap: "20px",
          }}
        >
          {["About Us", "Terms of Service", "Contact Us"].map((text, index) => (
            <Link
              key={index}
              href="/"
              color="inherit"
              sx={{
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "500",
                transition: "0.3s",
                textTransform: "capitalize",
                "&:hover": { color: "#ff7eb3", textDecoration: "underline" },
              }}
            >
              {text}
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
