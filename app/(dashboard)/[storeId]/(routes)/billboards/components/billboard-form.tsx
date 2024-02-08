"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Heading } from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import DeleteAlert from "@/components/modals/delete-modal"
import { ApiAlert } from "@/components/ui/alert-api"

interface BillboardFormProps {
    billboard: Billboard | null
}


const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})





export const BillboardForm: React.FC<BillboardFormProps> = ({ billboard }) => {


    const [loading, setLoading] = useState(false)
    const [isOpen, setOpen] = useState<boolean>(false)

    const router = useRouter()

    const title = billboard ? "Edit  Billboard" : "Create  Billboard"
    const description = billboard ? "Edit  Billboard" : "Create a Billboard"
    const toastMessage = billboard ? "Billboard updated " : "Billboard created successfully"
    const action = billboard ? "Save Changes " : "Create Billboard"


    type BillboardFormValues = z.infer<typeof formSchema>

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: billboard || {
            label: "",
            imageUrl: ""
        }

    })

    const onSubmit = async (values: BillboardFormValues) => {
        console.log(values)
        try {
            setLoading(true)
            // await axios.patch(`/api/stores/${billboard.id}`, values)
            toast.success(toastMessage)

            router.refresh()

        }
        catch (error) {
            console.log(error)
            toast.error("Some Error Occured ")
        }
        finally {
            setLoading(false)
        }
    }



    const onDelete = async () => {
        try {
            setLoading(true)
            // await axios.delete(`/api/stores/${billboard.id}`)
            toast.success(toastMessage)
            router.refresh()

        }
        catch (error) {
            console.log(error)
            toast.error("Some Error Occured ")
        }
        finally {
            setLoading(false)
        }
    }



    return (
        <>
            <DeleteAlert isOpen={isOpen} onDelete={onDelete} onCancel={() => { setOpen(false) }} />
            <div className="flex justify-between">
                <Heading title={title} description={description} />
                {
                    billboard && (
                        <Button className="" variant="destructive"
                            disabled={loading}
                            onClick={() => { setOpen(true) }}
                            size="icon" >
                            <Trash className="w-4 h-4" />
                        </Button>
                    )
                }
            </div>
            <Separator />
            <div className="grid grid-cols-4">

                <Form {...form}  >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-2 lg:col-span-1 space-y-6">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Label</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Billboard Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button disabled={loading} type="submit">{action}</Button>
                    </form>
                </Form>
            </div>
            <Separator />
        </>
    )
}