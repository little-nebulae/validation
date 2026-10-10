import { is } from "typia";
import { expect, test } from "vitest";

test("typia should work", () => {
  const result = is<{ id: string }>({ id: "ok" });
  expect(result).toBe(true);
});
