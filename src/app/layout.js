import "./globals.css";

export const metadata = {
  title: "NEXUS.AI | Elite Threat Intelligence",
  description: "Advanced AI-Driven Threat Detection & Simulation Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
