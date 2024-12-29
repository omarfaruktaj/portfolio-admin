import { getMe, UserInterface } from "@/actions/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthInfoInterface {
  isLoading: boolean;
  user: UserInterface | null;
}
// AuthContext has been moved to a separate file
export const AuthContext = createContext<AuthInfoInterface | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
    }
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  const authInfo: AuthInfoInterface = {
    isLoading,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
