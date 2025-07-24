import React from 'react'
import Image from "next/image";
import {UserButton} from "@clerk/nextjs";


function WorkspaceHeader() {
    return (
        <div className="p-3 md:p-4 flex justify-between items-center shadow-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
                <Image 
                    src={'/Logo.svg'} 
                    alt='logo' 
                    width={100} 
                    height={70} 
                    className="md:w-[140px] md:h-[70px]"
                />
                
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
                <UserButton/>
            </div>
        </div>
    )
}

export default WorkspaceHeader
