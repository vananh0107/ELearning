import type { AppProps } from 'next/app';
import Script from 'next/script';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <script
        src="https://player.vdocipher.com/v2/api.js"
        async
        onLoad={() => console.log('Vdo.js script loaded!')}
      ></script>
      <Component {...pageProps} />
    </>
  );
}
