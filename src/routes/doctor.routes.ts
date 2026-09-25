
const prefix="/doctor"

export const DoctorRoutes=[
    {
      title: "Schedule",
      url: "#",
      items: [
        {
          title: "Overview",
          url: `${prefix}`,
        },
        {
          title: "create Schedule",
          url:`${prefix}/schedules`,
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