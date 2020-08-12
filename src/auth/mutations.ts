import gql from "graphql-tag";

import { accountErrorFragment } from "@saleor/customers/mutations";
import { TypedMutation } from "../mutations";
import { AccountConfirm,AccountConfirmVariables } from "./types/AccountConfirm";
import {
  RequestPasswordReset,
  RequestPasswordResetVariables
} from "./types/RequestPasswordReset";
import { SetPassword, SetPasswordVariables } from "./types/SetPassword";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import { VerifyToken, VerifyTokenVariables } from "./types/VerifyToken";
import { RefreshToken, RefreshTokenVariables } from "./types/RefreshToken";
import { RegisterAccount,RegisterAccountVariables } from "./types/RegisterAccount";
import { SignInWithSocialMedia,SignInWithSocialMediaVariables } from "./types/SignInWithSocialMedia";

export const fragmentUser = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    isSuperuser
    businessUser(first: 100) {
      edges {
        node {
          id
          name
          businessStore(first: 100) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
    userPermissions {
      code
      name
    }
    avatar {
      url
    }
  }
`;

export const tokenAuthMutation = gql`
  ${fragmentUser}
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      errors {
        field
        message
      }
      accountErrors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const TypedTokenAuthMutation = TypedMutation<
  TokenAuth,
  TokenAuthVariables
>(tokenAuthMutation);

export const tokenVerifyMutation = gql`
  ${fragmentUser}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;

export const TypedVerifyTokenMutation = TypedMutation<
  VerifyToken,
  VerifyTokenVariables
>(tokenVerifyMutation);

export const requestPasswordReset = gql`
  ${accountErrorFragment}
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const RequestPasswordResetMutation = TypedMutation<
  RequestPasswordReset,
  RequestPasswordResetVariables
>(requestPasswordReset);

export const setPassword = gql`
  ${accountErrorFragment}
  ${fragmentUser}
  mutation SetPassword($email: String!, $password: String!, $token: String!) {
    setPassword(email: $email, password: $password, token: $token) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      token
      user {
        ...User
      }
    }
  }
`;
export const SetPasswordMutation = TypedMutation<
  SetPassword,
  SetPasswordVariables
>(setPassword);

const refreshToken = gql`
  mutation RefreshToken($token: String!) {
    tokenRefresh(token: $token) {
      token
      payload
    }
  }
`;
export const TokenRefreshMutation = TypedMutation<
  RefreshToken,
  RefreshTokenVariables
>(refreshToken);

const accountRegisterMutation = gql`
  mutation RegisterAccount(
    $email: String!
    $password: String!
    $redirectUrl: String!
  ) {
    accountRegister(
      input: { email: $email, password: $password, redirectUrl: $redirectUrl }
    ) {
      errors {
        field
        message
      }
      requiresConfirmation
    }
  }
`;

export const TypedAccountRegisterMutation = TypedMutation<
  RegisterAccount,
  RegisterAccountVariables
>(accountRegisterMutation);

const socialAuth = gql`
  ${fragmentUser}
  mutation SocialAuth($accessToken: String!,$provider: String!, $email: String,$uid:String) {
    socialAuth(accessToken: $accessToken, provider: $provider, email: $email,uid:$uid){
      token
      social{
        user{
          ...User
        }
      }
      error{
        field
        message
      }
    }
  }
`;

export const TypedSocialAuthMutation = TypedMutation<
  SignInWithSocialMedia,
  SignInWithSocialMediaVariables
>(socialAuth);

const accountConfirmMutation = gql`
  mutation AccountConfirm($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedAccountConfirmMutation = TypedMutation<
  AccountConfirm,
  AccountConfirmVariables
>(accountConfirmMutation);