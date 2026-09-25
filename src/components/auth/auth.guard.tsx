"use client";

import { useGetMe } from "@/hooks"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react"
import AuthLoading from "./auth-loading";

export default function AuthGuard({children}:{children:ReactNode}) {
    const router=useRouter()

    const {data,isPending,isError}=useGetMe() // form auth hook

    const user=data?.data

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
     
  return (
    <div>
     {children}
    </div>
  )
}

//এই dashboard গ্রুপের মেইন লে-আউটে এটা কল করা হয়েছে 