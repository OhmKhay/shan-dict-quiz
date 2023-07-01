import "./globals.css";
import { Ubuntu, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: "Shan Dictionary Quiz ",
  description: "Answer questions on time and get points",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="description" content={"Quiz - Shan Dictionary"} />
      <meta name="keywords" content="HaoHaa, Science, Quiz, English, Shan" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://haohaa.sgp1.digitaloceanspaces.com/apple-touch-icon.png"
      />
      <meta property="og:title" content={"Quiz - Shan Dictionary"} />
      <meta property="og:site_name" content="Quiz" />
      <meta property="og:type" content={"website"} />
      <meta property="og:url" content={"https://quizzes.shandictionary.com/"} />
      <meta
        property="og:image"
        content={
          "https://haohaa.sgp1.cdn.digitaloceanspaces.com/shan-dict-cover.png"
        }
      />
      <meta property="og:image:alt" content={"Quiz - Shan Dictionary"} />
      <meta
        property="og:description"
        content={
          "A quiz that includes a timer, a list of questions, and a countdown."
        }
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <body
        className={`${ubuntu.variable} ${plusJakartaSans.variable} font-ubuntu`}
      >
        <Script strategy="afterInteractive" id="100vh-fix">
          {`
              var customViewportCorrectionVariable = 'vh';

              function setViewportProperty(doc) {
                var prevClientHeight;
                var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );
                function handleResize() {
                  var clientHeight = doc.clientHeight;
                  if (clientHeight === prevClientHeight) return;
                  requestAnimationFrame(function updateViewportHeight(){
                    doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
                    prevClientHeight = clientHeight;
                  });
                }
                handleResize();
                return handleResize;
              }
              window.addEventListener('resize', setViewportProperty(document.documentElement));
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
