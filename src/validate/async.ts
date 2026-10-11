import type { StandardSchemaV1 } from "@standard-schema/spec";

import { fail, succeed } from "@little-nebulae/result";
import { SchemaError } from "@standard-schema/utils";

import { ValidationError } from "@/error/classes/validation";
import { validateSync } from "@/validate/sync";

export async function validateAsync<T extends StandardSchemaV1>({
  schema,
  input,
}: {
  schema: T;
  input: StandardSchemaV1.InferInput<T>;
}) {
  const syncResult = validateSync({ schema, input });

  if (!syncResult.success) {
    if (syncResult.error.code === "UNSUPPORTED_ASYNC_SCHEMA_ERROR") {
      const result = await syncResult.error.cause;

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
    return syncResult;
  }
  return syncResult;
}
