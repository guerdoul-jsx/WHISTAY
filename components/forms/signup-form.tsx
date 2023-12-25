'use client';

import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useMedia from 'react-use/lib/useMedia';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

import { useRouter } from 'next/navigation';

import { useTransition } from 'react';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';

import { signUpSchema } from '@/validations/forms.';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Heading } from '../ui/heading';

import { ResponseApi } from '@/types/index';

type SignUpFormInputs = z.infer<typeof signUpSchema>;

export function SignupForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAgreed: false,
    },
  });

  function onSubmit(formData: SignUpFormInputs): void {
    startTransition(async () => {
      try {
        const { isAgreed, ...rest } = formData;
        if (!isAgreed) {
          toast({
            title: 'You must agree our terms & privacy policy',
            variant: 'destructive',
          });
          return;
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const res: ResponseApi = await response.json();

        if (res.success === true && res.status === 201) {
          toast({
            title: 'Account Created Successfully',
            description: `${res.message}`,
            variant: 'success',
          });
          return;
        }

        toast({
          title: 'Something went wrong',
          description: `${res.message}`,
          variant: 'destructive',
        });
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `Please try again ${error}`,
          variant: 'destructive',
        });
        console.error('error Submit', error);
      }
    });
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />
        <div className="my-2 flex items-center justify-between lg:pb-2">
          <FormField
            control={form.control}
            name="isAgreed"
            render={({ field }) => (
              <FormItem className="flex gap-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel
                  className={`!my-auto text-xs md:text-base ${
                    Boolean(form.getValues('isAgreed')) === true
                      ? 'text-gray-900'
                      : 'text-gray-600'
                  }`}
                >
                  By signing up you have agreed to our{' '}
                  <Link
                    href="/terms-of-service"
                    className="font-semibold text-gray-700 transition-colors hover:text-primary"
                  >
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-gray-700 transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending} className="">
          {isPending ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Signup...</span>
            </>
          ) : (
            <span>Sing up</span>
          )}
        </Button>
      </form>
      <Heading
        as="p"
        className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base"
      >
        Already have an account?{' '}
        <Link
          href="/auth/signin"
          className="hover:text-gray-1000 font-semibold text-gray-700 transition-colors hover:underline"
        >
          Sign in
        </Link>
      </Heading>
    </Form>
  );
}
