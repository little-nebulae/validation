import type { Result } from "@little-nebulae/result";
import type { StandardSchemaV1 } from "@standard-schema/spec";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { fail, succeed } from "@little-nebulae/result";
import { SchemaError } from "@standard-schema/utils";

import { UnsupportedAsyncSchemaError } from "@/error/classes/unsuppported-async-schema";
import { ValidationError } from "@/error/classes/validation";

export function validateSync<T extends StandardSchemaV1>({
  schema,
  input,
}: {
  schema: T;
  input: StandardSchemaV1.InferInput<T>;
}): Result<
  StandardSchemaV1.InferOutput<T>,
  ValidationError | UnsupportedAsyncSchemaError<T> | UnexpectedError
> {
  try {
    let result = schema["~standard"].validate(input);

    if (result instanceof Promise) {
      return fail(new UnsupportedAsyncSchemaError(result));
    }

    if (result.issues) {
      const issues = result.issues;
      return fail(
        new ValidationError({
          cause: new SchemaError(issues),
          meta: null,
          issues,
        }),
      );
    }

    return succeed(result.value);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "validate input with schema",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
