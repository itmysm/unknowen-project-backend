import { Button } from "@nextui-org/button";
import { UploadFile } from "../icons/icons";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast"
import useAppStore from "@/stores/app/useAppStore";
import { ExportedTransactionDetails } from "@/types";


const acceptableExtensions = ['.json'];

interface FileInputButtonProps {
    onFileSelect: (file: File) => void
}

export default function FileInputButton({ onFileSelect }: FileInputButtonProps) {
    const [exportedTransactionDetails, setExportedTransactionDetails] = useState<ExportedTransactionDetails | null>(null)
    const { isFileUploaded } = useAppStore()
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const extractFunctions = {
        tonScan: () => { /* Function for tonScan */ console.log('Extracting for tonScan'); },
        anotherSite: () => { /* Function for anotherSite */ console.log('Extracting for anotherSite'); },
        // Add other site-specific extract functions here
    };

    const onUploadNewFile = (e: File) => {
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (acceptableExtensions.includes(fileExtension)) {
                // Read the file content
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target) {
                        try {
                            const exportedTransactionDetails: ExportedTransactionDetails = JSON.parse(event.target.result as string);
                            const exportType: string = exportedTransactionDetails?.SiteName;
                            if (exportType) {
                                extractFunctions[exportType]
                            } else {
                                toast.error("File Format Is Not Standard")
                            }
                            onFileSelect(file);
                        } catch (error) {
                            alert(error);
                        }
                    } else {
                        console.log('Error kjshfkj fhqwekjhwqe');
                    }
                };
                reader.readAsText(file);
            } else {
                alert('File type not supported.');
            }
        } else {
            console.log('No file uploaded.');
        }
    }

    return (
        <Button
            className={`text-default-600 bg-default-100 min-w-16 md:min-w-fit ${isFileUploaded ? '' : 'animate-wiggle'}`}
            startContent={<UploadFile className="w-6 h-6 text-danger" />}
            variant="flat"
            onClick={() => fileInputRef?.current?.click()}
        >
            <input type="file" className="hidden" ref={fileInputRef} accept={acceptableExtensions.join(",")} onChange={(e) => onUploadNewFile(e)} />
            <p className="hidden md:flex text-sm">Upload File</p>
        </Button>
    )
}
