import type { StandardSchemaV1 } from "@standard-schema/spec";

import { BaseError } from "@little-nebulae/error";

import type { UnsupportedAsyncSchemaErrorCode } from "@/error/codes";

import { UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE } from "@/error/codes";

export class UnsupportedAsyncSchemaError<
  T extends StandardSchemaV1,
> extends BaseError<
  UnsupportedAsyncSchemaErrorCode,
  Promise<StandardSchemaV1.Result<StandardSchemaV1.InferOutput<T>>>,
  null
> {
  readonly name = "UnsupportedAsyncSchemaError";
  readonly code = UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE;

  constructor(
    cause: Promise<StandardSchemaV1.Result<StandardSchemaV1.InferOutput<T>>>,
  ) {
    super({
      message:
        "Schema validation returned a Promise, but this API only supports synchronous schemas. Use a synchronous schema or the async variant.",
      cause,
      meta: null,
    });
  }
}
