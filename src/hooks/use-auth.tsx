import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

export default function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}
