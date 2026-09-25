"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AdminRoutes, DoctorRoutes, PatientRoutes } from "@/routes";
import { sidebarItems } from "@/types/sidebar.type";
import { UserRole } from "@/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";


// Routes থেকে আসছে ROLE অনুযায়ী Sidebar Routes নির্বাচন করবে
const sidebarRoutes: Partial<Record<UserRole, sidebarItems>> = {
  // User-এর role যদি ADMIN হয়,
  // তাহলে AdminRoutes ব্যবহার করবে।
  ADMIN: AdminRoutes,
  DOCTOR: DoctorRoutes,
  SUPER_ADMIN: [], // যোগ করুন
  PATIENT: PatientRoutes,
};

export function DashboardSitebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  // User-এর role অনুযায়ী routes বের করছি।(sidebarRoutes উপর থেকে আসছে)
  const routes = sidebarRoutes[role];

  console.log(pathname)



  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>Hp health Logo</Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {(routes ?? []).map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
