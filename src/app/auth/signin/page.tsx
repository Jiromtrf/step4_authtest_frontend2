"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [user_id, setUserId] = useState<string>(""); // 型指定
  const [password, setPassword] = useState<string>(""); // 型指定

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false, // カスタムリダイレクトを使用
      user_id,
      password,
    });

    if (result?.ok) {
      // 成功時にダッシュボードへリダイレクト
      window.location.href = "/dashboard";
    } else {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_id">User ID:</label>
          <input
            id="user_id"
            type="text"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
