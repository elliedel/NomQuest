import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./firebase/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import SignIn from "./pages/auth/SignIn";

const AuthRedirect = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/admin" /> : children;
};

function App() {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  const handleError = () => {
    showToast("An error occurred!");
  };

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRedirect>
                  <HomePage />
                </AuthRedirect>
              }
            />
            <Route path="/login" element={<SignIn />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
