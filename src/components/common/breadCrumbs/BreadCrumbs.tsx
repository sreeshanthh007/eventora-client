import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbItem,
} from "@/components/pages/ui/breadcrumb"
import { Link, useLocation } from "react-router-dom"
import type { UserRole } from "@/types/UserRoles"

interface BreadcrumbsProps {
  role?: UserRole
}

const HIDDEN_SEGMENTS = ["client", "vendor", "admin"]

export function Breadcrumbs({ role }: BreadcrumbsProps) {
  const location = useLocation()
  const pathSegments = location.pathname.split("/").filter(Boolean)

  const visibleSegments = pathSegments.filter((seg) => {
    const isNumber = !isNaN(Number(seg))
    const isHidden = HIDDEN_SEGMENTS.includes(seg.toLowerCase())
    return !isNumber && !isHidden
  })

  const formatSegment = (seg: string) =>
    seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())


  const getHomePath = () => {
    if (role === "vendor" && pathSegments.includes("vendor")) {
      return "/vendor"
    }
    if (role === "client" && pathSegments.includes("client")) {
      return "/client"
    }
    return "/" 
  }

  const homePath = getHomePath()

  const showHome = role !== "vendor" || visibleSegments.length > 0

  if (visibleSegments.length === 0 && !showHome) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {showHome && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={homePath}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {visibleSegments.map((segment, index) => {
          const isLast = index === visibleSegments.length - 1
     
          const href = "/" + visibleSegments.slice(0, index + 1).join("/")

          return (
            <BreadcrumbItem key={segment + index}>
              {(showHome || index > 0) && <BreadcrumbSeparator />}
              {isLast ? (
                <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={href}>{formatSegment(segment)}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}