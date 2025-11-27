import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import localFont from "next/font/local";

/* -----------------------------------------------------------------------------------------------
 * Google Fonts
 * -----------------------------------------------------------------------------------------------*/

export const fontSans = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

export const fontMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

export const merriweather = Merriweather({
    variable: "--font-merriweather",
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    display: "swap",
});
/* -----------------------------------------------------------------------------------------------
 * Local Fonts
 * -----------------------------------------------------------------------------------------------*/

export const fontHeading = localFont({
    src: "../../public/fonts/CalSans-SemiBold.woff",
    variable: "--font-heading",
    display: "swap",
});

export const fontHandwriting = localFont({
    src: "../../public/fonts/Virgil.woff2",
    variable: "--font-handwriting",
    display: "swap",
});

// ...
