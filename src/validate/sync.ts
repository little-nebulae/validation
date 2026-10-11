import type { Result } from "@little-nebulae/result";
import type { StandardSchemaV1 } from "@standard-schema/spec";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { fail } from "@little-nebulae/result";

import type { ValidationError } from "@/error/classes/validation";

import { UnsupportedAsyncSchemaError } from "@/error/classes/unsuppported-async-schema";
import { wrapStandardResult } from "@/utils/wrap-standard-result";

export function validateSync<T extends StandardSchemaV1>({
  schema,
  input,
}: {
  schema: T;
  input: StandardSchemaV1.InferInput<T>;
}): Result<
  StandardSchemaV1.InferOutput<T>,
  UnsupportedAsyncSchemaError<T> | ValidationError | UnexpectedError
> {
  try {
    const result = schema["~standard"].validate(input);
    if (result instanceof Promise) {
      result.catch(() => {});
      return fail(new UnsupportedAsyncSchemaError(result));
    }
    return wrapStandardResult(result);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "validate input synchronously with schema",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
