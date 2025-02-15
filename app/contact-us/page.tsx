import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from 'Components/UI/Loader';

const ContactUs = dynamic(
  () => import('./Components/ContactUs'),
  {
    loading: () => (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-primary text-4xl mb-4">॥</div>
        <Loader size="lg" text="Preparing your sacred journey..." />
      </div>
    ),
    ssr: true
  }
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-[url('/sacred-pattern.png')] opacity-5" />
      <Suspense 
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-primary text-4xl mb-4">॥</div>
            <Loader size="lg" text="Preparing your sacred journey..." />
          </div>
        }
      >
        <ContactUs />
      </Suspense>
    </main>
  );
}