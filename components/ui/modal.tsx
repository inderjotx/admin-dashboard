'use client'
import { ReactNode, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


interface ModelPropts {
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void,
    children?: ReactNode,
}

export const Modal: React.FC<ModelPropts> = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {


    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (

        <div>

            <Dialog open={isOpen} onOpenChange={onChange}>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        {children}
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}