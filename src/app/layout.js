import "bootstrap/dist/css/bootstrap.min.css"

export const metadata = {
  title: "Crypto Patreon",
  description: "Tip your favorite influencer!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
