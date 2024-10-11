import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decodedToken } from "./utils/decodedToken";
import { TUser } from "./redux/features/auth/authSlice";
// Public routes accessible without authentication
const AuthRoutes = ["/login", "/signup", "/forgotPassword"];

const AdminRoutes = ["/all-user", "/content-management", "payment-management"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(pathname);
  const accessToken = request.cookies.get("accessToken")?.value;
 

  let user;

  // Decode token only if it exists
  if (accessToken) {
    try {
      user = (await decodedToken(accessToken)) as TUser | undefined;
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

 
  if (user) {
    if (user && user?.role != "ADMIN") {
      if (AdminRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/login",
    "/signup",
    "/forgotPassword",
  ],
};
