import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Server } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"
import toast from "react-hot-toast"
import { GetOrigin } from "../getorigin"

interface apiAlertProps {
    title: string,
    description: string,
    storeId: string
    variant: "public" | "admin"
}


const textVariant: Record<string, string> = {
    admin: "Admin",
    public: "Public"
}

const styleVariant: Record<string, string> = {
    admin: "destructive",
    public: "secondary"
}



export const ApiAlert = ({ title, description, variant, storeId }: apiAlertProps) => {

    const handleSelect = () => {
        navigator.clipboard.writeText(description)
        toast.success("Copied to Clipboard")
    }

    const origin = GetOrigin()


    return (
        <Alert className="space-y-3">
            < div className="flex space-x-1 items-start" >
                <Server className="h-4 w-4" />
                <AlertTitle className="text-md" >{title} <Badge variant={styleVariant[variant]} >{textVariant[variant]} </Badge> </AlertTitle>
            </ div>
            <div className="flex justify-between items-center">
                <AlertDescription className="bg-secondary  sinline-block font-medium  p-1 rounded-md">
                    {`${origin}/api/${storeId}`}
                </AlertDescription>
                <Button type="button" onClick={handleSelect} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>

        </Alert >

    )
}