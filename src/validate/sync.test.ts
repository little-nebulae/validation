import type { JSONType } from "zod";

import { SchemaError } from "@standard-schema/utils";
import { assert, describe, expect, test } from "vitest";
import { z } from "zod";

import { VALIDATION_ERROR_CODE } from "@/error/codes";
import { validateSync } from "@/validate/sync";

// Success cases
describe("validateSync function should succeed", () => {
  test("when the input satisfies the schema", () => {
    const plainObject = {
      hello: "Hello there",
      bye: "Goodbye",
    };

    const result = validateSync({ schema: z.json(), input: plainObject });
    assert(result.success);
    expect(result.data).toMatchObject(plainObject);
  });
});

// Failure cases
describe("validateSync function should fail", () => {
  test("when the input doesn't satisfy the schema", () => {
    const input = {
      date: new Date(),
      notDefined: undefined,
    };
    const schema = z.json();

    const zodResult = schema.safeParse(input);
    assert(zodResult.success === false);
    const zodError = zodResult.error;

    const result = validateSync({
      schema,
      input: input as unknown as JSONType,
    });
    assert(result.success === false);
    const error = result.error;

    assert(error.code === VALIDATION_ERROR_CODE);
    expect(error.cause).toBeInstanceOf(SchemaError);
    expect(error.issues).toMatchObject(zodError.issues);
  });
});
