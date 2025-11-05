import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      setMessage("Login successful!");
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setMessage("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded-lg" />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-2 border rounded-lg" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Login</button>
        </form>
        {message && <p className="text-center mt-3 text-gray-600">{message}</p>}
        <p className="text-center text-sm mt-4">Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
      </div>
    </div>
  );
}
