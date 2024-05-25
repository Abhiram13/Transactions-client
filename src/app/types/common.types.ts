import {StatusCode} from "./export.types";

export interface IApiResonse<T extends object = {}> {
   status_code: StatusCode;
   message?: string;
   result?: T;
}