import './globals.css';

export const metadata = {
  title: 'Vie house イエタテフェアアンケート',
  description: 'Vie house イエタテフェア来場者アンケート',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
