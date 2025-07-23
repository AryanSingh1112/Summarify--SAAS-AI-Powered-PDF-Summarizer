import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action, query } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
    args: {
        splitText: v.any(),
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        await ConvexVectorStore.fromTexts(
            args.splitText,
            args.splitText.map(() => ({ fileId: args.fileId })), // ✅ this maps properly now
            new GoogleGenerativeAIEmbeddings({
                apiKey: 'AIzaSyBPN3yAR40Fx5fjniiQiRaCE2D3K-hHcuo',
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title",
            }),
            { ctx }
        );

        return "completed...";
    },
});

export const search = action({
    args:{
        query: v.string(),
        fileId: v.string()
    },

    handler: async (ctx,args)=>{
        const vectorstore = new ConvexVectorStore(
             new GoogleGenerativeAIEmbeddings({
                apiKey: 'AIzaSyBPN3yAR40Fx5fjniiQiRaCE2D3K-hHcuo',
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title",
            }),
            {ctx}
        );
        const resultOne = await vectorstore.similaritySearch(args.query , 1);
        const filteredResults = resultOne.filter(q=>q.metadata.fileId === args.fileId);

        return JSON.stringify(filteredResults);
    }
})

export const generateLongSummary = action({
    args: {
        fileId: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const vectorstore = new ConvexVectorStore(
                new GoogleGenerativeAIEmbeddings({
                    apiKey: 'AIzaSyBPN3yAR40Fx5fjniiQiRaCE2D3K-hHcuo',
                    model: "text-embedding-004",
                    taskType: TaskType.RETRIEVAL_DOCUMENT,
                    title: "Document title",
                }),
                { ctx }
            );

            // Get ALL content chunks from the document (much more comprehensive)
            const results = await vectorstore.similaritySearch("document text content information data", 50);
            const filteredResults = results.filter(q => q.metadata.fileId === args.fileId);

            if (filteredResults.length === 0) {
                return "No content found for this document.";
            }

            // Combine ALL available content from the document
            const documentContent = filteredResults.map(result => result.pageContent).join('\n\n');

            // Initialize Google Generative AI
            const genAI = new GoogleGenerativeAI('AIzaSyBPN3yAR40Fx5fjniiQiRaCE2D3K-hHcuo');
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `You are an expert document analyst. Please read through the entire document content below and create a comprehensive, well-structured, and beautifully formatted summary.

Please provide:

## 📄 COMPREHENSIVE DOCUMENT ANALYSIS

### 🎯 Document Overview
- Brief description of what this document is about
- Type of document (research paper, report, manual, etc.)
- Main subject area or field

### 📋 Key Information
- Primary objectives or goals
- Main topics covered
- Important findings or conclusions
- Critical data, statistics, or evidence presented

### 🔍 Detailed Analysis
- Methodology or approach used (if applicable)
- Major sections and their content
- Significant insights or discoveries
- Any recommendations or action items

### 💡 Key Takeaways
- Most important points readers should remember
- Practical implications or applications
- Future considerations or next steps

### 📊 Summary Highlights
- Notable quotes or statements
- Important numbers, dates, or metrics
- Conclusions and final thoughts

Please make the summary engaging, informative, and easy to read. Use clear headings and bullet points where appropriate.

---

DOCUMENT CONTENT:
${documentContent}

---

Please provide a comprehensive and beautifully formatted analysis:`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();

        } catch (error) {
            return "Error generating summary. Please try again.";
        }
    }
});

export const generateShortSummary = action({
    args: {
        fileId: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const vectorstore = new ConvexVectorStore(
                new GoogleGenerativeAIEmbeddings({
                    apiKey: 'AIzaSyBPN3yAR40Fx5fjniiQiRaCE2D3K-hHcuo',
                    model: "text-embedding-004",
                    taskType: TaskType.RETRIEVAL_DOCUMENT,
                    title: "Document title",
                }),
                { ctx }
            );

            // Get substantial content for quality brief summary (more than before)
            const results = await vectorstore.similaritySearch("main content overview summary document", 25);
            const filteredResults = results.filter(q => q.metadata.fileId === args.fileId);

            if (filteredResults.length === 0) {
                return "No content found for this document.";
            }

            // Combine substantial content for better analysis
            const documentContent = filteredResults.map(result => result.pageContent).join('\n\n');

            // Initialize Google Generative AI
            const genAI = new GoogleGenerativeAI('AIzaSyBPN3yAR40Fx5fjniiQiRaCE2D3K-hHcuo');
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `You are an expert at creating concise, impactful summaries. Please read through the entire document content and create a brief but comprehensive summary that captures the essence of the document.

Please provide:


### 🎯 What This Document Is About
Write 2-3 sentences explaining the core purpose and subject of this document.

### ⭐ Key Highlights
- 4-5 most important points or findings
- Critical information readers must know
- Main conclusions or outcomes

### 💼 Practical Impact
- Why this document matters
- Who should care about this information
- Main takeaway for readers

Please make it concise but informative - like a professional executive summary that busy people can read quickly to understand the essential points.

---

DOCUMENT CONTENT:
${documentContent}

---

Please provide a well-formatted brief summary:`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();

        } catch (error) {
            return "Error generating summary. Please try again.";
        }
    }
});

export const GetUserFiles = query({
    args:{
        userEmail: v.string()
    },

    handler:async(ctx,args)=>{
        const result = await ctx.db.query("pdfFiles")
        .filter((q) => q.eq(q.field("createdBy"), args.userEmail)).collect();

        return JSON.stringify(result);
    }
})
