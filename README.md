# Background Removal Tool

一个使用 AI 去除图片背景的 Web 应用。

## 功能特点

-   上传图片并预览
-   AI 自动去除背景
-   下载处理后的图片
-   响应式设计
-   简洁的用户界面

## 技术栈

-   Next.js 15
-   React 19
-   TypeScript
-   Tailwind CSS
-   Vercel Blob Storage
-   FAL AI API

## 本地开发

1. 克隆项目

```bash
git clone [your-repo-url]
cd remove-bg-k
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 环境变量

创建 `.env.local` 文件并添加以下环境变量：

```env
FAL_KEY=your_fal_ai_key
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## 部署

项目使用 Vercel 部署，支持自动部署和预览部署。

## 许可证

MIT
