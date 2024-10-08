'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Icons } from './icons';

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className="w-full h-full"
      variant="white"
      type="button"
      onClick={() =>
        signIn('Google', { callbackUrl: callbackUrl ?? '/dashboard' })
      }
    >
      <div className='flex items-center mr-2'>
      <Icons.Google />
      </div>
      Continue with Google
      
    </Button>
  );
}
