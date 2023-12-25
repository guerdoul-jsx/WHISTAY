import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';
import { Img } from '@react-email/img';
import { siteConfig } from '@/config/website';
import { dynamicUrl } from '@/lib/utils';

interface ResetPasswordEmailProps {
  name: string;
  email: string;
  resetPasswordToken: string;
}

export default function ResetPasswordEmail({
  name,
  email,
  resetPasswordToken,
}: Readonly<ResetPasswordEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} password reset.`;

  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-50">
          <Container>
            <Section>
              <Img
                src="https://svgur.com/i/11BX.svg"
                width="170"
                height="50"
                alt={siteConfig.name}
                className="mx-auto my-0"
              />
              <Text className="text-xl">Hi {name},</Text>
              <Text className="text-base">
                Someone just requested a password change for your{' '}
                {siteConfig.name}
                account associated with {email}.
              </Text>
              <Text className="text-base">
                If this was you, you can set a new password here:
              </Text>
              <Button
                href={dynamicUrl(
                  `/auth/update-password?token=${resetPasswordToken}`
                )}
                className="block rounded-[3px] bg-[#27963C] px-8 py-2 text-center text-base text-white"
              >
                Set new password
              </Button>
            </Section>
            <Section>
              <Text className="text-xs">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="text-xs">
                To keep your account secure, please don&apos;t forward this
                email to anyone.
              </Text>
            </Section>
            <Section>
              <Text className="text-base font-medium">
                Enjoy{' '}
                <span className="font-semibold tracking-wide">
                  {siteConfig.name}
                </span>{' '}
                and have a nice day!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// !! This is a test using command "email dev" from react.email

// import { Body } from '@react-email/body';
// import { Button } from '@react-email/button';
// import { Container } from '@react-email/container';
// import { Head } from '@react-email/head';
// import { Html } from '@react-email/html';
// import { Preview } from '@react-email/preview';
// import { Section } from '@react-email/section';
// import { Tailwind } from '@react-email/tailwind';
// import { Text } from '@react-email/text';
// import { Img } from '@react-email/img';

// interface ResetPasswordEmailProps {
//   email: string;
//   resetPasswordToken: string;
// }

// export default function ResetPasswordEmail({
//   email = 'mahmoudgedoul0@gmail.com',
//   resetPasswordToken = 'asdbasjdhanduyas8976',
// }: Readonly<ResetPasswordEmailProps>): JSX.Element {
//   const siteConfig = {
//     name: 'Whistay',
//   };
//   const previewText = `${siteConfig.name} password reset.`;

//   return (
//     <Html lang="en">
//       <Head>
//         <title>{previewText}</title>
//       </Head>
//       <Preview>{previewText}</Preview>
//       <Tailwind>
//         <Body className="bg-gray-50">
//           <Container>
//             <Section>
//               <Img
//                 src="https://svgur.com/i/11BX.svg"
//                 width="170"
//                 height="50"
//                 alt={siteConfig.name}
//                 className="mx-auto my-0"
//               />
//               <Text className="text-xl">Hi,</Text>
//               <Text className="text-base">
//                 Someone just requested a password change for your{' '}
//                 {siteConfig.name}
//                 account associated with {email}.
//               </Text>
//               <Text className="text-base">
//                 If this was you, you can set a new password here:
//               </Text>
//               <Button
//                 className="block rounded-[3px] bg-[#27963C] px-8 py-2 text-center text-base text-white"
//               >
//                 Set new password
//               </Button>
//             </Section>
//             <Section>
//               <Text className="text-xs">
//                 If you don&apos;t want to change your password or didn&apos;t
//                 request this, just ignore and delete this message.
//               </Text>
//               <Text className="text-xs">
//                 To keep your account secure, please don&apos;t forward this
//                 email to anyone.
//               </Text>
//             </Section>
//             <Section>
//               <Text className="text-base font-medium">
//                 Enjoy{' '}
//                 <span className="font-semibold tracking-wide">
//                   {siteConfig.name}
//                 </span>{' '}
//                 and have a nice day!
//               </Text>
//             </Section>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// }
