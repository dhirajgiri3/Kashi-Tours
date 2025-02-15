import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Kashi Tour',
  description: 'Get in touch with us to plan your spiritual journey in Varanasi (Kashi). Book your customized tour packages and travel assistance.',
  keywords: 'contact kashi tour, varanasi tour booking, kashi tourism contact',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      {children}
    </section>
  );
}
