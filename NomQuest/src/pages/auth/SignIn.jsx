import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { signInUser, signInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../firebase/AuthContext";
import Toast from "../../components/Toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { userLoggedIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/admin");
    } catch (err) {
      showToast("Error signing in with Google.");
      console.error(err);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      navigate("/admin");
    } catch (err) {
      showToast("Error signing in with email and password.");
      console.error(err);
    }
  };

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Login</h2>
        <p className="text-center text-gray-600 mb-8">
          Access your account and start exploring local food options.
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center bg-accent text-white font-semibold py-3 px-4 w-full rounded-md shadow-md hover:bg-accent-dark transition-colors"
          aria-label="Sign in with Google"
        >
          <GoogleIcon className="mr-2" />
          Sign in with Google
        </button>

        <div className="flex items-center justify-center mt-6">
          <span className="border-t border-gray-300 flex-grow"></span>
          <span className="mx-4 text-gray-400">or</span>
          <span className="border-t border-gray-300 flex-grow"></span>
        </div>

        <form onSubmit={handleEmailSignIn} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          By signing in, you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </div>

      {toast.visible && (
        <Toast
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </div>
  );
};

export default SignIn;
