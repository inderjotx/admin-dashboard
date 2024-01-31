'use client'

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Check, PlusCircle } from "lucide-react"

import { Store } from "@prisma/client"
import { Popover, PopoverContent } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { ChevronsUpDown, Store as StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandSeparator } from "./ui/command"
import { CommandEmpty, CommandInput, CommandList, CommandGroup, CommandItem } from "./ui/command"


type PopoverType = React.ComponentPropsWithoutRef<typeof PopoverTrigger>


interface StoreSwitcherProps extends PopoverType {
    items: Store[]
}



export const StoreSwitcher = ({
    className,
    items = []
}: StoreSwitcherProps) => {


    const path = useParams()
    const router = useRouter()
    const { onOpen } = useStoreModal()

    const [open, setOpen] = useState(false)

    const formattedStore = items.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })


    const currentStore = formattedStore.find(store => (
        store.value === path.storeId
    ))


    const onSelect = (store: typeof currentStore) => {
        setOpen(false)
        router.push(`/${store?.value}`)
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedStore.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onSelect(store)}
                                    className="text-sm"
                                >
                                    {/* <Store className="mr-2 h-4 w-4" /> */}
                                    <StoreIcon className="mr-2 h-4 w-4 " />
                                    {store.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === store.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )

}