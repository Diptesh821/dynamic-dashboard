"use client"; // If you’re using Next.js 13+ App Router and want this to be a Client Component
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  // Utility function to validate password
  const isPasswordValid = (pwd) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(pwd);

    return (
      pwd.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  // Update password in state and check validity
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!isPasswordValid(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check before submission
    if (!isPasswordValid(password)) {
      alert("Password does not meet the complexity requirements.");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/user`, {
        name,
        email,
        password,
      });
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Signup</h1>

        {/* Username Field */}
        <input
          type="text"
          className="border p-2 mb-4 w-full"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Field */}
        <input
          type="email"
          className="border p-2 mb-4 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        {/* Error Message */}
        {passwordError && (
          <p className="text-red-500 text-sm mb-4">{passwordError}</p>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded w-full"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
