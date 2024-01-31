"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Heading } from "./ui/Heading"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import DeleteAlert from "./modals/delete-modal"
import { ApiAlert } from "./ui/alert-api"

interface SettingsFormProps {
    store: Modal
}


const formSchema = z.object({
    name: z.string().min(1)
})





export const SettingsForm: React.FC<SettingsFormProps> = ({ store }) => {


    const [loading, setLoading] = useState(false)
    const [isOpen, setOpen] = useState<boolean>(false)

    const router = useRouter()


    type settingsFormValues = z.infer<typeof formSchema>

    const form = useForm<settingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: store.name
        }
    })

    const onSubmit = async (values: settingsFormValues) => {
        console.log(values)
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${store.id}`, values)
            toast.success("Store Update Success Fully")

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
            await axios.delete(`/api/stores/${store.id}`)
            toast.success("Store Successfully deleted")
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
                <Heading title="Settings" description="Manage Store Preferences" />
                <Button className="" variant="destructive"
                    disabled={loading}
                    onClick={() => { setOpen(true) }}
                    size="icon" >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-4">

                <Form {...form}  >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-2 lg:col-span-1 space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Store Name " {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Update your store name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button disabled={loading} type="submit">Save Changes</Button>
                    </form>
                </Form>
            </div>
            <Separator />
            <ApiAlert title="Rocket" description="Teri bhan da fuda" variant="public" />
        </>
    )
}