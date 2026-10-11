import type { BaseErrorMeta } from "@little-nebulae/error";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { SchemaError } from "@standard-schema/utils";

import { BaseError } from "@little-nebulae/error";

import type { ValidationErrorCode } from "@/error/codes";

import { VALIDATION_ERROR_CODE } from "@/error/codes";
import { joinIssueMessages } from "@/utils/join-issue-messages";

export class ValidationError<
  TCause extends SchemaError = SchemaError,
  TMeta extends BaseErrorMeta = null,
> extends BaseError<ValidationErrorCode, TCause, TMeta> {
  readonly name = "ValidationError";
  readonly code = VALIDATION_ERROR_CODE;
  readonly issues: readonly StandardSchemaV1.Issue[];

  constructor({
    message,
    cause,
    meta,
    issues,
  }: {
    message?: string;
    cause: TCause;
    meta: TMeta;
    issues: readonly StandardSchemaV1.Issue[];
  }) {
    super({ message: message ?? joinIssueMessages(issues), cause, meta });
    this.issues = issues;
  }
}
