"use client";

import { Layout, Shield, Menu } from "lucide-react";
import Image from 'next/image';
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import UploadPdf from "@/app/dashboard/_components/UploadPdf";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidebar() {
  const { user } = useUser();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const GetUserInfo = useQuery(
    api.user.GetUserInfo,
    user?.primaryEmailAddress?.emailAddress ? {
      email: user.primaryEmailAddress.emailAddress
    } : "skip"
  );

  const fileList = useQuery(
    api.fileStorage.GetUserFiles,
    user?.primaryEmailAddress?.emailAddress ? {
      userEmail: user.primaryEmailAddress.emailAddress
    } : "skip"
  );

  const isUserUpgraded = GetUserInfo?.upgrade || false;
  const maxFiles = isUserUpgraded ? Infinity : 6;
  const shouldShowProgress = !isUserUpgraded;

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-md">
        <Image src="/Logo.svg" alt="logo" width={120} height={60} />
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`z-50 bg-white shadow-md h-screen p-7 fixed top-0 left-0 transition-transform duration-300 ease-in-out 
        md:static md:translate-x-0 md:flex md:flex-col w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo & Close for mobile */}
        <div className="flex items-center justify-between md:justify-start md:mb-0">
          <Image src="/Logo.svg" alt="logo" width={160} height={80} />
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="mt-10">
          <UploadPdf isMaxFile={!isUserUpgraded && fileList?.length >= maxFiles}>
            <Button className="bg-blue-600 text-white hover:bg-blue-500 w-full px-18 mt-7">
              + Upload PDF
            </Button>
          </UploadPdf>

          <Link href={'/dashboard'}>
            <div className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-md cursor-pointer
              ${path == '/dashboard' && 'bg-slate-200'}`}>
              <Layout />
              <h2 className="font-semibold">Workspace</h2>
            </div>
          </Link>

          <Link href={'/dashboard/upgrade'}>
            <div className={`flex gap-2 items-center p-3 mt-2 hover:bg-slate-100 rounded-md cursor-pointer
              ${path == '/dashboard/upgrade' && 'bg-slate-200'}`}>
              <Shield />
              <h2 className="font-semibold">Upgrade</h2>
            </div>
          </Link>
        </div>

        {shouldShowProgress && (
          <div className="absolute bottom-24 w-[80%]">
            <Progress className="bg-blue-500" value={(fileList?.length / maxFiles) * 100} />
            <p className="text-sm font-semibold">{fileList?.length || 0} out of {maxFiles} Pdf uploaded.</p>
            <p className="text-sm text-gray-500 mt-3">Upgrade to Upload More Pdfs.</p>
          </div>
        )}

        {!shouldShowProgress && (
          <div className="absolute bottom-24 w-[80%]">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">Pro Member</span>
              </div>
              <p className="text-sm mt-1 opacity-90">{fileList?.length || 0} PDFs uploaded • Unlimited uploads</p>
              <p className="text-xs mt-1 opacity-75">Thank you for upgrading!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
