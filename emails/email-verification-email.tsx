import * as React from 'react';

import { env } from '@/ts-env.mjs';

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
import { Hr } from '@react-email/hr';

import { siteConfig } from '@/config/website';

interface EmailVerificationEmailProps {
  name: string;
  email: string;
  emailVerificationToken: string;
}

export default function EmailVerification({
  name,
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} Email verification`;
  return (
    <Html lang="en">
      <Head />
      <Preview> {previewText}</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container className="mx-auto my-0">
            <Img
              src="https://svgur.com/i/11BX.svg"
              width="170"
              height="50"
              alt={siteConfig.name}
              className="mx-auto my-0"
            />
            <Text className="text-base leading-6">Hi {name},</Text>
            <Text className="text-base leading-6">
              Welcome to {siteConfig.name}, the sales intelligence platform that
              helps you uncover qualified leads and close deals faster.
            </Text>
            <Text className="text-base">
              Please verify this address: {email} by clicking the button below:
            </Text>
            <Section className="text-center">
              <Button
                className="block rounded-[3px] bg-[#27963C] px-8 py-2 text-center text-base text-white"
                href={`${env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${emailVerificationToken}`}
              >
                Verify email now
              </Button>
            </Section>
            <Section>
              <Text className="text-xs">
                If you didn&apos;t sign up at {siteConfig.name}, just ignore and
                delete this message.
              </Text>
              <Text className="text-base font-medium">
                Enjoy{' '}
                <span className="font-semibold tracking-wide">
                  {siteConfig.name}
                </span>{' '}
                and have a nice day!
              </Text>
            </Section>
            <Text className="text-base leading-6">
              Best,
              <br />
              The {siteConfig.name} team
            </Text>
            <Hr className="mx-0 my-5 text-gray-300" />
            <Text className="text-xs text-[#8898aa]">
              408 Warren Rd - San Mateo, CA 94402
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// !! This is a test using command "email dev" from react.email
// import * as React from 'react';

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
// import { Hr } from '@react-email/hr';

// interface EmailVerificationEmailProps {
//   name: string;
//   email: string;
//   emailVerificationToken: string;
// }

// export default function EmailVerification({
//   name = 'Mahmoud',
//   email = 'mahmoudguedoul0@gmail.com',
//   emailVerificationToken = 'IAUYNU89723IOAOSD9897ASD!!!@@',
// }: Readonly<EmailVerificationEmailProps>): JSX.Element {
//   const siteConfig = {
//     name: 'Whistay',
//   };
//   const previewText = `${siteConfig.name} Email verification`;
//   return (
//     <Html lang="en">
//       <Head />
//       <Preview> {previewText}</Preview>
//       <Tailwind>
//         <Body className="bg-white">
//           <Container className="mx-auto my-0">
//             <Img
//               src="https://svgur.com/i/11BX.svg"
//               width="170"
//               height="50"
//               alt={siteConfig.name}
//               className="mx-auto my-0"
//             />
//             <Text className="text-base leading-6">Hi {name},</Text>
//             <Text className="text-base leading-6">
//               Welcome to {siteConfig.name}, the sales intelligence platform that
//               helps you uncover qualified leads and close deals faster.
//             </Text>
//             <Text className="text-base">
//               Please verify this address: {email} by clicking the button below:
//             </Text>
//             <Section className="text-center">
//               <Button
//                 className="block rounded-[3px] bg-[#27963C]  text-center text-base text-white"
//                 href={`/auth/verify-email?token=${emailVerificationToken}`}
//               >
//                 Verify now
//               </Button>
//             </Section>
//             <Section>
//               <Text className="text-xs">
//                 If you didn&apos;t sign up at {siteConfig.name}, just ignore and
//                 delete this message.
//               </Text>
//               <Text className="text-base font-medium">
//                 Enjoy{' '}
//                 <span className="font-semibold tracking-wide">{name}, </span>{' '}
//                 and have a nice day!
//               </Text>
//             </Section>
//             <Text className="text-base leading-6">
//               Best,
//               <br />
//               The {siteConfig.name} team
//             </Text>
//             <Hr className="mx-0 my-5 text-gray-300" />
//             <Text className="text-xs text-[#8898aa]">
//               408 Warren Rd - San Mateo, CA 94402
//             </Text>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// }
