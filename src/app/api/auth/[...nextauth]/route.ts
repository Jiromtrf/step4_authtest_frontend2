import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
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
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

// 正しいハンドラーのエクスポート
export { handler as GET, handler as POST };
