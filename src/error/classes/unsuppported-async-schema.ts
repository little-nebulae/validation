import { BaseError } from "@little-nebulae/error";

import type { UnsupportedAsyncSchemaErrorCode } from "@/error/codes";

import { UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE } from "@/error/codes";

export class UnsupportedAsyncSchemaError extends BaseError<
  UnsupportedAsyncSchemaErrorCode,
  null,
  null
> {
  readonly name = "UnsupportedAsyncSchemaError";
  readonly code = UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE;

  constructor() {
    super({
      message:
        "Schema validation returned a Promise, but this API only supports synchronous schemas. Use a synchronous schema or the async variant.",
      cause: null,
      meta: null,
    });
  }
}
