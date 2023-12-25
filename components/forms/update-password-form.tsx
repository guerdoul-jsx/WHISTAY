'use client';

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

import { passwordUpdateSchema } from '@/validations/forms.';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { ResponseApi } from '@/types';

interface UpdatePasswordFormProps {
  resetPasswordToken: string;
}

type UpdatePasswordFormInputs = z.infer<typeof passwordUpdateSchema>;

export function UpdatePasswordForm({
  resetPasswordToken,
}: UpdatePasswordFormProps) {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdatePasswordFormInputs>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(formData: UpdatePasswordFormInputs): void {
    startTransition(async () => {
      try {
        const dataToSubmit = { resetPasswordToken, ...formData };
        const response = await fetch('/api/auth/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit),
        });

        const res: ResponseApi = await response.json();

        if (res.success === true && res.status === 200) {
          toast({
            title: 'Password Updated Successfully',
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New password" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm new password" {...field} />
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
              <span>Updating...</span>
            </>
          ) : (
            <span>Update</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
