"use client";

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

function Dashboard() {
    const { user } = useUser();

    const fileList = useQuery(
        api.fileStorage.GetUserFiles,
        user?.primaryEmailAddress?.emailAddress ? {
            userEmail: user.primaryEmailAddress.emailAddress
        } : "skip"
    );

    const formatCreationTime = (creationTime) => {
        if (!creationTime) return 'Unknown';
        const date = new Date(creationTime);
           const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
                Workspace
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {fileList?.length > 0 ? (
                    fileList.map((file, index) => (
                        <Link key={index} href={`/workspace/${file.fileId}`}>
                            <div className="bg-white border p-6 rounded-lg flex flex-col items-center cursor-pointer shadow-sm hover:shadow-lg transition-all hover:scale-[1.03]">
                                <Image src="/pdf.png" alt="file" width={50} height={50} />
                                <p className="text-center text-sm sm:text-base text-black mt-3 font-medium truncate w-full">
                                    {file?.fileName}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatCreationTime(file?._creationTime)}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-[140px] bg-slate-200 rounded-lg animate-pulse"
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;
