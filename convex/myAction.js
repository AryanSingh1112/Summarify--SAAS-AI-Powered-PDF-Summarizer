import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action, query } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

// INGEST PDF TEXT
export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => ({ fileId: args.fileId })),
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Ingestion completed";
  },
});

// SEMANTIC SEARCH
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorstore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const resultOne = await vectorstore.similaritySearch(args.query, 1);
    const filteredResults = resultOne.filter(
      (q) => q.metadata.fileId === args.fileId
    );

    return JSON.stringify(filteredResults);
  },
});

// GENERATE LONG SUMMARY
export const generateLongSummary = internalAction({
  args: { fileId: v.id("files") },
  handler: async (ctx, { fileId }) => {
    const file = await ctx.runQuery(api.files.getFileContent, { fileId });

    if (!file || !file.content) throw new Error("File content not found");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are a world-class AI summarizer.

Your task is to write a detailed and structured **long-form summary** of the document provided below.

Requirements:
- Use **5 to 8 paragraphs** of well-structured, natural-sounding language.
- Capture the **full scope and logic** of the document.
- Group similar ideas into sections where appropriate.
- You may use headings like **"Overview"**, **"Main Arguments"**, or **"Conclusion"** to organize the content.
- Write in a clear, human-like tone that is **insightful and pleasant to read**.

Here is the document:
"""
${file.content}
"""`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  },
});

export const generateShortSummary = internalAction({
  args: { fileId: v.id("files") },
  handler: async (ctx, { fileId }) => {
    const file = await ctx.runQuery(api.files.getFileContent, { fileId });

    if (!file || !file.content) throw new Error("File content not found");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are an expert at condensing complex documents into digestible key points.

Your task is to create a **short summary** of the document below in exactly **10 bullet points**.

Each bullet point should be:
- 1 to 2 lines long
- Capture a key idea or insight
- Written in clear, professional language

Here is the document:
"""
${file.content}
"""`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  },
});


// GET FILES
export const GetUserFiles = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();

    return JSON.stringify(result);
  },
});
