import type { StandardSchemaV1 } from "@standard-schema/spec";

export function joinIssueMessages(issues: readonly StandardSchemaV1.Issue[]) {
  const messages = issues.map((issue) => issue.message);
  return messages.join("\n");
}
