"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LogoutButton from "./LogoutButton"; // ログアウトボタンをインポート

const RadarChart = dynamic(() => import("./RadarChart"), { ssr: false });

interface Skills {
  biz: number;
  design: number;
  tech: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [skills, setSkills] = useState<Skills>({ biz: 0, design: 0, tech: 0 });
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (session?.user?.name) {
      const userId = session.user.name;
      console.log("Fetching skills for user_id:", userId);

      fetch(`http://127.0.0.1:8000/api/user/skills?user_id=${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch skills data");
          }
          return res.json();
        })
        .then((data: { biz: number; design: number; tech: number; name: string }) => {
          setSkills({ biz: data.biz, design: data.design, tech: data.tech });
          setUserName(data.name);
        })
        .catch((err) => console.error(err.message));
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You are not logged in. Please log in first.</p>;
  }

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h1>Welcome, {userName} さん</h1>
      <LogoutButton /> {/* ログアウトボタンを追加 */}
      <h2>Your Skills</h2>
      <RadarChart skills={skills} />
    </div>
  );
}
