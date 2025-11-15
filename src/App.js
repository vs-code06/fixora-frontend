import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ import the new footer
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <main className="pt-16 min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
