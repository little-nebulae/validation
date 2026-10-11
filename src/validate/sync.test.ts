import { assert, describe, expect, test } from "vitest";
import { z } from "zod";

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
