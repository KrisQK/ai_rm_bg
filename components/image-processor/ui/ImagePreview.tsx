import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface ImagePreviewProps {
    src: string | null;
    alt: string;
    className?: string;
    onClick?: () => void;
    showPlaceholder?: boolean;
}

export function ImagePreview({
    src,
    alt,
    className = "",
    onClick,
    showPlaceholder = true,
}: ImagePreviewProps) {
    if (!src && showPlaceholder) {
        return (
            <div className="text-center text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                <p>No image to display</p>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                fill
                className={`object-contain ${onClick ? "cursor-pointer" : ""}`}
                onClick={onClick}
            />
        </div>
    );
}
