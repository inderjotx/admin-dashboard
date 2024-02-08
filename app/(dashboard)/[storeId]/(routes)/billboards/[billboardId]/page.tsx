
import React from 'react'
import { BillboardForm } from '../components/billboard-form'

async function page({ params }: { params: { billboardId: string } }) {
    const existingBillboard = await prisma?.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-8 p-6">
                <BillboardForm billboard={existingBillboard || null} />
            </div>
        </div>
    )
}

export default page