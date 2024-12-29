import { User } from "@/types";
import { createContext } from "react";

export interface AuthInfoInterface {
  isLoading: boolean;
  user: User | null;
}
export const AuthContext = createContext<AuthInfoInterface | null>(null);
