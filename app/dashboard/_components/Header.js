import React from 'react'
import {UserButton} from "@clerk/nextjs";

function Header() {
    return (
        <div className="flex justify-end p-5 shadow-sm bg-white">
            <UserButton />
        </div>
    )
}

export default Header
