import "./globals.css";

import { ReduxProvider } from "@/components/providers/ReduxProvider"; 
import AuthProvider from "@/components/providers/AuthProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <div id="modal-portal" />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}