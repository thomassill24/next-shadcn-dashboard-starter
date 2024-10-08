'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignUp, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import CardSignUpPage from '@/components/card-sign-up-page';

// Validation schema using Zod for email and password
const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const { isSignedIn } = useAuth();
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const defaultValues = {
    email: '',
    password: '',
  };

  const emailInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { watch } = form;
  const emailValue = watch('email');
  const passwordValue = watch('password');

  // Determine if both fields are filled
  const isFormValid = emailValue !== '' && passwordValue !== '';

  // Check if the user is already logged in and redirect to the dashboard
  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard'); // Redirect to the dashboard if already signed in
    }
  }, [isSignedIn, router]);

  // Form submit handler
  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setError(null); // Clear any previous errors

    if (!isLoaded) {
      setError('Clerk is not loaded. Please wait.');
      setLoading(false);
      return;
    }

    try {
      // Create a new sign-up attempt with Clerk
      const signUpAttempt = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUpAttempt.prepareEmailAddressVerification();
      console.log('Sign-up successful, verification email sent!');

      // Redirect to the email verification page
      router.push('/verify-email?email=' + encodeURIComponent(data.email));
    } catch (err: any) {
      // Check if the error is due to an existing account
      if (err.errors?.[0]?.code === 'identifier_already_exists') {
        setError('You already have an account. Please log in instead.');
        router.push('/sign-in');
      } else {
        // Handle any other errors returned by Clerk
        setError(err.errors?.[0]?.message || 'An error occurred during sign-up.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      });
    } catch (error: any) {
      // Check if the error is because the account already exists
      if (error?.errors?.[0]?.code === 'identifier_already_exists') {
        // Redirect the user to the sign-in page since they already have an account
        setError('You already have an account. Redirecting to sign-in...');
        router.push('/sign-in'); // Redirect to sign-in page
      } else {
        // Handle other types of errors
        console.error('Google Sign-up error:', error);
        setError('An error occurred during Google sign-up. Please try again.');
      }
    }
  };

  return (
    <div className="relative h-screen bg-[#fefefe] flex-col items-center justify-center md:grid lg:grid-cols-2 p-3">
      {/* Left Section */}
      <div className="relative hidden h-full flex-col justify-between items-center text-white lg:flex">
        {/* Black Frame container */}
        <div className="absolute inset-0 bg-[#000001] rounded-[24px] flex flex-col items-center justify-center space-y-12 px-4 py-8 overflow-y-auto max-h-full">
              {/* Logo */}
              <div className="relative flex items-center text-xl font-semibold space-x-2">
                <Image src="/PNG WHITE LOGO PIXAMP.png" alt="logo" width={28} height={28} />
                <span>Pixamp</span>
              </div>
              {/* Card */}
              <div className="flex shrink w-[380px]">
                <CardSignUpPage />
              </div>
              {/* Badge + titles + description */}
              <div className='flex flex-col space-y-4 items-center'>
                <div className='w-fit px-2 py-1 rounded-full bg-[#1D1435] border border-1 border-[#451EA2]'>
                  <p className='text-xs text-[#C2B7FC] font-medium'>Pixel Attribution</p>
                </div>
                  <div className='flex flex-col items-center space-y-1'>
                    <h4 className='text-[22px] font-medium tracking-tight text-[#fefefe]'>Better Data, Better Decisions.</h4>
                    <p className='text-sm font-medium text-white opacity-70'>Don't let your marketing efforts be fragmented by attribution.</p>
                  </div>
              </div>
            </div>
        </div>

      {/* Right Section - Sign Up Form */}
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto flex w-[370px] flex-col justify-center space-y-5">
          <div className="h-[54px] w-[54px] bg-[#121212] rounded-xl flex justify-center items-center">
            <Image src="/PNG WHITE LOGO PIXAMP.png" alt="logo" width={32} height={32} />
          </div>

          <div className="flex flex-col space-y-1 text-left">
            <h1 className="text-3xl font-semibold tracking-tight">Get started</h1>
            <p className="text-md text-[#7E828A] font-regular">Welcome to Pixamp - Let's create your account</p>
          </div>

          {/* Merged UserAuthForm */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
            <Button
          type="button"
          variant='white'
          onClick={handleGoogleSignUp}
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
              {/* Email Input Field */}
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
                        {...field}
                        ref={emailInputRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Input Field */}
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error Message Display */}
              {error && (
                <p className="text-red-500 text-sm">
                  {error === 'You already have an account. Please log in instead.' ? (
                    <>
                      {error}{' '}
                      <Link href="/sign-in" className="text-blue-500 underline">
                        Log In
                      </Link>
                    </>
                  ) : (
                    error
                  )}
                </p>
              )}

              {/* Sign Up Button */}
              <div className='flex flex-col items-center justify-center gap-1 pt-2'>
              <Button
                disabled={!isFormValid || loading}
                variant={'signUp'} // Disable when form is not valid or loading
                className={`ml-auto w-full py-5 ${
                  isFormValid ? 'bg-[#9747FF] hover:bg-[#AE72FF] text-white' : 'text-gray-600 bg-gray-200 opacity-50 cursor-not-allowed'
                }`}
                type="submit"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </Button>
              <p className="px-8 text-center text-sm text-[#7E828A]">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-black font-semibold hover:underline">
              Log in
            </Link>
          </p>
          </div>
            </form>
          </Form>

          
        </div>
    </div>
    </div>
  );
}
