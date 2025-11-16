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


  const filteredSegments = pathSegments.filter((seg) => {
    const isNumber = !isNaN(Number(seg))
    const isHidden = HIDDEN_SEGMENTS.includes(seg.toLowerCase())
    return !isNumber && !isHidden
  })

  const formatSegment = (seg: string) =>
    seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase()) 

  const showHome = role !== "vendor"


  if (filteredSegments.length === 0 && !showHome) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {showHome && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {filteredSegments.map((segment, index) => {
          const href =
            "/" +
            pathSegments
              .slice(0, pathSegments.indexOf(segment))
              .concat(filteredSegments.slice(0, index + 1))
              .filter((s) => !HIDDEN_SEGMENTS.includes(s.toLowerCase()))
              .join("/")

          const isLast = index === filteredSegments.length - 1
          const isFirst = index === 0

          return (
            <BreadcrumbItem key={segment + index}>
              {(showHome || !isFirst) && <BreadcrumbSeparator />}
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