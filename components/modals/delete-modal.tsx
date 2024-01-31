"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface DeleteAlertProps {

    isOpen: boolean,
    onDelete: () => void,
    onCancel: () => void,
}




import React, { useEffect, useState } from 'react'
import { boolean } from "zod"
import { Button } from "../ui/button"

function DeleteAlert({ isOpen, onDelete, onCancel }: DeleteAlertProps) {

    const [isMounted, setIsMounted] = useState(false)


    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) return <></>


    return (
        <Dialog open={isOpen}  >
            <DialogContent className="h-40">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        You would not be able to delete the store unless you delete all items and subscriptions
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onCancel} variant="outline" type="button"  >
                        Cancel
                    </Button>
                    <Button onClick={onDelete} variant="destructive" type="button" >
                        Continue
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default DeleteAlert