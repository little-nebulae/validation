import type { TypeGuardError } from "typia";

import { BaseError, composeErrorMessage } from "@little-nebulae/error";

import type { AssertionErrorCode } from "@/error/codes";

import { ASSERTION_ERROR_CODE } from "@/error/codes";

export class AssertionError<T> extends BaseError<
  AssertionErrorCode,
  TypeGuardError<T>
> {
  readonly name = "AssertionError";
  readonly code = ASSERTION_ERROR_CODE;

  constructor({
    expectedType,
    cause,
  }: {
    expectedType: string;
    cause: TypeGuardError<T>;
  }) {
    const message = composeErrorMessage({
      operation: `assert value as ${expectedType}`,
      reason: "it being invalid",
    });
    super({ message, cause, meta: null });
  }
}
