import React from 'react'
import Image from "next/image";
import {UserButton} from "@clerk/nextjs";


function WorkspaceHeader() {
    return (
        <div className="p-4 flex justify-between shadow-sm">
            <Image src={'/Logo.svg'} alt='logo' width={140} height={100} />
            <UserButton />
        </div>
    )
}

export default WorkspaceHeader
