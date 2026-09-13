import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, googleAuth, userLogin, userLogOut } from "@/api";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  }); 
} // Headers এ যাবো


export function useLogOut() {
  return useMutation({
    // userlogOut form api 
    mutationFn: userLogOut,
  });
} // Headers এ যাবো


export function useGoogleAuth(){
  return useMutation({
    mutationFn:googleAuth
  })
}//এর পর login-form.tsx এ যাবো 



export function useGetMe(){
  return useQuery({
    queryKey:["user"],// random
    queryFn:getMe,
    retry:false // বার বার যাতে api রিকোয়েস্ট না করে
  })
}// Headers এ যাবো
