import { defaultTo, flow, get } from "lodash/fp";
import { ErrorType } from "../types/errorType";

export const errorFormat = (error: ErrorType): string =>
  flow(get("response.data.error.message"), defaultTo(get("message")))(error);
