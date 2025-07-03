import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./shared/components/Navbar";
import Router from "./app/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchProvider } from "./shared/context/SearchContext";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <SearchProvider>
      {!isAdminRoute && <Navbar />}
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </SearchProvider>
  );
}

const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
