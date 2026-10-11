import type { StandardSchemaV1 } from "@standard-schema/spec";

import { BaseError } from "@little-nebulae/error";

import type { ValidationErrorCode } from "@/error/codes";

import { VALIDATION_ERROR_CODE } from "@/error/codes";

export class ValidationError extends BaseError<ValidationErrorCode> {
  readonly name = "ValidationError";
  readonly code = VALIDATION_ERROR_CODE;
  readonly issues: readonly StandardSchemaV1.Issue[];

  constructor({
    message,
    cause,
    issues,
  }: {
    message: string;
    cause: unknown;
    issues: readonly StandardSchemaV1.Issue[];
  }) {
    super({ message, cause, meta: null });
    this.issues = issues;
  }
}
