import type { StandardSchemaV1 } from "@standard-schema/spec";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { fail } from "@little-nebulae/result";

import { wrapStandardResult } from "@/utils/wrap-result/wrap-standard-result";

export async function validateAsync<T extends StandardSchemaV1>({
  schema,
  input,
}: {
  schema: T;
  input: StandardSchemaV1.InferInput<T>;
}) {
  try {
    const result = await schema["~standard"].validate(input);
    return wrapStandardResult(result);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "validate input asynchronously with schema",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
