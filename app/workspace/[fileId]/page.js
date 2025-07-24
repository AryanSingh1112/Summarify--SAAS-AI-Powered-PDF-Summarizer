"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import WorkspaceHeader from "@/app/workspace/_components/WorkspaceHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';

function WorkSpace() {
    const { fileId } = useParams();
    const [currentEditor, setCurrentEditor] = useState(null);

    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId
    });

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <WorkspaceHeader />

            <div className="flex-1 p-2 md:p-4 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full overflow-hidden">
                    {/* TEXT EDITOR */}
                    <div className="bg-white rounded shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                        <TextEditor onEditorReady={setCurrentEditor} />
                    </div>

                    {/* PDF VIEWER */}
                    <div className="flex flex-col h-full">
                        <PdfViewer fileUrl={fileInfo?.fileUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkSpace;
