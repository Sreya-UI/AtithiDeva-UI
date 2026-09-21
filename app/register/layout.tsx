import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Add Your Property | Atithideva",
  description: "Register your property with Atithideva to run your hotel operations smoothly.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://app.digio.in/sdk/v11/digio_v11.js" strategy="afterInteractive" />
      {children}
    </>
  );
}
