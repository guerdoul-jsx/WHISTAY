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

import { signInSchema } from '@/validations/forms.';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Heading } from '../ui/heading';

type SignInFormInputs = z.infer<typeof signInSchema>;

export function SigninForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  function onSubmit(formData: SignInFormInputs): void {
    startTransition(async () => {
      try {
        console.log('CUURENT DATA', formData);
        const { remember, ...rest } = formData;

        toast({
          title: 'Done, You have sucessfully',
          variant: 'success',
        });
        //
        // const message = await signUpWithPassword(
        //   formData.email,
        //   formData.password
        // );
        // switch (message) {
        //   case 'exists':
        //     toast({
        //       title: 'User with this email address already exists',
        //       description: 'If this is you, please sign in instead',
        //       variant: 'destructive',
        //     });
        //     form.reset();
        //     break;
        //   case 'success':
        //     toast({
        //       title: 'Success!',
        //       description: 'Check your inbox to verify your email address',
        //     });
        //     router.push('/auth/signin');
        //     break;
        //   default:
        //     toast({
        //       title: 'Something went wrong',
        //       description: 'Please try again',
        //       variant: 'destructive',
        //     });
        //     console.error(message);
        //     break;
        // }
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
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
        <div className="flex items-center justify-between lg:pb-2">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex gap-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel
                  className={`!my-auto  ${
                    Boolean(form.getValues('remember')) === true
                      ? 'text-gray-900'
                      : 'text-gray-600'
                  }`}
                >
                  Remember Me
                </FormLabel>
              </FormItem>
            )}
          />
          <Link
            href="/auth/reset-password"
            className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-primary hover:no-underline"
          >
            Forget Password?
          </Link>
        </div>
        <Button disabled={isPending} className="">
          {isPending ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Signin...</span>
            </>
          ) : (
            <span>Sing in</span>
          )}
        </Button>
      </form>
      <Heading
        as="p"
        className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base"
      >
        Don’t have an account?{' '}
        <Link
          href="/auth/signup"
          className="hover:text-gray-1000 font-semibold text-gray-700 transition-colors hover:underline"
        >
          Sign Up
        </Link>
      </Heading>
    </Form>
  );
}
