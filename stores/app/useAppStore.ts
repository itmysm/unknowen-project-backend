import { create } from 'zustand';

export interface AppStoreModel {
    isFileUploaded: Boolean,
    fileInfo: { name: string, size: number } | null
    setFileStatus: (payload: { name: string, size: number }) => void
    removeFile: () => void
}

const useAppStore = create<AppStoreModel>((set, get) => ({
    isFileUploaded: false,
    fileInfo: null,
    removeFile: () => {
        return set({ isFileUploaded: false, fileInfo: null })
    },
    setFileStatus: ({ name, size }) => {
        return set({ isFileUploaded: true, fileInfo: { name, size } })
    }
}));

export default useAppStore;
