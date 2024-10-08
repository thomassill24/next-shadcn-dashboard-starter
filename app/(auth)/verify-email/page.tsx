'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast"; // Update to match the path in your project
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// Define validation schema
const FormSchema = z.object({
  pin: z.string().length(6, {
    message: "Your one-time password must be exactly 6 characters.",
  }),
});

export default function VerifyEmailPage() {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [loading, setLoading] = useState(false);

  // Form setup with react-hook-form and zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // OTP Verification submission handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const signUpResult = await signUp.attemptEmailAddressVerification({ code: data.pin });
      
      if (signUpResult.status === "complete") {
        await setActive({ session: signUpResult.createdSessionId });
        toast({
          title: "Verification successful!",
          description: "Your email has been verified.",
        });
        router.push('/dashboard/home');
      } else {
        toast({
          title: "Verification failed",
          description: "Please check the OTP and try again.",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Email verification failed:", error);
      toast({
        title: "Verification error",
        description: "An error occurred during verification. Please try again.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#000001] p-4">
      <div className="w-full space-y-3 flex flex-col items-center justify-center max-w-md bg-gradient-to-br from-[#F3F3F3] to-[#fefefe] rounded-2xl border border-1 border-[#E4E4E4] ring-offset-2 ring-0">
        <div className='mt-6 flex flex-col items-center justify-center text-center space-y-3'>
          <div className='w-fit flex items-center justify-center p-2 bg-purple-100 border border-purple-200 rounded-xl'>
            <svg className="w-6 h-6 text-[#9747FF] dark:text-white" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className='text-center'>
          <h1 className="text-2xl tracking-tight font-semibold text-center">Check your email inbox</h1>
          <p className="text-center text-[#7E828A] font-medium tracking-tight">
            We've sent a code to <strong className="font-semibold">{email}</strong>
          </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center space-y-4">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="px-8 text-center text-sm text-[#7E828A]">
            Didn't get the code?{' '}
            <Link href="/sign-in" className="text-black font-semibold hover:underline">
              Click to resend.
            </Link>
          </p>
            <Separator className="w-full" />

            <div className="w-full flex justify-end items-center gap-2 px-4 pb-4">
              <SignOutButton>
                <Button className="rounded-lg bg-purple-100 text-[#9747FF] font-semibold shadow-none px-4 py-5 hover:bg-purple-200">
                  Cancel
                </Button>
              </SignOutButton>

              <Button
                type="submit"
                disabled={loading}
                className='rounded-lg bg-[#9747FF] text-white font-medium shadow-none hover:bg-[#AE72FF] px-5 py-5'
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
