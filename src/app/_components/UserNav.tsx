import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

interface UserNavProps {
    firstname: string;
    photo: string,
    role: string,
}


export function UserNav(user: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.photo} alt="@shadcn" />
            <AvatarFallback>{user.firstname.substring(0,1).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Welcome, {user.firstname}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            {user.role == "admin" && <DropdownMenuItem asChild className="hover:cursor-pointer"><Link href="/admin">Admin Dashboard</Link></DropdownMenuItem>}
            <DropdownMenuItem asChild className="hover:cursor-pointer"><Link href="/dashboard/print">My QR Code</Link></DropdownMenuItem> 
          {/* <DropdownMenuItem asChild className="hover:cursor-pointer"><Link href="/my-organizations">My Orgs</Link></DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer"><Link href="/dashboard">My Tasks</Link></DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer"><Link href="/create-task">Create Task</Link></DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => signOut({callbackUrl:"/", redirect:true})}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}