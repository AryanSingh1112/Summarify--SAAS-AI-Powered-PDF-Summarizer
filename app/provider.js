"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    
    const paypalOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        intent: "capture",
        currency: "USD",
        components: "buttons",
        'enable-funding': 'venmo',
        'disable-funding': 'credit,card',
        'data-sdk-integration-source': 'developer-studio'
    };

    return (
        <ConvexProvider client={convex}>
            <PayPalScriptProvider options={paypalOptions}>
                {children}
            </PayPalScriptProvider>
        </ConvexProvider>
    );
}

export default Provider;