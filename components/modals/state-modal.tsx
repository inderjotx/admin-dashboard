'use client'
import * as z from "zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from "react"


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem
    , FormLabel
    , FormControl,
    FormMessage
} from "@/components/ui/form"
import toast from "react-hot-toast"



const formType = z.object({
    name: z.string().min(1, "Modal can't have null name"),

}
)

export const StoreModal = () => {
    const { isOpen, onClose } = useStoreModal()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formType>>({
        resolver: zodResolver(formType),
        defaultValues: {
            name: ""
        }
    })


    const onSubmit = async (formdata: z.infer<typeof formType>) => {

        try {
            setLoading(true)
            console.log(formdata);
            const response = await axios.post("/api/stores", formdata)
            console.log(response.data)
            toast.success("Create Modal Successfully")
            window.location.assign(`/${response.data.id}`)

        }

        catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Title" description="This is some random description panda" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>

                                    <Input disabled={loading} placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>

                        )}
                    />
                    <div className="flex justify-end items-center space-x-3">
                        <Button disabled={loading} variant="outline" onClick={onClose} >Cancel</Button>
                        <Button disabled={loading} type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )

}
