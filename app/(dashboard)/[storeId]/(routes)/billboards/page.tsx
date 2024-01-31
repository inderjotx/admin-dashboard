'use client'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {

    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className='flex justify-between items-center mt-8 p-4'>
                <Heading title='Billboards' description='Manage Billboards for your Stores' />
                <Button onClick={() => { router.push(`${params.storeId}/billboards/new`) }}  ><Plus className='mr-3 h-4 w-4' />Add New </Button>
            </div>
            <Separator />
        </>
    )
}
