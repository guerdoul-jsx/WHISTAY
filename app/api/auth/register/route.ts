import { getUserByEmail } from '@/actions/user';
import prisma from '@/db';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { env } from '@/ts-env.mjs';
import { sendEmail } from '@/actions/email';
import EmailVerificationTemplate from '@/emails/email-verification-email';

export async function POST(req: Request, res: Response) {
  try {
    const { name, email, password } = await req.json();

    if (!name) {
      return NextResponse.json({
        success: false,
        message: 'Full name Required',
        status: 400,
      });
    }

    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email Required',
        status: 400,
      });
    }

    if (!password) {
      return NextResponse.json({
        success: false,
        message: 'Password Required',
        status: 400,
      });
    }

    // check email if it's already registerd or not
    const user = await getUserByEmail(email);

    if (user) {
      return NextResponse.json({
        success: false,
        message: 'User with this email already registred',
        status: 200,
      });
    }

    // hashing password using bcryptjs
    const hashedPassword = await hash(password, 10);

    // create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    if (!newUser) {
      return NextResponse.json({
        success: false,
        message: 'Cannot create A account with this email address',
        status: 400,
      });
    }

    // generate verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('base64url');

    const userUpdated = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        emailVerificationToken,
      },
    });

    // ! this is to prevent unstable react email version issue
    // const htmlEmail = ReactDomServer.renderToString(<EmailVerification />);
    // console.log("CURENT HTML ", htmlEmail);

    // THIS AREA IS TO SEND THE EMAIL VERIFICATION USING RESEND
    const messageSent = await sendEmail({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: 'Verify Your Email',
      react: EmailVerificationTemplate({
        name,
        email,
        emailVerificationToken,
      }),
    });

    if (userUpdated && messageSent) {
      return NextResponse.json({
        success: true,
        message: 'Check your inbox to verify your email address',
        status: 201,
      });
    }
  } catch (error: any) {
    console.log('[SINGUP]_POST_METHOD] error: ', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 500,
      error,
    });
  }
}
