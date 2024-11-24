import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // 環境変数からシークレットキーを取得
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
          // ユーザー認証リクエスト
          const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
            user_id: credentials.user_id,
            password: credentials.password,
          });

          if (response.status === 200 && response.data) {
            return { id: response.data.user_id, name: response.data.user_id };
          }
          return null;
        } catch (error: any) {
          console.error("Authorization error:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // カスタムログインページ
  },
  session: {
    strategy: "jwt", // JWTベースのセッション管理
  },
};

// ハンドラーのエクスポート
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
