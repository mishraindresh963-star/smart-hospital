import React from "react";

export default function Dashboard() {
  const user = localStorage.getItem("token");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to Smart Hospital</h1>
      {user ? <p className="text-lg">✅ You are logged in!</p> : <p className="text-lg text-red-500">Please log in first.</p>}
      <button className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}>Logout</button>
    </div>
  );
}
