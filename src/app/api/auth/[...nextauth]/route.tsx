import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

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
          // AxiosErrorとして型を指定
          const axiosError = error as AxiosError;
          console.error("Authorization error:", axiosError.response?.data || axiosError.message);
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
