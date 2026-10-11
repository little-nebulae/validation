import type { JSONType } from "zod";

import { SchemaError } from "@standard-schema/utils";
import { assert, describe, expect, test } from "vitest";
import { z } from "zod";

import { UnsupportedAsyncSchemaError } from "@/error/classes/unsuppported-async-schema";
import {
  UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE,
  VALIDATION_ERROR_CODE,
} from "@/error/codes";
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

  test("when the schema is async", () => {
    const takenUsernames = new Set(["admin", "root"]);
    const isUsernameAvailable = async (name: string) => {
      await new Promise((r) => setTimeout(r, 50));
      return !takenUsernames.has(name);
    };
    const SignupSchema = z
      .object({
        username: z
          .string()
          .min(3)
          .refine(isUsernameAvailable, { error: "Username is already taken" }),
        email: z.email().transform(async (e) => e.toLowerCase()),
        password: z.string().min(8),
        confirmPassword: z.string(),
      })
      .refine((d) => d.password === d.confirmPassword, {
        path: ["confirmPassword"],
        error: "Passwords do not match",
      });

    const result = validateSync({
      schema: SignupSchema,
      input: {
        username: "Spider Man",
        email: "spidey@gmail.com",
        password: "********",
        confirmPassword: "********",
      },
    });
    assert(result.success === false);

    const error = result.error;
    expect(error).toBeInstanceOf(UnsupportedAsyncSchemaError);
    expect(error.code).toBe(UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE);
    expect(error.cause).toBeInstanceOf(Promise);
  });
});
