import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {
        const { userId } = auth()
        const body = await req.json()
        const { name } = body

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 400 })
        }

        if (!name) {
            return new NextResponse("Name is required parameter", { status: 400 })
        }

        const response = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(response)
    }

    catch (error) {
        console.log("[STORES_POST]", error)
        return new NextResponse("Internal Error ", { status: 500 })
    }
}