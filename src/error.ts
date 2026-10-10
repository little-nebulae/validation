import type { ZodError } from "zod";

import { BaseError } from "@little-nebulae/error";
import { prettifyError } from "zod";

export const VALIDATION_ERROR_CODE = "VALIDATION_ERROR";
export type ValidationErrorCode = typeof VALIDATION_ERROR_CODE;

export class ValidationError extends BaseError<ValidationErrorCode, ZodError> {
  readonly name = "ValidationError";
  readonly code = VALIDATION_ERROR_CODE;

  constructor({ message, cause }: { message?: string; cause: ZodError }) {
    super({ message: message ?? prettifyError(cause), cause, meta: null });
  }
}
