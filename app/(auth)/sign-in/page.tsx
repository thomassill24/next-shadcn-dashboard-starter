'use client';
import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs'; // Clerk hooks
import { useRouter } from 'next/navigation'; // For redirecting after success
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Import for using Image component
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Import Shadcn Form components
import { Input } from '@/components/ui/input'; // Import Shadcn Input
import { SignOutButton } from '@/components/sign-out-button';
import { z } from 'zod'; // Import Zod for validation
import { useForm } from 'react-hook-form'; // Import React Hook Form
import { zodResolver } from '@hookform/resolvers/zod'; // Zod resolver for form validation

// Define Zod validation schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password contains at least 6 characters' }),
});

const CustomSignInPage = () => {
  const { signIn, setActive } = useSignIn(); // Use Clerk's sign-in functionality
  const router = useRouter(); // For redirecting after sign-in
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Watch the values of the form inputs
  const { watch } = form;
  const emailValue = watch('email');
  const passwordValue = watch('password');

  // Determine if both fields are filled
  const isFormValid = emailValue !== '' && passwordValue !== '';

  // Handle form submission
  const handleSignIn = async (data: any) => {
    setLoading(true); // Start loading indicator
    setErrorMessage(''); // Clear any previous error messages

    try {
      const result = await signIn.create({
        identifier: data.email, // Email is the identifier
        password: data.password, // Password input
      });

      // Check sign-in status
      if (result.status === 'complete') {
        // If sign-in is successful, set the session as active and redirect
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard/home'); // Redirect to the dashboard
      } else if (result.status === 'needs_first_factor') {
        setErrorMessage('Please complete the first authentication step.');
      } else {
        setErrorMessage('Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage('Log in failed. Please check your credentials.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google', // Specify the OAuth provider (Google)
        redirectUrl: '/dashboard', // Redirect after successful authentication
        redirectUrlComplete: '/dashboard', // Redirect after successful completion
      });
    } catch (error) {
      console.error('Google Sign-in error:', error);
      setErrorMessage('An error occurred during Google sign-in. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#000001]">
      {/* Main container */}
      <div className="p-8 rounded-2xl space-y-3 bg-gradient-to-br from-[#fcfcfc] to-[#fefefe] border border-1 border-[#E4E4E4] ring-offset-2 ring-0">

        {/* Frame to center elements */}
        <div className="flex flex-col items-center justify-center gap-4 mb-2">
          {/* Logo */}
          <div className="h-[50px] w-[50px] bg-[#121212] rounded-xl flex justify-center items-center">
            <Image
              src="/PNG WHITE LOGO PIXAMP.png"
              alt="logo"
              width={30}
              height={30}
            />
          </div>
          {/* Title */}
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
        </div>

        {/* Google Sign-In Button */}
        <Button
          type="button"
          variant='white'
          onClick={handleGoogleSignIn}
          className="w-full py-4"
          >
            <span className='flex items- gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Continue with Google</span>
          </Button>

          <div className="flex items-center justify-center gap-3">
          <hr className="w-full border-gray-300" />
          <p className="text-sm text-gray-400">or</p>
          <hr className="w-full border-gray-300" />
          </div>

        {/* Form starts here */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)} className="w-full max-w-sm space-y-4">
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jeff@amazon.com"
                      disabled={loading}
                      {...field} // Spread React Hook Form field props
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      disabled={loading}
                      {...field} // Spread React Hook Form field props
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error message */}
            {errorMessage && <p className="text-red-500 text-sm font-medium mb-2">{errorMessage}</p>}

            <div className="space-y-2 pt-2">
              {/* Shadcn Button for Log In */}
              <Button
                type="submit"
                variant='SignUp'
                disabled={!isFormValid || loading} // Disable when form is not valid or loading
                className={`text-md py-5 w-full ${
                  isFormValid ? 'bg-[#9747FF] hover:bg-[#AE72FF] text-white' : 'text-gray-600 bg-gray-200 opacity-50 cursor-not-allowed'
                }`}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </Button>
              
              <p className="px-8 text-center text-sm text-[#7E828A]">
                No account yet?{' '}
                <Link href="/sign-up" className="text-[#121212] font-medium hover:underline">
                  Create account for free
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomSignInPage;
