import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadArea } from "./ui/UploadArea";
import type React from "react";

interface ImageUploaderProps {
    previewUrl: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    selectedImage: File | null;
    isProcessing: boolean;
}

export function ImageUploader({
    previewUrl,
    onImageChange,
    onSubmit,
    selectedImage,
    isProcessing,
}: ImageUploaderProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <Card className="p-6">
                <form
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <UploadArea
                        previewUrl={previewUrl}
                        onImageChange={onImageChange}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!selectedImage || isProcessing}
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Process Image
                            </span>
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
