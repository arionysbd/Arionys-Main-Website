// import { HilltopPOPAdsScript, BannerScript } from "@/components/ads/HilltopAdsScript";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (

    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="2d9411ba8b77a336dc470fef38942249dbbecc18" content="2d9411ba8b77a336dc470fef38942249dbbecc18" />
      </Head>
      <body>
        <Main />
        <NextScript />

      </body>
    </Html>
  );
}
