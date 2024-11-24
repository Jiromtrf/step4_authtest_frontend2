"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const handleLogout = () => {
        alert("You have been logged out.");
        signOut({ callbackUrl: "/auth/signin" });
      };      

  return (
    <button onClick={handleLogout} style={{ margin: "10px", padding: "10px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
      ログアウト
    </button>
  );
}
