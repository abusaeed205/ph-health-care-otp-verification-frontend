"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogOut } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
    { name: "Register", url: "/register" },
  ];
   
  // api fetch করা হচ্ছে Hook থেকে  
  const {data,isLoading}=useGetMe()
  const {mutate:logout}=useLogOut()

  const queryClient=useQueryClient()


  const handleLogout=()=>{

    logout(undefined,{
      onSuccess:()=>{
        toast.add({
          title:"Logged out ",
          description:"Logged Out Successfully",
          type:"Success"
        })
        queryClient.removeQueries({queryKey:["user"]})
      },
      onError:()=>{
         toast.add({
          title:"Logout failed",
          description:"something went Wrong",
          type:"error"
        })
      }
    })

  }
 

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div>PH Healthcare</div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
         {!isLoading && !data &&(
           <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            Login
          </Button>
         )}
         {!isLoading && data &&(
           <Button
           onClick={handleLogout}
            variant="destructive"
          >
            logOut
          </Button>
         )}
        </div>
      </div>
    </header>
  );
}
