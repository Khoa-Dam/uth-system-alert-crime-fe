import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,

    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        /* -----------------------------------------------------------------------------------------------
         * Node.js Environment
         * -----------------------------------------------------------------------------------------------*/

        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),

        /* -----------------------------------------------------------------------------------------------
         * NextAuth.js
         * -----------------------------------------------------------------------------------------------*/

        AUTH_SECRET:
            process.env.NODE_ENV === "production" ?
                z.string()
                : z.string().optional(),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),

        AUTH_URL: z.preprocess(
            // Vercel: use VERCEL_URL (no https prefix, so skip url validation)
            // Cloud Run / others: use NEXTAUTH_URL
            (str) => process.env.VERCEL_URL ?? process.env.NEXTAUTH_URL ?? str,
            process.env.VERCEL_URL ? z.string() : z.string().url().optional()
        ),


    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        NEXT_PUBLIC_API_BASE_URL: z.string().url().min(1, { message: "API Base URL is invalid or missing" }),
        NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     * For Next.js >= 13.4.4, you only need to destructure client variables (Only valid for `experimental__runtimeEnv`)
     */
    experimental__runtimeEnv: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },

    /**
     * Makes it so that empty strings are treated as undefined.
     * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});
