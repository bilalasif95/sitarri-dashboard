import { stringify as stringifyQs } from "qs";

export const passwordResetPath = "/reset-password/";
export const passwordResetUrl = passwordResetPath;

export const passwordResetSuccessPath = "/reset-password/success/";
export const passwordResetSuccessUrl = passwordResetSuccessPath;

export const newPasswordPath = "/new-password/";

export const accountConfirmPath = "/account-confirm/";

export const claimBusinessConfirmPath = "/claimBusiness-confirm/";

export const employeeAccessConfirmPath = "/employeeAccess-confirm/";

export interface NewPasswordUrlQueryParams {
  email: string;
  token: string;
}
export const newPasswordUrl = (params?: NewPasswordUrlQueryParams) =>
  newPasswordPath + "?" + stringifyQs(params);

export interface AccountConfirmUrlQueryParams {
  email: string;
  token: string;
}

export interface ClaimBusinessConfirmUrlQueryParams {
  email: string;
  business: string;
}

export const accountConfirmUrl = (params?: AccountConfirmUrlQueryParams) =>
  accountConfirmPath + "?" + stringifyQs(params);

export const claimBusinessConfirmUrl = (params?: ClaimBusinessConfirmUrlQueryParams) =>
  claimBusinessConfirmPath + "?" + stringifyQs(params);

export const employeeAccessConfirmUrl = (params?: ClaimBusinessConfirmUrlQueryParams) =>
  employeeAccessConfirmPath + "?" + stringifyQs(params);