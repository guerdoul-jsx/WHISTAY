import { getUserByEmail } from '@/actions/user';
import { NextResponse } from 'next/server';
import prisma from '@/db';
import crypto from 'crypto';
import { env } from '@/ts-env.mjs';
import { sendEmail } from '@/actions/email';
import ResetPasswordEmail from '@/emails/reset-password';

export async function POST(req: Request, res: Response) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email Required',
        status: 400,
      });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User with this email address does not exist',
        status: 404,
      });
    }

    const todayDate = new Date();

    const resetPasswordToken = crypto.randomBytes(32).toString('base64url');
    const resetPasswordTokenExpiry = new Date(
      todayDate.setDate(todayDate.getDate() + 1)
    ); // 24 hours from now

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiry,
      },
    });

    const emailSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: 'Reset Your Password',
      react: ResetPasswordEmail({
        name: userUpdated.name,
        email,
        resetPasswordToken,
      }),
    });

    return userUpdated && emailSent
      ? NextResponse.json({
          success: true,
          message: 'Check your email for a password reset link',
          status: 200,
        })
      : NextResponse.json({
          success: false,
          message: 'Error resetting password',
          status: 401,
        });
  } catch (error: any) {
    console.log('[RESET PASSWORD]_POST_METHOD] error: ', error);
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error,
    });
  }
}
