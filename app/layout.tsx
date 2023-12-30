import '/app/components/global.css';
import { ralewayFont, latoFont } from './components/fonts';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${ralewayFont.className} antialiased ${latoFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
