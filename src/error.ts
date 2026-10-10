import type { StandardSchemaV1 } from "@standard-schema/spec";

import { BaseError } from "@little-nebulae/error";

export const VALIDATION_ERROR_CODE = "VALIDATION_ERROR";
export type ValidationErrorCode = typeof VALIDATION_ERROR_CODE;

export class ValidationError extends BaseError<ValidationErrorCode> {
  readonly name = "ValidationError";
  readonly code = VALIDATION_ERROR_CODE;
  readonly issues: StandardSchemaV1.Issue[];

  constructor({
    message,
    cause,
    issues,
  }: {
    message: string;
    cause: unknown;
    issues: StandardSchemaV1.Issue[];
  }) {
    super({ message, cause, meta: null });
    this.issues = issues;
  }
}
