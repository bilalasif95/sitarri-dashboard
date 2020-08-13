import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import { User } from "./types/User";
import {
  accountConfirmPath,
  newPasswordPath,
  passwordResetPath,
  passwordResetSuccessPath
} from "./urls";
import AccountConfirm from "./views/AccountConfirm";
import LoginView from "./views/Login";
import NewPassword from "./views/NewPassword";
import ResetPassword from "./views/ResetPassword";
import ResetPasswordSuccess from "./views/ResetPasswordSuccess";
import LoginLoading from "./components/LoginLoading";

interface UserContext {
  errors: any;
  loginErrors: any;
  success: string;
  login: (username: string, password: string) => void;
  socialAuth: (accessToken: string, provider:  string, email: string, uid: string) => void;
  signup: (username: string, password: string,redirectUrl: string,menuBack: any) => void;
  loginByToken: (token: string, user: User) => void;
  logout: () => void;
  signUpTokenAuthLoading: boolean,
  tokenAuthLoading: boolean;
  tokenRefresh: () => Promise<void>;
  tokenVerifyLoading: boolean;
  user?: User;
  verifyTokenAndSetData: (token: string) => void;
}

export const UserContext = React.createContext<UserContext>({
  errors: undefined,
  login: undefined,
  loginByToken: undefined,
  loginErrors: undefined,
  logout: undefined,
  signUpTokenAuthLoading: false,
  signup: undefined,
  socialAuth: undefined,
  success: "",
  tokenAuthLoading: false,
  tokenRefresh: undefined,
  tokenVerifyLoading: false,
  verifyTokenAndSetData: undefined
});

interface AuthRouterProps {
  hasToken: boolean;
}

const AuthRouter: React.FC<AuthRouterProps> = ({ hasToken }) => (
  <Layout>
    <Switch>
      <Route path={passwordResetSuccessPath} component={ResetPasswordSuccess} />
      <Route path={passwordResetPath} component={ResetPassword} />
      {!hasToken ? (
        <Route path={newPasswordPath} component={NewPassword} />
      ) : (
        <LoginLoading />
      )}
      {!hasToken ? (
        <Route path={accountConfirmPath} component={AccountConfirm} />
      ) : (
        <LoginLoading />
      )}
      <Route component={LoginView} />
    </Switch>
  </Layout>
);

AuthRouter.displayName = "AuthRouter";
export default AuthRouter;

export * from "./utils";
