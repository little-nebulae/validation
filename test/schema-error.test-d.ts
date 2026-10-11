import type { SchemaError } from "@standard-schema/utils";
import type { ArkError, ArkErrors } from "arktype";
import type { BaseIssue, BaseSchema, ValiError } from "valibot";
import type { ZodError } from "zod";

import { describe, expectTypeOf, test } from "vitest";

// Success cases
describe("SchemaError should be compatible with", () => {
  test("zod's error", () => {
    expectTypeOf<ZodError>().toExtend<SchemaError>();
  });
  test("valibot's error", () => {
    expectTypeOf<
      ValiError<BaseSchema<unknown, unknown, BaseIssue<unknown>>>
    >().toExtend<SchemaError>();
  });
});

// Failure cases
describe("SchemaError should NOT be compatible with", () => {
  test("arktype's errors", () => {
    expectTypeOf<ArkError>().not.toExtend<SchemaError>();
    expectTypeOf<ArkErrors>().not.toExtend<SchemaError>();
  });
});
