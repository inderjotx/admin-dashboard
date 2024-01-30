import { UserButton, auth } from "@clerk/nextjs"
import { MainNav } from "./main-navbar"
import { StoreSwitcher } from "./store-switcher"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prisma"



export const Navbar = async () => {

    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const modals = await prismadb.modal.findMany({
        where: {
            userId
        }
    })

    const stores = await prismadb.modal.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="border-b pt-2 ">
            <div className="flex px-3    items-center h-12 ">
                <div className="">
                    <StoreSwitcher items={modals} />
                </div>
                <div className="px-4">
                    <MainNav />
                </div>
                <div className="ml-auto space-x-2">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}