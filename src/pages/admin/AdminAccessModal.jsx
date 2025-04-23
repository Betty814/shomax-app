import { Modal, Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const AdminAccessModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          boxShadow: 24,
          p: 4,
          borderRadius: "12px",
          textAlign: "center",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <WarningAmberIcon sx={{ fontSize: 50, color: "#ffcc00", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Admin Access Required
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          You must log in as an admin to access this page.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            ":hover": { background: "#ff758c" },
          }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
          }}
        >
          Logout & Re-Login
        </Button>
      </Box>
    </Modal>
  );
};

AdminAccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminAccessModal;
