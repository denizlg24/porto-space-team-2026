# Porto Space Team 2026

A Next.js 16 web application for the Porto Space Team, built with TypeScript, Tailwind CSS, and MongoDB.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB with Mongoose
- **Authentication**: better-auth
- **Internationalization**: Intlayer (next-intlayer)
- **UI Components**: shadcn/ui (Radix primitives)
- **Email**: Resend
- **File Storage**: Pinata (IPFS)
- **Video Conferencing**: Jitsi Meet (free, no API keys required)

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── applications/       # Application management
│   │   ├── auth/               # Authentication endpoints
│   │   ├── contacts/           # Contact form submissions
│   │   ├── departments/        # Department data
│   │   ├── files/              # File upload to Pinata
│   │   ├── interview-slots/    # Interview slot management
│   │   ├── newsletter/         # Newsletter subscriptions
│   │   └── sponsors/           # Sponsor management
│   └── [locale]/               # Internationalized pages
│       ├── (main)/             # Public pages (about, apply, competitions, etc.)
│       └── admin/              # Admin panel pages
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── *.tsx                   # Shared components
├── lib/
│   ├── actions/                # Server actions
│   ├── api.ts                  # API route helpers
│   ├── api-client.ts           # Type-safe API client
│   ├── auth.ts                 # Authentication configuration
│   ├── db.ts                   # MongoDB connection
│   ├── email-templates.ts      # Email HTML templates
│   ├── env.ts                  # Environment validation (Zod)
│   ├── rate-limit.ts           # MongoDB-based rate limiting
│   ├── google-meet.ts          # Jitsi Meet room generation (no API keys needed)
│   └── utils.ts                # Utility functions
├── models/                     # Mongoose models
├── hooks/                      # React hooks
└── messages/                   # Intlayer content files
```

## Key Patterns

### API Routes

API routes use typed helpers from `lib/api.ts`:

```typescript
import { publicRoute, adminRoute, success, ApiError, assert, assertExists, createErrors } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";

// Define custom errors
const errors = createErrors({
  CUSTOM_ERROR: { status: 400, message: "Custom error message" },
});

// Define route types for client type safety
export type MyRoute = RouteDefinition<
  ResponseData,           // Success response type
  "CUSTOM_ERROR",         // Custom error codes
  InputData               // Request body type (optional)
>;

// Public route (no auth required)
export const GET = publicRoute(async (ctx) => {
  // ctx.request, ctx.headers available
  return success<ResponseData>({ ... });
});

// Admin route (requires authenticated admin)
export const POST = adminRoute(async (ctx) => {
  // ctx.user, ctx.session available
  return success<ResponseData>({ ... });
});
```

### Type-Safe API Client

Client-side API calls use `lib/api-client.ts`:

```typescript
import { apiClient } from "@/lib/api-client";
import type { MyRoute } from "@/app/api/my-route/route";

const myApi = apiClient<MyRoute>("/api/my-route");

// GET request
const result = await myApi.get();

// POST request with body
const result = await myApi.post({ input: { field: "value" } });

if (result.success) {
  console.log(result.data); // Typed response
} else {
  console.log(result.error.code); // Typed error code
}
```

### Internationalization

Content files use Intlayer format (`.content.tsx`):

```typescript
// page.content.tsx
import { t, type DeclarationContent } from "intlayer";

const content = {
  key: "page-name",
  content: {
    title: t({ en: "English Title", pt: "Título em Português" }),
    description: t({ en: "...", pt: "..." }),
  },
} satisfies DeclarationContent;

export default content;
```

Use content in components:

```typescript
import { getIntlayer } from "next-intlayer";

function MyComponent({locale}:{locale:string}) {
  const content = getIntlayer("error-page", locale);
  return <h1>{content.title}</h1>;
}
```

### Server Actions

Server actions are in `lib/actions/`:

```typescript
"use server";

import { connectDB } from "@/lib/db";
import { MyModel } from "@/models/MyModel";

export async function myAction(data: InputType): Promise<ActionResult> {
  await connectDB();
  // ... implementation
  return { success: true, data: result };
}
```

### Rate Limiting

MongoDB-based rate limiting for serverless:

```typescript
import { checkRateLimit } from "@/lib/rate-limit";

const result = await checkRateLimit(`action:${identifier}`, {
  maxRequests: 5,
  windowMs: 60000, // 1 minute
});

if (!result.success) {
  throw new ApiError("RATE_LIMITED", {
    message: `Too many requests. Try again in ${result.retryAfterMs}ms`,
  });
}
```

## Models

- **User** - Admin users with approval workflow
- **Application** - Member applications with status tracking
- **InterviewSlot** - Admin-defined interview availability
- **Department** - Team departments
- **Project** - Team projects with dynamic content
- **Sponsor** - Sponsor management with categories
- **Contact** - Contact form submissions
- **Newsletter** - Newsletter subscribers
- **RateLimit** - Rate limiting records (TTL indexed)

## Environment Variables

Required in `.env`:

```env
# Database
MONGODB_URI=

# Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# Email
RESEND_API_KEY=
EMAIL_FROM=

# File Storage
PINATA_JWT=
NEXT_PUBLIC_GATEWAY_URL=

# Video Conferencing
# Jitsi Meet is used - no API keys required!
```

## Application Flow

### Member Application
1. User submits application form (personal info, department selection, file uploads)
2. Application stored with `status: "new"`
3. Admin receives email notification
4. Admin reviews and updates status (read → interview → accepted/rejected)
5. When set to "interview", admin creates available slots
6. Applicant books interview via calendar UI
7. Google Meet meeting auto-created, emails sent to both parties

### Admin Authentication
1. User registers with email/password
2. Email verification required
3. Admin approval required before access
4. Upon approval, user receives access email

## Key Components

### InterviewCalendar
Reusable calendar for interview scheduling:
- **Booking mode**: Applicants select from available slots
- **Admin mode**: Admins create/manage availability

### Application Status Display
Visual roadmap showing application progress through stages.

## Commands

**Important** Don't ever run dev commands as a dev server will always be up. Don't build unless asked too. When you have dictionary related errors try building the dictionary with the dictionary command.

```bash
bun dev      # Start dev server with Intlayer watching
bun run build    # Production build
bunx intlayer dictionaries build # Build the dictionaries for intlayer type safety

```

## Styling Guidelines

- Primary color: `#8b4513` (saddle brown)
- Use Tailwind CSS utility classes
- Follow shadcn/ui component patterns
- Email templates use inline styles (neutral theme)

## Notes

- All dates stored in UTC, displayed in user's locale
- Files uploaded to Pinata IPFS
- Rate limiting uses MongoDB with TTL indexes (serverless-compatible)
- Jitsi Meet rooms are generated automatically for interviews (no API keys required)
