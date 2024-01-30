"use client"

import * as z from "zod"
import { Modal } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Heading } from "./ui/Heading"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

interface SettingsFormProps {
    store: Modal
}


const formSchema = z.object({
    name: z.string().min(1)
})





export const SettingsForm: React.FC<SettingsFormProps> = ({ store }) => {

    type settingsFormValues = z.infer<typeof formSchema>

    const form = useForm<settingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: store
    })




    return (
        <>
            <div className="flex justify-between">
                <Heading title="Pikka" description="Do something bro" />
                <Button className="" variant="destructive"
                    onClick={() => { }}
                    size="icon" >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
        </>
    )
}