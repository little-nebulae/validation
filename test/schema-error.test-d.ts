import type { SchemaError } from "@standard-schema/utils";
import type { BaseIssue, BaseSchema, ValiError } from "valibot";
import type { ZodError } from "zod";

import { expectTypeOf, test } from "vitest";

test("ZodError should extend SchemaError", () => {
  expectTypeOf<ZodError>().toExtend<SchemaError>();
});

test("ValiError should extend SchemaError", () => {
  expectTypeOf<
    ValiError<BaseSchema<unknown, unknown, BaseIssue<unknown>>>
  >().toExtend<SchemaError>();
});
