import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import CreateProduct from "./screens/CreateProduct";
import Login from "./screens/Login";
import { useDispatch, useSelector } from "react-redux";
import CreateCategory from "./screens/CreateCategory";

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 text-xl font-bold text-center">
      Simple React Website
    </header>
  );
}

function Navbar() {
  const { accessToken } = useSelector((state) => state.auth);
const dispatch = useDispatch();
  return (
    <nav className="bg-gray-100 shadow p-4 flex space-x-4">
      <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
      <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
      <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
      {accessToken ? (
        <button onClick={() => dispatch(logout())}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

function About() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">About Us</h1>
      <p>This is the about page content.</p>
    </div>
  );
}

function Services() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Our Services</h1>
      <p>Details about our services go here.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <p>Here’s how you can reach us.</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-auto">
      © 2025 Simple Website. All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <main className="p-6 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-category" element={<CreateCategory/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
