import { getMe } from "@/actions/auth";
import { AuthContext, AuthInfoInterface } from "@/contexts";
import { User } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
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
      console.log(data);
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
