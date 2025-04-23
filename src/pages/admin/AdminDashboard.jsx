import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  CssBaseline,
  Modal,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Upload as UploadIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ViewCards from "./ViewCards";

const drawerWidth = 250;

const AdminDashboard = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { text: "Visit Site", path: "/", icon: <HomeIcon /> },
    { text: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { text: "Upload Video", path: "/admin/upload", icon: <UploadIcon /> },
  ];

  const Sidebar = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1e1e2e, #252541)",
        color: "#fff",
        paddingTop: 2,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          padding: "20px 0",
          fontWeight: "bold",
          letterSpacing: 1,
          color: "#00E5FF",
        }}
      >
        ADMIN PANEL
      </Typography>

      <Divider sx={{ backgroundColor: "#00E5FF", margin: "8px 20px" }} />

      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? "#00E5FF" : "#fff",
              background:
                location.pathname === item.path
                  ? "rgba(0, 229, 255, 0.2)"
                  : "transparent",
              borderRadius: "8px",
              margin: "8px 12px",
              transition: "0.3s",
              "&:hover": {
                background: "rgba(0, 229, 255, 0.2)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#00E5FF" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#1a1a2e" }}>
      <CssBaseline />

      {isMobile ? (
        <>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "fixed",
              top: 20,
              left: 20,
              zIndex: 1000,
              background: "#00E5FF",
              color: "#000",
              "&:hover": { background: "#00B3CC" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Modal open={mobileOpen} onClose={handleDrawerToggle}>
            <Box
              sx={{
                width: "80%",
                height: "100vh",
                background: "rgba(30, 30, 46, 0.95)",
                backdropFilter: "blur(10px)",
                position: "absolute",
                left: 0,
                top: 0,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                padding: 2,
              }}
            >
              {Sidebar}
            </Box>
          </Modal>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "linear-gradient(135deg, #1e1e2e, #252541)",
            },
          }}
        >
          {Sidebar}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          height: "100vh",
        }}
      >
        {location.pathname === "/admin" && <ViewCards />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
