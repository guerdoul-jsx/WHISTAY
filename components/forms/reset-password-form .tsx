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
import { ResponseApi } from '@/types';

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
        const response = await fetch('/api/auth/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const res: ResponseApi = await response.json();

        if (res.success === true && res.status === 200) {
          toast({
            title: 'Password Reset Successfully',
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
