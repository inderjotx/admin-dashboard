'use client'

import { useState, useEffect, ReactNode } from 'react'
import { StoreModal } from '../modals/state-modal'
export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) return null
    return (
        <>
            <StoreModal />
        </>
    )

} 