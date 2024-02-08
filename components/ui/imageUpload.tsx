import { useEffect, useState, FC } from "react"

interface ImageUploadProps {
    onRemove: (url: string) => void
    onChange: (url: string) => void
    value: string[]
}



export const ImageUpload: FC<ImageUploadProps> = async ({
    onRemove,
    onChange,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false)


    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) {
        return null
    }


    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }



    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map((url) => (
                        <div className="" key={url}>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

