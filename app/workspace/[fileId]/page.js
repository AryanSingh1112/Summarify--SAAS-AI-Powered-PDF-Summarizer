"use client";

import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import WorkspaceHeader from "@/app/workspace/_components/WorkspaceHeader";

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';

function WorkSpace() {

    const {fileId} = useParams();
    const [currentEditor, setCurrentEditor] = useState(null);
    const fileInfo = useQuery(api.fileStorage.GetFileRecord , {
        fileId: fileId
    })

    useEffect(() => {
        // File info loaded
    }, [fileInfo]);

    return (
        <div className="h-screen flex flex-col">
          <WorkspaceHeader />

            <div className='flex-1 grid grid-cols-2 gap-5 p-4 min-h-0'>

                <div className="bg-white rounded shadow-sm border border-gray-200 flex flex-col">
                    {/*TEXT EDITOR*/}
                    <TextEditor onEditorReady={setCurrentEditor} />
                </div>

                <div className="flex flex-col">
                    {/*PDF VIEWER*/}
                    <PdfViewer fileUrl={fileInfo?.fileUrl} />
                </div>
            </div>
        </div>
    )
}

export default WorkSpace
