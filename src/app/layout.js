import './globals.css';

export const metadata = {
  title: 'ROLLIXBOOK | Premier Sportsbook & Exchange',
  description:
    'RollixBook - Next-Generation Sports Betting Exchange & Casino. Real-time Back & Lay odds, cricket session markets, high liquidity, and instant settlement.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="theme-light">{children}</body>
    </html>
  );
}
