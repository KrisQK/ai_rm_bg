"use client";

import { useState } from "react";
import { processImage } from "@/app/actions";
import { Navigation } from "./Navigation";
import { ImageUploader } from "./ImageUploader";
import { ProcessedResult } from "./ProcessedResult";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { Settings } from "./Settings";

type Tab = "processing" | "history" | "settings";

export default function ImageProcessor() {
    // 状态管理
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
        null
    );
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("processing");

    // 事件处理函数
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setProcessedImageUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedImage) return;

        try {
            setIsProcessing(true);
            const formData = new FormData();
            formData.append("image", selectedImage);
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

    const renderContent = () => {
        switch (activeTab) {
            case "processing":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUploader
                            previewUrl={previewUrl}
                            onImageChange={handleImageChange}
                            onSubmit={handleSubmit}
                            selectedImage={selectedImage}
                            isProcessing={isProcessing}
                        />
                        <ProcessedResult
                            processedImageUrl={processedImageUrl}
                            onDownload={handleDownload}
                            setShowModal={setShowModal}
                        />
                    </div>
                );
            case "history":
                return (
                    <div className="text-center text-muted-foreground py-8">
                        <p>History feature coming soon...</p>
                    </div>
                );
            case "settings":
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <Navigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            {renderContent()}
            <ImagePreviewModal
                showModal={showModal}
                processedImageUrl={processedImageUrl}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}
