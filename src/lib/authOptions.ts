// src/lib/authOptions.ts

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user_id: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are missing");
        }
      
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          const response = await axios.post(`${baseUrl}/api/auth/login`, {
            user_id: credentials.user_id,
            password: credentials.password,
          });
      
          if (response.status === 200 && response.data) {
            return { id: response.data.user_id, name: response.data.user_id };
          } else {
            throw new Error("Authentication failed");
          }
        } catch (error) {
          console.error("Authorization error:", error);
      
          // エラーメッセージを明示的にスローする
          throw new Error(error.response?.data?.detail || "Authentication failed");
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};
