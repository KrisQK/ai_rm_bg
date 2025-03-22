"use client";

import type React from "react";

import { useState } from "react";
import { Upload, ImageIcon, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { processImage } from "@/app/actions";
import Image from "next/image";

export default function ImageProcessor() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
        null
    );
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            // Create a preview URL
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);

            // Reset processed image when a new image is selected
            setProcessedImageUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedImage) return;

        try {
            setIsProcessing(true);

            // Create form data to send the image
            const formData = new FormData();
            formData.append("image", selectedImage);

            // Process the image using server action
            const result = await processImage(formData);

            if (result.success && result.processedImageUrl) {
                setProcessedImageUrl(result.processedImageUrl);
            }
        } catch (error) {
            console.error("Error processing image:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = async () => {
        if (!processedImageUrl) return;

        try {
            const response = await fetch(processedImageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "processed-image.png";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    return (
        <div>
            <nav className="mb-6">
                <ul className="flex gap-4 border-b">
                    <li className="border-b-2 border-primary py-2 px-4">
                        <a
                            href="#"
                            className="font-medium"
                        >
                            Image Processing
                        </a>
                    </li>
                    <li className="py-2 px-4">
                        <a
                            href="#"
                            className="text-muted-foreground"
                        >
                            History
                        </a>
                    </li>
                    <li className="py-2 px-4">
                        <a
                            href="#"
                            className="text-muted-foreground"
                        >
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                    <Card className="p-6">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer block"
                                >
                                    {previewUrl ? (
                                        <div className="relative w-full aspect-video mx-auto">
                                            <Image
                                                src={
                                                    previewUrl ||
                                                    "/placeholder.svg"
                                                }
                                                alt="Preview"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="py-8 flex flex-col items-center gap-2">
                                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Click to select an image or drag
                                                and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Supports: JPG, PNG, GIF
                                            </p>
                                        </div>
                                    )}
                                </label>
                            </div>
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

                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Processed Result
                    </h2>
                    <Card className="p-6 h-[400px] flex flex-col">
                        <div className="flex-1 flex items-center justify-center">
                            {processedImageUrl ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={
                                            processedImageUrl ||
                                            "/placeholder.svg"
                                        }
                                        alt="Processed image"
                                        fill
                                        className="object-contain cursor-pointer"
                                        onClick={() => setShowModal(true)}
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                                    <p>Processed image will appear here</p>
                                </div>
                            )}
                        </div>
                        {processedImageUrl && (
                            <Button
                                onClick={handleDownload}
                                className="mt-4 w-full bg-black hover:bg-black/90"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        )}
                    </Card>
                </div>
            </div>

            {/* 图片放大模态框 */}
            {showModal && processedImageUrl && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl h-full max-h-[90vh]">
                        <Button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20"
                            size="icon"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <Image
                            src={processedImageUrl}
                            alt="Processed image"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
