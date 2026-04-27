import React from 'react';

const PaperBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-cream selection:bg-rose/30">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
      
      {/* Background Shapes */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-blush/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/2 -right-48 w-[30rem] h-[30rem] bg-beige/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-48 left-1/4 w-[40rem] h-[40rem] bg-rose/10 rounded-full blur-3xl pointer-events-none -z-10" />
    </div>
  );
};

export default PaperBackground;
