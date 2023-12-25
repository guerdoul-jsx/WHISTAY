'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export function SignoutBtn() {
  const [show, setShow] = useState(true);
  return (
    <section>
      <Button onClick={async () => await signOut()} className="bg-red-500">
        Logout
      </Button>
      <Button onClick={() => setShow(!show)}>Show</Button>
      {show && (
        <p className="delay-750 fade-out repeat-infinite my-4 animate-bounce">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
          repellat? Deleniti similique rem obcaecati harum quasi veritatis at,
          maiores autem repudiandae, pariatur consectetur commodi non eveniet,
          maxime possimus delectus? Aut.
        </p>
      )}
      {/* <div
        className={`${
          show ? 'delay-750 my-4 animate-bounce duration-300' : ''
        }`}
      >
        <p
          className={`animate-in  transition-all duration-1000 ${
            show ? 'visible' : 'invisible'
          }`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          similique blanditiis voluptatum sint ex ad sit eligendi, quo iusto
          sunt veniam veritatis! Voluptate, nobis adipisci. Tenetur sapiente vel
          minus odio.
        </p>
      </div> */}
    </section>
  );
}
