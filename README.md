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

