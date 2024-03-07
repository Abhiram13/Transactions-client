import { StatusCode } from "./enums.types";

export namespace LoginType {
   export interface IPayload {
      user_name: string;
      password: string;
   }

   export type IResponse = ISuccessResponse | IBadRequestResponse | IErrorResponse;

   interface ISuccessResponse {
      status: StatusCode.OK;
      error: boolean;
      result: {
         name: string;
         token: string;
      }
   }

   interface IBadRequestResponse {
      status: StatusCode.BAD_REQUEST;      
      message: string;
   }

   interface IErrorResponse {
      status: StatusCode.SERVER_ERROR;
      message: string;
      error: boolean;
   }
}