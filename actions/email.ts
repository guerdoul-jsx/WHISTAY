'use server';

import { resend } from '@/config/email';

import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
} from 'resend/build/src/emails/interfaces';
import { getUserByEmail } from '@/actions/user';
import prisma from '@/db';
import crypto from 'crypto';
import EmailVerification from '@/emails/email-verification-email';
import { env } from '@/ts-env.mjs';
import { User } from '@prisma/client';

// a setup function to send emails using  //* resend */
export async function sendEmail(
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions | undefined
) {
  try {
    const data = await resend.emails.send(payload, options);
    console.log('Email Sent Successfully');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error sending email');
  }
}

//function to resend email verification link to the user if it's already registered
export async function resendEmailVerificationLink(
  email: string
): Promise<'notFound' | 'success' | null> {
  try {
    const user = await getUserByEmail(email);
    if (!user) return 'notFound';

    // generate the verification Token
    const emailVerificationToken = crypto.randomBytes(32).toString('base64url');

    const userUpdated = await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerificationToken,
      },
    });

    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: 'Verify You Email address',
      react: EmailVerification({
        name: userUpdated.name,
        email,
        emailVerificationToken,
      }),
    });
    return userUpdated && emailSent ? 'success' : null;
  } catch (error) {
    console.error(error);
    throw new Error('Error resending email verification link');
  }
}

// function to check email if it's verified or not
export async function checkEmailVerified(email: string): Promise<boolean> {
  try {
    const user = await getUserByEmail(email);
    return user?.emailVerified instanceof Date ? true : false;
  } catch (error) {
    console.error(error);
    throw new Error('Error checking if email verified');
  }
}

//function to mark email verified
export async function markEmailAsVerified(
  emailVerificationToken: string
): Promise<User> {
  try {
    return await prisma.user.update({
      where: {
        emailVerificationToken,
      },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error marking email as verified');
  }
}
