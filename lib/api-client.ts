import type { ApiSuccessResponse, ApiErrorResponse, BaseErrorCode } from "./api";

export type RouteDefinition<
  TData = unknown,
  TErrors extends string = string,
  TInput = unknown
> = {
  data: TData;
  errors: TErrors;
  input: TInput;
};

export type RouteResponse<T extends RouteDefinition> =
  | ApiSuccessResponse<T["data"]>
  | ApiErrorResponse<T["errors"] | BaseErrorCode>;


type FetchOptions<TInput> = Omit<RequestInit, "body" | "method"> & {
  input?: TInput;
};


export type ApiResult<TData, TErrors extends string = BaseErrorCode> =
  | { success: true; data: TData }
  | { success: false; error: { code: TErrors | BaseErrorCode; message: string; details?: Record<string, unknown> } };

/**
 * Permitir Type Safety para chamadas de API
 * 
 * @exemplo
 * ```ts
 * // No ficheiro da rota (route.ts) exportar os seguintes tipos:
 * export type FileUploadRoute = RouteDefinition<
 *   { url: string },           // Tipo de sucesso
 *   "INVALID_FILE" | "FILE_TOO_LARGE",  // Erros especificos da rota (opcional)
 *   FormData                   // Tipo do input
 * >;
 * 
 * // No cliente:
 * import type { FileUploadRoute } from "@/app/api/files/route";
 * 
 * const uploadFile = apiClient<FileUploadRoute>("/api/files");
 * const result = await uploadFile.post({ input: formData });
 * 
 * if (result.success) {
 *   console.log(result.data.url); // typed!
 * } else {
 *   if (result.error.code === "FILE_TOO_LARGE") { // typed!
 *     // podemos assim ter erros especificos
 *   }
 * }
 * ```
 */
export function apiClient<T extends RouteDefinition>(endpoint: string) {
  const createFetcher = (method: string) => {
    return async (options?: FetchOptions<T["input"]>): Promise<ApiResult<T["data"], T["errors"]>> => {
      const { input, ...fetchOptions } = options ?? {};
      
      let body: BodyInit | undefined;
      let headers: HeadersInit = { ...fetchOptions.headers };
      
      if (input !== undefined) {
        // Check if input is FormData
        const isFormData = typeof FormData !== "undefined" && 
          Object.prototype.toString.call(input) === "[object FormData]";
        
        if (isFormData) {
          body = input as FormData;
          // Don't set Content-Type for FormData, let browser set it with boundary
        } else {
          body = JSON.stringify(input);
          headers = { ...headers, "Content-Type": "application/json" };
        }
      }

      try {
        const response = await fetch(endpoint, {
          ...fetchOptions,
          method,
          body,
          headers,
        });

        const json = await response.json();
        return json as ApiResult<T["data"], T["errors"]>;
      } catch (error) {
        return {
          success: false,
          error: {
            code: "INTERNAL_ERROR" as const,
            message: error instanceof Error ? error.message : "Network error",
          },
        };
      }
    };
  };

  return {
    get: createFetcher("GET"),
    post: createFetcher("POST"),
    put: createFetcher("PUT"),
    patch: createFetcher("PATCH"),
    delete: createFetcher("DELETE"),
  };
}

/**
 * Helper to define a route's types inline
 */
export function defineRoute<
  TData,
  TErrors extends string = never,
  TInput = undefined
>() {
  return {} as RouteDefinition<TData, TErrors, TInput>;
}

/**
 * Extract data type from a route definition
 */
export type InferData<T extends RouteDefinition> = T["data"];

/**
 * Extract error codes from a route definition
 */
export type InferErrors<T extends RouteDefinition> = T["errors"];

/**
 * Extract input type from a route definition
 */
export type InferInput<T extends RouteDefinition> = T["input"];
