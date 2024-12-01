"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [user_id, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username: user_id, // 修正ポイント
      password,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("ログインに失敗しました。ユーザーIDまたはパスワードを確認してください。");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
