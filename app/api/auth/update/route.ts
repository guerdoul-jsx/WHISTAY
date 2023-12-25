import { getUserByResetPasswordToken } from '@/actions/user';
import { NextResponse } from 'next/server';
import prisma from '@/db';
import { hash } from 'bcryptjs';

export async function POST(req: Request, res: Response) {
  try {
    const { resetPasswordToken, password } = await req.json();
    const user = await getUserByResetPasswordToken(resetPasswordToken);

    if (!user)
      return NextResponse.json({
        success: false,
        message: 'User Not Found',
        status: 404,
      });

    const resetPasswordExpiry = user.resetPasswordTokenExpiry;
    if (!resetPasswordExpiry || resetPasswordExpiry < new Date())
      return NextResponse.json({
        success: false,
        message: 'Token is missing or expired',
        status: 401,
      });

    const passwordHash = await hash(password, 10);

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });

    return userUpdated
      ? NextResponse.json({
          success: true,
          message: 'You can now sign in with new password',
          status: 200,
        })
      : NextResponse.json({
          success: false,
          message: 'Error updating password',
          status: 401,
        });
  } catch (error) {
    console.log('[UPDATE PASSWORD]_POST_METHOD] error: ', error);
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error,
    });
  }
}
