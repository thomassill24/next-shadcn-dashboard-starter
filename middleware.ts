import { clerkMiddleware } from '@clerk/nextjs/server'; // Correct import of Clerk's middleware
import { NextResponse } from 'next/server'; // Next.js response object

// Export the default Clerk middleware
export default clerkMiddleware(); 

// Only run the middleware on routes like /dashboard and all its subroutes
export const config = { 
};
