// npm i @react-oauth/google
 "use client"
import { GoogleOAuthProvider as GoogleProvider } from '@react-oauth/google';
import { ReactNode } from 'react';

export default function GoogleOAuthProvider({children}:{children:ReactNode}) {
    const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

    if(!clientId){
        return <>{children}</>
    }



  return (
    <GoogleProvider clientId={clientId}>
      {children}
    </GoogleProvider>
  )
}


//GoogleOAuthProvider এটা Providers এর index.tsx এ বসাবো  
// তার পর 
// এর পর এখান থেকে Api তে ফাংশন বানবো  