import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {

    try {

        const { userId } = auth()
        const { name } = await req.json()

        if (!name || !userId) {
            return new NextResponse("unauthenticated", { status: 400 })
        }


        if (!params.storeId) {
            return new NextResponse("unauthenticated", { status: 400 })
        }


        const response = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            }
            ,
            data: {
                name
            }
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {

        console.log("[STORE_PATCH]", error)
        return new NextResponse("Unknow error occure", { status: 400 })

    }
}



export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {

    try {

        const { userId } = auth()

        if (!userId) {
            return new NextResponse("unauthenticated", { status: 400 })
        }


        if (!params.storeId) {
            return new NextResponse("unauthenticated", { status: 400 })
        }


        const response = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {

        console.log("[STORE_DELETE]", error)
        return new NextResponse("Unknow error occure", { status: 400 })

    }
}

