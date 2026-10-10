import type { Result } from "@little-nebulae/result";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { fail, succeed } from "@little-nebulae/result";
import { validate } from "typia";

import { ValidationError } from "@/error/classes/validation";

export function attemptValidate<T>(
  value: unknown,
  { expectedType }: { expectedType: string },
): Result<T, ValidationError | UnexpectedError> {
  try {
    const validateResult = validate<T>(value);
    if (validateResult.success) {
      return succeed(validateResult.data);
    }
    return fail(
      new ValidationError({ expectedType, cause: validateResult.errors }),
    );
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "validate value",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
