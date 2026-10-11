import type { SchemaError } from "@standard-schema/utils";
import type { ZodError } from "zod";

import { expectTypeOf, test } from "vitest";

test("ZodError should extend SchemaError", () => {
  expectTypeOf<ZodError>().toExtend<SchemaError>();
});
