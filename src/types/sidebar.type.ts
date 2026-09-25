export interface sidebarItem{
title:string
url:string
}


export interface sidebarGroup{
title:string
items:sidebarItem[]
}

export type sidebarItems=sidebarGroup[]


//  {
//       title: "Manegment",
//       url: "#",
//       items: [
//         {
//           title: "Overview",
//           url: "/admin",
//         },
//         {
//           title: "Doctor Approval",
//           url: "/admin/approve-doctor",
//         },
//       ],
//     },