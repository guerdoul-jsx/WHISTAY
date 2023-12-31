'use server';

import { prisma } from '@/db';

import { type User } from '@prisma/client';

// function to the user by their email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user by email');
  }
}

// function to get the user based on PasswordResetToken
export async function getUserByResetPasswordToken(
  resetPasswordToken: string
): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        resetPasswordToken,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user by reset password token');
  }
}

// function to get the user based on EmailVerificationToken
export async function getUserByEmailVerificationToken(
  emailVerificationToken: string
): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        emailVerificationToken,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user by email verification token');
  }
}
