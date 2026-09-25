"use client";

import { useGetMe } from "@/hooks"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react"
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types/user.type";
import AccessDenided from "./access-denided";

interface IProps{
    children:ReactNode
    roles:UserRole[]
}


export default function RoleGuard({children,roles}:IProps) {
    const router=useRouter()

    const {data,isPending,isError}=useGetMe() // form auth hook

    const user=data?.data

    const isAuthorized=!!user && roles.includes(user.role)

    // যদি isError অথবা user যদি হয় তাহলে login পেইজে পাঠায় দাও
   useEffect(()=>{

    if(isPending){
        return
    }
    if(isError ||!user){
        router.replace("/login")
    }

    },[isPending,isError, router, user]) 

    // পেনডিং হতলে spenner দেখাও 
    if(isPending){
        return <AuthLoading></AuthLoading>
    }
    if(isError ||!user){
        return <AuthLoading label="Redirecting..." />
    }

    if(isAuthorized){
        return <>{children}</>
    }

    return <AccessDenided></AccessDenided>
     
//   return (
//     <div>
//      {children}
//     </div>
//   )
}

//এটা dashboard গ্রুপের Admin লে-আউটে এটা কল করা হয়েছে 