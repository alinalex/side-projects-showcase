import { ZodFormattedError } from "zod";

export type UserInfoState = {
  message: string,
  errors: ZodFormattedError<UserInfo, string>,
  dbError: string
}

export type UserInfo = {
  firstName: string;
  lastName: string;
  imageSrc: string;
  description: string;
  handler: string;
}