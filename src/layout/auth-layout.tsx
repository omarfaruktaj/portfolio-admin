import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md p-4 space-y-4">
        <Outlet />
      </div>
    </div>
  );
}
