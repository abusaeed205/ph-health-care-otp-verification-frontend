import RoleGuard from "@/components/auth/role-guard"
import DashboardShell from "@/components/dashboard/dashboard-shell"

import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["PATIENT"]}>
        {/* biome-ignore lint/a11y/useValidAriaRole: role is a custom prop, not ARIA */}
        <DashboardShell role="PATIENT">{children}</DashboardShell>
    </RoleGuard>
  )
}

      
