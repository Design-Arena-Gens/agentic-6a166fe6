import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'OmniChannel Agentic Marketer',
  description:
    'Autonomous marketing operations across Meta, LinkedIn, Google, Email, and Web with AI-driven orchestration.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
