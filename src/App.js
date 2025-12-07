import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ import the new footer
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import Hire from "./pages/Hire";
import ProfilePage from "./pages/Profile";
import ProviderProfilePage from "./components/ProviderProfilePage";
import BookingsPage from "./pages/Bookings";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceDetails from "./pages/ServiceDetails";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Navigation />
        <main className="pt-16 min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hire" element={<Hire />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProviderProfilePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/dashboard" element={<ProviderDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
