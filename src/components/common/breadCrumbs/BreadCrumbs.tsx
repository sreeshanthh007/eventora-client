import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbItem,
} from "@/components/pages/ui/breadcrumb"
import { Link, useLocation } from "react-router-dom";


export function Breadcrumbs() {
  const location = useLocation()
  const pathSegments = location.pathname.split("/").filter(Boolean)


  const filteredSegments = pathSegments.filter(
    (seg) => isNaN(Number(seg))
  )


  const formatSegment = (seg: string) =>
    seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {filteredSegments.map((segment, index) => {
          const href = "/" + filteredSegments.slice(0, index + 1).join("/")
          const isLast = index === filteredSegments.length - 1

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbSeparator />
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
