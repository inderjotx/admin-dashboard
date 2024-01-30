import { create } from 'zustand'


interface useStoreModalStoreProps {
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void,
}

export const useStoreModal = create<useStoreModalStoreProps>((set) => {

    return ({
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false })
    }
    )
})