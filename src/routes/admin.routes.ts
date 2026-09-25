
const prefix="/admin"

export const AdminRoutes=[
    {
      title: "Manegment",
      url: "#",
      items: [
        {
          title: "Overview",
          url: `${prefix}`,
        },
        {
          title: "Approval Doctor",
          url:`${prefix}/approve-doctor`,
        },
      ],
    },
    {
      title: "App Settings",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        }
      
      ],
    },
  ]