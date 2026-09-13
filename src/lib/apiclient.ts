import { ofetch } from "ofetch";
// backend থেকে localhost import করলাম


const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL

// ofetch হলো ‍axious এর পরিবর্তে 
const apiClient=ofetch.create({
    baseURL:BASE_URL,
    credentials:"include"
})

export default apiClient