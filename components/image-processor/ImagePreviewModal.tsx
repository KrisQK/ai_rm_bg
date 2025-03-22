import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePreview } from "./ui/ImagePreview";

interface ImagePreviewModalProps {
    showModal: boolean;
    processedImageUrl: string | null;
    onClose: () => void;
}

export function ImagePreviewModal({
    showModal,
    processedImageUrl,
    onClose,
}: ImagePreviewModalProps) {
    if (!showModal || !processedImageUrl) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl h-full max-h-[90vh]">
                <Button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20"
                    size="icon"
                >
                    <X className="h-4 w-4" />
                </Button>
                <ImagePreview
                    src={processedImageUrl}
                    alt="Processed image"
                    showPlaceholder={false}
                />
            </div>
        </div>
    );
}
