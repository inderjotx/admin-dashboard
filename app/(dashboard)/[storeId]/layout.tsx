import { auth, useAuth } from '@clerk/nextjs'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prisma'
import { Navbar } from '@/components/Navbar'

export default async function DashBoardLayout(
    { children, params }: { children: ReactNode, params: { storeId: string } }) {

    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const response = await prismadb.modal.findFirst({
        where: {
            userId,
            id: params.storeId
        }
    })


    if (!response) {
        redirect("/")
    }

    console.log(response)

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}