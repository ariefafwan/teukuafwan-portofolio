import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="pYV240HQpkXWkwz4H9UAA_8jTTUAK4GX_FNZU6m268s" />

        <meta name="description" content="Portofolio pribadi Teuku Afwan. Jelajahi proyek-proyek saya di bidang web/mobile development, dan aplikasi digital lainnya." />
        <meta name="keywords" content="Teuku Afwan, Code Enthusiast, UI/UX Designer, Portofolio, Freelancer" />
        <meta name="author" content="Teuku M Arief Afwan" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.teukuafwan.my.id" />
        <meta property="og:title" content="Teuku Afwan — Code Enthusiast" />
        <meta property="og:description" content="Portofolio pribadi Teuku Afwan. Jelajahi proyek-proyek saya di bidang web/mobile development, dan aplikasi digital lainnya." />
        <meta property="og:image" content="https://www.teukuafwan.my.id/progrity_mentor.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.teukuafwan.my.id" />
        <meta property="twitter:title" content="Teuku Afwan — Code Enthusiast" />
        <meta property="twitter:description" content="Portofolio pribadi Teuku Afwan. Jelajahi proyek-proyek saya di bidang web/mobile development, dan aplikasi digital lainnya." />
        <meta property="twitter:image" content="https://www.namadomainanda.com/images/preview.jpg" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
