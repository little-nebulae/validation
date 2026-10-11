import type { Result } from "@little-nebulae/result";
import type { StandardSchemaV1 } from "@standard-schema/spec";

import { fail, succeed } from "@little-nebulae/result";
import { SchemaError } from "@standard-schema/utils";

import { ValidationError } from "@/error/classes/validation";

export function wrapStandardResult<T extends StandardSchemaV1>(
  result: StandardSchemaV1.Result<StandardSchemaV1.InferOutput<T>>,
): Result<StandardSchemaV1.InferOutput<T>, ValidationError> {
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
}
