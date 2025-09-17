// components/Layout.tsx

import Header from './Header';
import Footer from './Footer';
import React from 'react';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Layout;
