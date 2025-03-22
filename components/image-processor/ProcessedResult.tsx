import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePreview } from "./ui/ImagePreview";

interface ProcessedResultProps {
    processedImageUrl: string | null;
    onDownload: () => void;
    setShowModal: (show: boolean) => void;
}

export function ProcessedResult({
    processedImageUrl,
    onDownload,
    setShowModal,
}: ProcessedResultProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Processed Result</h2>
            <Card className="p-6 h-[400px] flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <ImagePreview
                        src={processedImageUrl}
                        alt="Processed image"
                        onClick={() => setShowModal(true)}
                    />
                </div>
                {processedImageUrl && (
                    <Button
                        onClick={onDownload}
                        className="mt-4 w-full bg-black hover:bg-black/90"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                )}
            </Card>
        </div>
    );
}
