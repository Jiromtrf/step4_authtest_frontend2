import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // 未認証ユーザーのリダイレクト先
  },
});

export const config = {
  matcher: ["/dashboard"], // 保護したいルート
};
