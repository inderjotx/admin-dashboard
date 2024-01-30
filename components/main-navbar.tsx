'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { HTMLAttributes } from "react"


export const MainNav = ({
    className,
    ...params
}: HTMLAttributes<HTMLElement>) => {

    const path = useParams()
    const root = usePathname()

    const routes = [
        {
            href: `/${path.storeId}/settings`,
            isActive: root === `/${path.storeId}/settings`,
            label: "Settings"
        }
    ]

    return (
        <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>

            {
                routes.map((route) => {

                    return (
                        <Link key={route.href}
                            href={route.href}
                            className={cn("text-sm  transition-colors hover:text-primary",
                                route.isActive ? "dark:text-white text-dark " : "text-muted-foreground")}
                        >Settings</Link>
                    )
                })
            }
        </div>
    )

} 