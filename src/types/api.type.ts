// api ফেস করার পর যেটা পাই সেটাই ্টাইপ এটা 



export interface ApiResponse<T>{
    success:boolean,
    statusCode:number,
    massage:string
    data:T
    meta:Meta
}

export interface Meta{
    page:number
    limit:number
    total:number
    totalPages:number
}