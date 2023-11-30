"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to '/en/logged/alltokens' when the component mounts or gets re-rendered
    router.push('/en/logged/allTokens');
  }, []); // The empty dependency array ensures that this effect runs only once

  return (
    <div></div>
  );
}

export default Page;