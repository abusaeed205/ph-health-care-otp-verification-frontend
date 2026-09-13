import apiClient from "@/lib/apiclient";

export function userLogin(payload: { email: string; password: string }) {
  // backend postman থেকে পাই  /auth/login
  return apiClient("/auth/login", { method: "POST", body: payload });
}
export function userLogOut() {
  // backend postman থেকে পাই  /auth/login
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