import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from '@clerk/nextjs'
import prismadb from "@/lib/prisma";

export default async function FirstModalLayout(
    { children }: { children: ReactNode }
) {


    const { userId } = auth();

    if (!userId) {
        redirect("/sign-up")
    }






    const store = await prismadb.modal.findFirst({
        where: {
            userId
        }
    })


    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}