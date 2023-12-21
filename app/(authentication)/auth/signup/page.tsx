import { SignupForm } from '@/components/forms/signup-form';
import AuthWraper from '@/components/auth/auth-wraper';

export default function Signup() {
  return (
    <AuthWraper
      title={
        <>
          <span className="bg-gradient-to-r from-[#27963C] to-[#80CC28] bg-clip-text text-transparent">
            Join us today!
          </span>
          {'  '} Get special benefits and stay up-to-date.
        </>
      }
      isSignin={false}
      isSocialLoginActive={true}
    >
      <SignupForm />
    </AuthWraper>
  );
}
