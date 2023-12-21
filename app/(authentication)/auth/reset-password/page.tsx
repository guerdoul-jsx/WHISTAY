import AuthWraper from '@/components/auth/auth-wraper';
import { ResetPassword as ResetPasswordForm } from '@/components/forms/reset-password-form ';

export default function ResetPassword() {
  return (
    <AuthWraper
      title={
        <>
          <span className="text-[#27963C]">Reset Password</span>
        </>
      }
      isSignin={false}
      isSocialLoginActive={false}
    >
      <ResetPasswordForm />
    </AuthWraper>
  );
}
