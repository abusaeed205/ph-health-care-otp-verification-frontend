
const prefix="/dashboard"

export const PatientRoutes=[
    {
      title: "Schedule",
      url: "#",
      items: [
        {
          title: "Overview",
          url: `${prefix}`,
        },
        {
          title: "My Appointments",
          url:`${prefix}/my-appointments`,
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