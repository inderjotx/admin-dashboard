import { SettingsForm } from "@/components/settings-form"
import prismadb from "@/lib/prisma"
import { auth } from "@clerk/nextjs"
import { redirect, useParams } from "next/navigation"

interface PageProps {
    params: {
        storeId: string
    }
}

const Page: React.FC<PageProps> = async ({ params }) => {

    const storedId = params.storeId

    const { userId } = auth()

    if (!userId) {
        redirect("/sign-up")
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId,
            id: storedId
        }
    })


    if (!store) {
        redirect("/")
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-8 p-6">
                <SettingsForm store={store} />
            </div>
        </div>
    )
}

export default Page; 