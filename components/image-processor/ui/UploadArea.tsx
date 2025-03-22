import { ImageIcon } from "lucide-react";
import { ImagePreview } from "./ImagePreview";

interface UploadAreaProps {
    previewUrl: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export function UploadArea({
    previewUrl,
    onImageChange,
    className = "",
}: UploadAreaProps) {
    return (
        <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors ${className}`}
        >
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
            />
            <label
                htmlFor="image-upload"
                className="cursor-pointer block"
            >
                {previewUrl ? (
                    <div className="relative w-full aspect-video mx-auto">
                        <ImagePreview
                            src={previewUrl}
                            alt="Preview"
                        />
                    </div>
                ) : (
                    <div className="py-8 flex flex-col items-center gap-2">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            Click to select an image or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Supports: JPG, PNG, GIF
                        </p>
                    </div>
                )}
            </label>
        </div>
    );
}
