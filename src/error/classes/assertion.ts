import type { TypeGuardError } from "typia";

import { BaseError } from "@little-nebulae/error";

import type { AssertionErrorCode } from "@/error/codes";

import { ASSERTION_ERROR_CODE } from "@/error/codes";

export class AssertionError<T> extends BaseError<
  AssertionErrorCode,
  TypeGuardError<T>
> {
  readonly name = "AssertionError";
  readonly code = ASSERTION_ERROR_CODE;
}
