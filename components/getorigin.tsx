"use client"

import { useState, useEffect } from 'react'



export function GetOrigin() {

    useEffect(() => {

        setMounted(true)
    }, [])


    const [isMounted, setMounted] = useState<boolean>(false)


    if (!isMounted) {
        return null
    }
    else {
        return window.location.origin
    }



}
