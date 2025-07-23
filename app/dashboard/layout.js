"use client";
import React from 'react'
import Sidebar from "@/app/dashboard/_components/Sidebar";
import Header from "@/app/dashboard/_components/Header";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

function DashboardLayout({ children }) {
    const { user } = useUser();
    const createUser = useMutation(api.user.createUser);

    useEffect(() => {
        if (user) {
            // Create user in Convex when they first access dashboard
            const userName = user.fullName || 
                           (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName) ||
                           user.username || 
                           user.primaryEmailAddress?.emailAddress?.split('@')[0] || 
                           "User";
                           
            createUser({
                userName: userName,
                email: user.primaryEmailAddress?.emailAddress || "",
                imageUrl: user.imageUrl || ""
            }).then((result) => {
                // User created successfully
            }).catch((error) => {
                // User creation failed or user already exists
            });
        }
    }, [user, createUser]);

    return (
        <div>

            <div className='md:w-64 h-screen fixed'>

              <Sidebar />
            </div>

            <div className='md:ml-64'>

               <Header />

                <div className='p-10'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout