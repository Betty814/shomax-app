import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MediaDetails from "./pages/MediaDetails";
import AllMediaPage from "./pages/AllMediaPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadMediaPage from "./pages/admin/UploadMediaPage";

import PrivateRoute from "./components/PrivateRoute";
import "./App.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route path="upload" element={<UploadMediaPage />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/media/:id" element={<MediaDetails />} />
                  <Route path="/medias" element={<AllMediaPage />} />
                  <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
