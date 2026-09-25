

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardSitebar } from "./dashboard-sitebar"
import { ReactNode } from "react"
import { UserRole } from "@/types/user.type"

//----------- PROVIDER------------
//➡️ Provider/index.tsx এর মধ্যে TooltipProvider নামে একটা প্রভাইডার যুক্ত করেছি

export default function DashboardShell({children,role}:{children:ReactNode,role:UserRole}) {
  // Doctor || admin || patient এর Dashboard Layout থেকে Props এর মাধ্যমে Role and children আসছে
  return (
    <SidebarProvider>
      <DashboardSitebar role={role}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

//note : admin dashbord এর Layout থেকে children রিছিব করতেছি তার পর সেটা এখানে আসতেছে 