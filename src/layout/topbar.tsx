import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TopBar() {
  return (
    <header className="flex sticky top-0  h-14 items-center justify-between  gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <div>
        <SidebarTrigger className="text-black" />
      </div>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
