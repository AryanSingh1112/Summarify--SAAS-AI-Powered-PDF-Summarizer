# AI Summarizer - PDF Summarization SaaS

A powerful AI-powered PDF summarization tool built with Next.js, featuring document upload, AI analysis, and intelligent summarization capabilities.

## 🚀 Features

- **AI-Powered Summarization**: Advanced Google Generative AI for document analysis
- **User Authentication**: Secure authentication with Clerk
- **Payment Integration**: PayPal subscription system for Pro plans
- **Real-time Database**: Convex for real-time data synchronization
- **Rich Text Editor**: TipTap editor for enhanced document interaction
- **Responsive Design**: Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Convex (Serverless)
- **AI**: Google Generative AI (Gemini)
- **Authentication**: Clerk
- **Payments**: PayPal
- **Editor**: TipTap
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/AryanSingh1112/Summarify--SAAS-AI-Powered-PDF-Summarizer.git
cd ai-summarization
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## 🚀 Deployment on Vercel

### Step 1: Prepare Environment Variables

Make sure to add these environment variables in your Vercel dashboard:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
NEXT_PUBLIC_PAYPAL_ENV=sandbox
```

### Step 2: Deploy

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

## ⚠️ Important Notes

- Make sure to get your Google AI API key from Google AI Studio
- Set up Convex deployment before deploying to Vercel
- Configure PayPal for payment processing
- Update Clerk webhook URLs for production

## 📁 Project Structure

```
├── app/                  # Next.js app directory
├── components/          # Reusable components
├── convex/             # Convex backend functions
├── lib/                # Utility functions
└── public/             # Static assets
```

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Summarify--SAAS-AI-Powered-PDF-Summarizer
>>>>>>> 7bb3d1819efa2af7d119b07ae26cd62befec0855
=======
# Summarify - AI PDF Summarizer


Summarify is a full-stack AI web application that allows users to **upload any PDF**, process its content with **AI-powered summarization**, and interact with it using **natural language questions**. Unlike most AI tools that only accept plain text, Gistify is designed to **intelligently read and understand complex PDF files**, including research papers, reports, legal documents, and more.

---

## 🚀 Features

- ✅ **Upload PDFs** directly (no copy-pasting needed!)
- 🤖 **Summarize entire PDFs** using LLMs (Gemini)
-  ** Two types of summaries** one is brief summary option and one is for rough idea of file.
- 🧠 **Memory integration** for document-aware conversation
- 🌐 Clean, responsive UI with PDF preview and chat
- 🔒 Secure and privacy-conscious file handling

---

## 🧠 Why Summarify?

> "Most AI tools fail to handle PDFs natively — I built Summarify to bridge that gap."

- While chatbots like ChatGPT or Gemini often require manual copy-pasting, Summarify **extracts content directly from uploaded PDFs**, processes it into chunks, stores embeddings, and enables **contextual interactions**.
- Ideal for **students**, **lawyers**, **researchers**, and **analysts** who regularly work with large documents.

---

## 🏗️ Tech Stack

| Layer         | Technology                     |
|--------------|--------------------------------|
| Frontend     | Next.js 14, Tailwind CSS       |
| Backend      | Convex Functions (Serverless DB) |
| AI/LLM       | Gemini Pro      |
| File Upload  | Convex File Storage            |
| PDF Parsing  | `pdfjs-dist`, `pdf-parse`      |
| Vector Search| Embeddings + Convex Vector DB  |

---



---

## 🛠️ Installation

```bash
git clone https://github.com/yourusername/gistify
cd gistify

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI or Gemini API keys and Convex credentials

# Run locally
npm run dev

>>>>>>> 0f3057c173b5a838fa35b83e5f7d2326071bd2c7
