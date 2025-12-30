import {Link} from "react-router"
import {ChevronRight} from "lucide-react"

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export function Breadcrumbs({items}: BreadcrumbsProps) {
    return (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight className="h-4 w-4"/>}
                    <Link to={item.href} className="transition-colors hover:text-foreground hover:underline">
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    )
}


