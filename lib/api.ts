import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Standard API error codes available to all routes
 */
export type BaseErrorCode =
  // Auth errors
  | "UNAUTHENTICATED"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  // Validation errors
  | "BAD_REQUEST"
  | "INVALID_INPUT"
  | "VALIDATION_ERROR"
  // Resource errors
  | "NOT_FOUND"
  | "CONFLICT"
  | "ALREADY_EXISTS"
  // Server errors
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE"
  // Rate limiting
  | "RATE_LIMITED";

/**
 * HTTP status codes for base error codes
 */
const BASE_ERROR_STATUS: Record<BaseErrorCode, number> = {
  UNAUTHENTICATED: 401,
  UNAUTHORIZED: 403,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  INVALID_INPUT: 400,
  VALIDATION_ERROR: 422,
  NOT_FOUND: 404,
  CONFLICT: 409,
  ALREADY_EXISTS: 409,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  RATE_LIMITED: 429,
};

/**
 * Definition for a custom error code
 */
export type ErrorDef = {
  status: number;
  message: string;
};


export type ErrorSchema = Record<string, ErrorDef>;

/**
 * Extract error codes from a schema
 */
export type ErrorCodesFromSchema<T extends ErrorSchema> = keyof T & string;

/**
 * Combined error codes (base + custom)
 */
export type AllErrorCodes<TCustom extends ErrorSchema = Record<string, never>> = 
  | BaseErrorCode 
  | ErrorCodesFromSchema<TCustom>;


export class ApiError<TCode extends string = BaseErrorCode> extends Error {
  public readonly status: number;

  constructor(
    public readonly code: TCode,
    options: {
      status?: number;
      message?: string;
      details?: Record<string, unknown>;
    } = {}
  ) {
    const status = options.status ?? 
      (BASE_ERROR_STATUS[code as BaseErrorCode]) ?? 
      400;
    const message = options.message ?? code;
    
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = options.details;
  }

  public readonly details?: Record<string, unknown>;

  toResponse(): NextResponse<ApiErrorResponse<TCode>> {
    return NextResponse.json(
      {
        success: false as const,
        error: {
          code: this.code,
          message: this.message,
          ...(this.details && { details: this.details }),
        },
      },
      { status: this.status }
    );
  }
}


export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};


export type ApiErrorResponse<TCode extends string = BaseErrorCode> = {
  success: false;
  error: {
    code: TCode;
    message: string;
    details?: Record<string, unknown>;
  };
};


export type ApiResponse<
  TData,
  TErrorCode extends string = BaseErrorCode
> = ApiSuccessResponse<TData> | ApiErrorResponse<TErrorCode>;


export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthenticatedSession = NonNullable<Session>;
export type SessionUser = AuthenticatedSession["user"];


export type BaseContext = {
  request: NextRequest;
  headers: Headers;
};

export type PublicContext = BaseContext & {
  session: Session | null;
};

export type AuthContext = BaseContext & {
  session: AuthenticatedSession;
  user: SessionUser;
};

export type AdminContext = AuthContext;

export function createErrors<T extends ErrorSchema>(schema: T) {
  return {
    /**
     * Throw a custom error defined in the schema
     */
    throw: <K extends keyof T & string>(
      code: K,
      overrides?: { message?: string; details?: Record<string, unknown> }
    ): never => {
      const def = schema[code];
      throw new ApiError(code, {
        status: def.status,
        message: overrides?.message ?? def.message,
        details: overrides?.details,
      });
    },

    /**
     * Create an ApiError without throwing
     */
    create: <K extends keyof T & string>(
      code: K,
      overrides?: { message?: string; details?: Record<string, unknown> }
    ): ApiError<K | BaseErrorCode> => {
      const def = schema[code];
      return new ApiError(code, {
        status: def.status,
        message: overrides?.message ?? def.message,
        details: overrides?.details,
      });
    },

    schema,
  };
}

/**
 * Create a successful JSON response
 */
export function success<T>(
  data: T,
  status = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true as const, data }, { status });
}

/**
 * Create an error JSON response
 */
export function error(
  code: BaseErrorCode,
  message?: string,
  details?: Record<string, unknown>
): NextResponse<ApiErrorResponse<BaseErrorCode>> {
  return new ApiError(code, { message, details }).toResponse();
}

type HandlerFn<TContext> = (ctx: TContext) => Promise<NextResponse> | NextResponse;
type RouteHandler = (request: NextRequest) => Promise<NextResponse>;

/**
 * Create a public route handler
 */
export function publicRoute(handler: HandlerFn<PublicContext>): RouteHandler {
  return async (request: NextRequest) => {
    try {
      const headersList = await headers();

      let session: Session | null = null;
      try {
        session = await auth.api.getSession({ headers: headersList });
      } catch {
        // Session fetch failed, continue without session
      }

      const ctx: PublicContext = {
        request,
        headers: headersList,
        session,
      };

      return await handler(ctx);
    } catch (err) {
      return handleError(err);
    }
  };
}

/**
 * Create an admin route handler
 */
export function adminRoute(handler: HandlerFn<AdminContext>): RouteHandler {
  return async (request: NextRequest) => {
    try {
      const headersList = await headers();
      const session = await auth.api.getSession({ headers: headersList });

      if (!session) {
        throw new ApiError("UNAUTHENTICATED", { message: "Authentication required" });
      }

      if (session.user.approvalStatus !== "APPROVED") {
        throw new ApiError("FORBIDDEN", { message: "Admin access required" });
      }

      const ctx: AdminContext = {
        request,
        headers: headersList,
        session,
        user: session.user,
      };

      return await handler(ctx);
    } catch (err) {
      return handleError(err);
    }
  };
}

function handleError(err: unknown): NextResponse {
  if (err instanceof ApiError) {
    return err.toResponse();
  }

  console.error("Unhandled API error:", err);

  return error(
    "INTERNAL_ERROR",
    process.env.NODE_ENV === "development" && err instanceof Error
      ? err.message
      : "An unexpected error occurred"
  );
}


/**
 * Assert a condition or throw an ApiError
 */
export function assert(
  condition: unknown,
  code: BaseErrorCode,
  message?: string
): asserts condition {
  if (!condition) {
    throw new ApiError(code, { message });
  }
}

/**
 * Assert value is not null/undefined
 */
export function assertExists<T>(
  value: T | null | undefined,
  code: BaseErrorCode = "NOT_FOUND",
  message?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new ApiError(code, { message });
  }
}
