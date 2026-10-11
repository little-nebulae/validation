import type { Simplify } from "type-fest";
import type { ZodSafeParseResult, ZodType } from "zod";
import type { ParseContext, $ZodIssue } from "zod/v4/core";

import { fail, succeed } from "@little-nebulae/result";
import { prettifyError } from "zod";

import { ValidationError } from "@/error/classes/validation";

export function wrapZodResult<T extends ZodType>(
  result: ZodSafeParseResult<T>,
  context: Simplify<ParseContext<$ZodIssue>> = {},
) {
  if (result.success) {
    return succeed(result.data);
  }

  const error = result.error;
  return fail(
    new ValidationError({
      message: prettifyError(error),
      cause: error,
      issues: error.issues,
      meta: context,
    }),
  );
}
