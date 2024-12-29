import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/use-auth";

export default function TopBar() {
  const auth = useAuth();

  return (
    <header className="flex sticky top-0  h-14 items-center justify-between  gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <div>
        <SidebarTrigger className="text-black" />
      </div>

      <Avatar>
        <AvatarImage src={auth?.user?.profilePicture} alt="@shadcn" />
        <AvatarFallback>
          {auth?.user?.firstName[0]}
          {auth?.user?.lastName[0]}
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
