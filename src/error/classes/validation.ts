import type { IValidation } from "typia";

import { BaseError, composeErrorMessage } from "@little-nebulae/error";

import type { ValidationErrorCode } from "@/error/codes";

import { VALIDATION_ERROR_CODE } from "@/error/codes";

export class ValidationError extends BaseError<
  ValidationErrorCode,
  IValidation.IError[]
> {
  readonly name = "ValidationError";
  readonly code = VALIDATION_ERROR_CODE;

  constructor({
    expectedType,
    cause,
  }: {
    expectedType: string;
    cause: IValidation.IError[];
  }) {
    const message = composeErrorMessage({
      operation: `validate value as ${expectedType}`,
      reason: "it being invalid",
    });
    super({ message, cause, meta: null });
  }
}
