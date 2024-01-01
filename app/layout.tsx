import '/app/components/global.css';
import { ralewayFont, latoFont } from './components/fonts';
import Navbar from './components/layouts/navbar/navbar';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Deku-Do®</title>
      </head>
      <body
        className={`${ralewayFont.className} antialiased ${latoFont.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
