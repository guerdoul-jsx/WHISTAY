import { SigninForm } from '@/components/forms/signin-form';
import AuthWraper from '@/components/auth/auth-wraper';

export default function Signin() {
  return (
    <AuthWraper
      title={
        <>
          <span className="bg-gradient-to-r from-[#27963C] to-[#80CC28] bg-clip-text text-transparent">
            Welcome Back!
          </span>
          {'  '} Stay signed and get special benefits.
        </>
      }
      isSignin
      isSocialLoginActive={true}
    >
      <SigninForm />
    </AuthWraper>
  );
}
