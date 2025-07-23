"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 as Loader2Icon, UploadCloud } from "lucide-react";
import {useAction, useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import axios from "axios";

function UploadPdf({ children , isMaxFile }) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry = useMutation(api.fileStorage.AddFileEntrytoDb);
    const embeddDocument = useAction(api.myAction.ingest);
    const getfileUrl = useMutation(api.fileStorage.getfileUrl);
    const { user } = useUser();

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setFileName(selectedFile.name);
        }
    };

    const OnUpload = async () => {
        if (!file || !user?.id) return;

        setLoading(true);
        try {
            const postUrl = await generateUploadUrl();

            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            const { storageId } = await result.json();
            const fileId = uuid4();
            const fileUrl = await getfileUrl({ storageId: storageId });

            const resp = await addFileEntry({
                fileId: fileId,
                storageId: storageId,
                fileName: fileName || "Untitled File",
                fileUrl: fileUrl,
                createdBy: user?.primaryEmailAddress?.emailAddress || "unknown@example.com",

            })

            const ApiResp = await axios.get(`/api/pdf-loader?pdfUrl=${encodeURIComponent(fileUrl)}`)
           await embeddDocument({
                splitText: ApiResp.data.result,
                fileId: fileId
            });

            setLoading(false);

            setOpen(false);
            setFile(null);
            setFileName("");
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open && !isMaxFile} onOpenChange={!isMaxFile ? setOpen : undefined}>
            <DialogTrigger asChild>
                <div>
                    {React.cloneElement(children, {
                        disabled: isMaxFile,
                        className: `${children.props.className || ''} ${isMaxFile ? 'opacity-50 cursor-not-allowed hover:bg-blue-600' : ''}`,
                        onClick: isMaxFile ? (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        } : children.props.onClick
                    })}
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-md p-6 rounded-xl shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800">
                        Upload PDF File
                    </DialogTitle>
                    <DialogDescription asChild>
                        <section className="mt-4 space-y-4">

                            <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                            >
                                <UploadCloud className="w-8 h-8 text-blue-500 mb-2" />
                                <span className="text-sm text-blue-600 font-medium">
                                    Click to upload or drag your PDF here
                                </span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={onFileSelect}
                                />
                            </label>

                            {/* File name input */}
                            <div>
                                <label
                                    htmlFor="file-name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    File Name
                                </label>
                                <input
                                    id="file-name"
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="Enter file name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setFile(null);
                                            setFileName("");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    onClick={OnUpload}
                                    disabled={loading || !file}
                                    className="bg-purple-500 text-white hover:bg-purple-400"
                                >
                                    {loading ? (
                                        <Loader2Icon className="w-4 h-4 animate-spin" />
                                    ) : (
                                        "Upload"
                                    )}
                                </Button>
                            </div>
                        </section>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default UploadPdf;
