// middleware.js
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// Export Clerk middleware with custom protection logic
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect(); // ✅ no parentheses on `auth`
    }
});

// Define which routes this middleware should run on
export const config = {
    matcher: [
        // Skip static files and internal Next.js routes
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API and RPC routes
        '/(api|trpc)(.*)',
    ],
};
