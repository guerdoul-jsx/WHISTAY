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
import { Button } from '@/components/ui/button';

import { emailVerificationSchema } from '@/validations/forms.';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

type ResetPasswordInputs = z.infer<typeof emailVerificationSchema>;

export function ResetPassword() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordInputs>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(formData: ResetPasswordInputs): void {
    startTransition(async () => {
      try {
        console.log('CUURENT DATA', formData);

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

        <Button disabled={isPending} className="">
          {isPending ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Reset...</span>
            </>
          ) : (
            <span>Reset Password</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
