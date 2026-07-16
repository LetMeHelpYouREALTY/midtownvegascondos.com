// This file configures the initialization of Sentry on the client.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Keep production sampling low — full 1.0 traces hurt mobile TBT.
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  debug: false,

  // Replay only on errors in production (Session Replay is a large client chunk).
  replaysOnErrorSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.5,
  replaysSessionSampleRate: 0,

  integrations:
    process.env.NODE_ENV === "development"
      ? [
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ]
      : [],
});
