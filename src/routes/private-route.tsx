import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  const navigate = useNavigate();

  if (auth?.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth?.user) {
    navigate("/login");
    return null;
  }

  return <div>{children}</div>;
}
