"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogOut } from "@/hooks";
import { UserRole } from "@/types/user.type";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "Doctor", url: "/doctors" },
  ];

  // Role অনুযায়ী ড্যাশবোর্ড দেখাবে 
  const dashboardRoute:Record<UserRole,string>={
    SUPER_ADMIN:"/admin",
    ADMIN:"/admin",
    DOCTOR:"/doctor",
    PATIENT:"/dashboard"
  }
   
  // api fetch করা হচ্ছে Hook থেকে  
  const {data,isLoading}=useGetMe()
  const {mutate:logout}=useLogOut()

  const queryClient=useQueryClient()

  // data api থেকে আসতেছে  
  const role:UserRole =!!data?.data&& data?.data.role


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
          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
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
