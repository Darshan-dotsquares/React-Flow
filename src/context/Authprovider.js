import {authOptions} from "../app/api/auth/[...nextauth]/route.js";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return (
    <SessionProvider options={authOptions}>{children}</SessionProvider>
  );
}