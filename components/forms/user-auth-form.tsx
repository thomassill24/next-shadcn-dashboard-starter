'use client'; // Add this at the top of your file

import { useRouter } from 'next/navigation'; // Use `next/navigation` for Next.js 13+ App Router
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignUp } from '@clerk/nextjs'; // Clerk sign-up hook for creating users
import Link from 'next/link';

// Validation schema using Zod for email and password
const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { signUp, isLoaded } = useSignUp(); // Clerk hook to handle sign-up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Use router for redirection

  const defaultValues = {
    email: '',
    password: '',
  };

  // React Hook Form setup for handling form state and validation
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

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
        emailAddress: data.email, // Pass the email from the form
        password: data.password,  // Pass the password from the form
      });

      // Prepare for email verification after sign-up
      await signUpAttempt.prepareEmailAddressVerification();
      console.log('Sign-up successful, verification email sent!');

      // Redirect to the email verification page
      router.push('/verify-email'); // Redirect to the email verification page
    } catch (err: any) {
      // Check if the error is due to an existing account
      if (err.errors?.[0]?.code === 'identifier_already_exists') {
        setError('You already have an account. Please log in instead.');
        router.push('/sign-in'); // Redirect to sign-in if the account already exists
      } else {
        // Handle any other errors returned by Clerk
        setError(err.errors?.[0]?.message || 'An error occurred during sign-up.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} // Hooking up the form submit handler
          className="w-full space-y-6"
        >
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
                    placeholder="your-email@example.com"
                    disabled={loading}
                    {...field}
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
          <Button disabled={loading} className="ml-auto w-full" type="submit" variant="signUp">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </Form>
    </>
  );
}
