"use client"
import { environmentManager, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react";

// নতুন একটি QueryClient তৈরি করার function।
function makeQueryClient(){
    return new QueryClient({
        defaultOptions:{
            queries:{
                staleTime: 60 * 100 // ১মিনিট অপেক্ষার পর fetch করো 
            }
        }
    })
}

// ➡️ Browser-এর জন্য তৈরি করা QueryClient ভেরিয়েবলে রেখে দিচ্ছি,যাতে বারবার নতুন client তৈরি না হয়।

let browserQueryClient: QueryClient | undefined=undefined

function getQueryClient(){
    // যদি Server হয় → নতুন QueryClient তৈরি করবে।
    if(environmentManager.isServer()){
        return makeQueryClient()
    }else{
        if(!browserQueryClient){
            browserQueryClient=makeQueryClient()
        }
        return browserQueryClient
    }
}


// ➡️ যদি Browser হয়:
// - আগে QueryClient তৈরি করা না থাকলে → তৈরি করবে।
// - থাকলে → আগেরটাই ব্যবহার করবে।




//QueryProvider এটা Providers এর index.tsx এ বসাবো  । তার পর সেখান থেকে মেইন Layout এ যাবে
export default function QueryProvider({children}:{children:ReactNode}) {
    const queryClient=getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
