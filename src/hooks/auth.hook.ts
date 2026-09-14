import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, googleAuth, userLogin, userLogOut, userRegistation, verifyAccout } from "@/api";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,  // form api 
  }); 
} // Headers এ যাবো


export function useRegistetion() {
  return useMutation({
    mutationFn: userRegistation, // Api থেকে আসতেছে 
  }); 
} 

export function useVerifyAccount() {
  return useMutation({
    mutationFn:verifyAccout, //Api থেকে আসতেছে 
  }); // verify form এ যাবো
} 


export function useLogOut() {
  return useMutation({
    // userlogOut form api 
    mutationFn: userLogOut, // form api 
  });
} // Headers এ যাবো


export function useGoogleAuth(){
  return useMutation({
    mutationFn:googleAuth // form api 
  })
}//এর পর login-form.tsx এ যাবো 



export function useGetMe(){
  return useQuery({
    queryKey:["user"],// random
    queryFn:getMe,
    retry:false // বার বার যাতে api রিকোয়েস্ট না করে
  })
}// Headers এ যাবো
