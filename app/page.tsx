import ImageProcessor from "@/components/image-processor";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b bg-gradient-to-r from-gray-100 to-gray-50">
                <div className="container mx-auto py-6 px-4">
                    <h1 className="text-2xl font-medium text-gray-800 flex items-center gap-2 animate-fade-in">
                        <img
                            src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg"
                            alt="Background Removal"
                            className="w-6 h-6 object-cover rounded"
                        />
                        <span>Background Removal Tool</span>
                    </h1>
                </div>
            </header>

            <main className="flex-1 container mx-auto py-8 px-4">
                <ImageProcessor />
            </main>

            <footer className="border-t">
                <div className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Image Processing App by{" "}
                    <span className="font-bold text-primary">FusionHub</span>,
                    Auckland, New Zealand. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
