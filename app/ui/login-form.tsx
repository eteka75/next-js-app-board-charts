'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { Button } from './button';
import {authenticate, signInWithGitHub, signInWithGoogle} from "@/app/lib/actions"
import { useActionState } from 'react';
import { signIn } from "next-auth/react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginForm() {

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const backUrl =  process.env.NEXT_PUBLIC_BASE_URL || '/';
  const OAuthSignIn=(provider:string) => {
    signIn(provider,{callbackUrl:backUrl});
  }

  return (
    <form action={formAction} className="space-y-3" method='POST'>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
       
          {errorMessage && ( 
            <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
        </div>
          )}
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <p className='text-center pt-4 text-xs'>
          OU
        </p>
        <div className='space-y-4'>
      
        <button type="button" onClick={()=>OAuthSignIn('google')}
        className="mt-4 w-full bg-white border shadow-sm my-2 items-center rounded-lg text-center px-6 py-3 flex justify-center gap-2"
        >
        
        <FaGoogle /> Signin with Google</button>
      <button type="button" onClick={()=>OAuthSignIn('github')}
      className="mt-4 w-full bg-slate-800 text-white items-center border shadow-sm my-2 rounded-lg text-center px-6 py-3 flex justify-center gap-2"
      >
        
        <FaGithub /> Signin with GithHub</button>
        </div>
      </div>
    </form>
  );
}
