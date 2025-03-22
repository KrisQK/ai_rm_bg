"use server";

import { revalidatePath } from "next/cache";
import { fal } from "@fal-ai/client";

// 初始化 Fal AI 客户端
fal.config({
    credentials: process.env.FAL_KEY,
});

export async function processImage(formData: FormData) {
    try {
        // 获取上传的图片文件
        const imageFile = formData.get("image") as File;

        if (!imageFile) {
            return { success: false, error: "No image provided" };
        }

        // 将文件转换为 base64
        const buffer = await imageFile.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        // 调用 Fal AI 的背景去除 API
        const result = await fal.subscribe("fal-ai/birefnet/v2", {
            input: {
                image_url: `data:image/png;base64,${base64Image}`,
                model: "General Use (Light)",
                operating_resolution: "1024x1024",
                output_format: "png",
                refine_foreground: true,
            },
        });

        // 重新验证路径以更新 UI
        revalidatePath("/");

        return {
            success: true,
            processedImageUrl: result.data.image.url,
        };
    } catch (error) {
        console.error("Error processing image:", error);
        return { success: false, error: "Failed to process image" };
    }
}
