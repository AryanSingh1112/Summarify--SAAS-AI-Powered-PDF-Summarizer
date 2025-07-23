import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


// const pdfUrl = "https://sleek-tiger-252.convex.cloud/api/storage/5709e2b1-cdcb-4df5-8a1e-c36a1ba9c9ed"
export async function GET(req) {

    const requrl = req.url;
    const {searchParams} = new URL(requrl);
    const pdfUrl = searchParams.get('pdfUrl');

    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach(doc => {
        pdfTextContent += doc.pageContent;
    })

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });

    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList = [];
    output.forEach(doc=>{
        splitterList.push(doc.pageContent);
    })

    return NextResponse.json({ result: splitterList });

}