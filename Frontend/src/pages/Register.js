import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setMessage("Registered successfully! Please login.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded-lg" />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded-lg" />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-2 border rounded-lg" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Register</button>
        </form>
        {message && <p className="text-center mt-3 text-gray-600">{message}</p>}
        <p className="text-center text-sm mt-4">Already have an account? <a href="/" className="text-blue-600 hover:underline">Login</a></p>
      </div>
    </div>
  );
}
