import apiClient from "@/lib/apiclient";
import { LoginPayload, registrationPayload, verifyAccountPayload } from "@/types";

export function userLogin(payload:LoginPayload) {
  // backend postman থেকে পাই  /auth/login
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function verifyAccout(payload:verifyAccountPayload) {
  // backend postman থেকে পাই  /auth/login
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
}

// registrationPayload  form  types  
export function userRegistation(payload:registrationPayload) {
  // backend postman থেকে পাই  /auth/login
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function userLogOut() {
  // backend postman থেকে পাই  /auth/login-------++++++]]]][]
  return apiClient("/auth/logout", { method: "POST"});
}

export function getMe() {
  // backend postman থেকে পাই  /auth/login
  return apiClient("/auth/me", { method: "GET"});
}


export function googleAuth(payload:{idToken:string}){
  return apiClient("/auth/google",{method:"POST", body:payload})
}

// এর পর এখান থেকে hooks এ যাবো  