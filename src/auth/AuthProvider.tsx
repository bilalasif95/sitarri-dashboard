import React from "react";

import {
  isSupported as isCredentialsManagementAPISupported,
  login as loginWithCredentialsManagementAPI,
  saveCredentials
} from "@saleor/utils/credentialsManagement";
import { MutationFunction, MutationResult } from "react-apollo";
import { maybe } from "@saleor/misc";
import {
  TypedAccountRegisterMutation,
  TypedTokenAuthMutation,
  TypedVerifyTokenMutation,
  TokenRefreshMutation,
  TypedSocialAuthMutation
} from "./mutations";
import { RegisterAccount, RegisterAccountVariables } from "./types/RegisterAccount";
import { SignInWithSocialMedia, SignInWithSocialMediaVariables } from "./types/SignInWithSocialMedia";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import { User } from "./types/User";
import { VerifyToken, VerifyTokenVariables } from "./types/VerifyToken";
import { getAuthToken, removeAuthToken, setAuthToken } from "./utils";
import { RefreshToken, RefreshTokenVariables } from "./types/RefreshToken";
import { UserContext } from "./";

interface AuthProviderOperationsProps {
  children: (props: {
    hasToken: boolean;
    isAuthenticated: boolean;
    tokenAuthLoading: boolean;
    tokenVerifyLoading: boolean;
    user: User;
  }) => React.ReactNode;
}
const AuthProviderOperations: React.FC<AuthProviderOperationsProps> = ({
  children
}) => (
  <TypedTokenAuthMutation>
    {(...tokenAuth) => (
      <TypedAccountRegisterMutation>
      {(...signUpTokenAuth) => (
        <TypedSocialAuthMutation>
        {(...socialTokenAuth) => (
        <TypedVerifyTokenMutation>
          {(...tokenVerify) => (
            <TokenRefreshMutation>
              {(...tokenRefresh) => (
                <AuthProvider
                  signUpTokenAuth={signUpTokenAuth}
                  socialTokenAuth={socialTokenAuth}
                  tokenAuth={tokenAuth}
                  tokenVerify={tokenVerify}
                  tokenRefresh={tokenRefresh}
                >
                  {children}
                </AuthProvider>
              )}
            </TokenRefreshMutation>
          )}
        </TypedVerifyTokenMutation>
        )}
        </TypedSocialAuthMutation>
      )}
      </TypedAccountRegisterMutation>
    )}
  </TypedTokenAuthMutation>
);

interface AuthProviderProps {
  children: (props: {
    hasToken: boolean;
    isAuthenticated: boolean;
    tokenAuthLoading: boolean;
    tokenVerifyLoading: boolean;
    user: User;
  }) => React.ReactNode;
  signUpTokenAuth: [
    MutationFunction<RegisterAccount, RegisterAccountVariables>,
    MutationResult<RegisterAccount>
  ];
  socialTokenAuth: [
    MutationFunction<SignInWithSocialMedia, SignInWithSocialMediaVariables>,
    MutationResult<SignInWithSocialMedia>
  ];
  tokenAuth: [
    MutationFunction<TokenAuth, TokenAuthVariables>,
    MutationResult<TokenAuth>
  ];
  tokenVerify: [
    MutationFunction<VerifyToken, VerifyTokenVariables>,
    MutationResult<VerifyToken>
  ];
  tokenRefresh: [
    MutationFunction<RefreshToken, RefreshTokenVariables>,
    MutationResult<RefreshToken>
  ];
}

interface AuthProviderState {
  errors: any;
  user: User;
  persistToken: boolean;
  success: string;
}

class AuthProvider extends React.Component<
  AuthProviderProps,
  AuthProviderState
> {
  constructor(props) {
    super(props);
    this.state = { errors: undefined,persistToken: false,success: "", user: undefined };
  }

  componentWillReceiveProps(props: AuthProviderProps) {
    const { socialTokenAuth,tokenAuth, tokenVerify } = props;
    const tokenAuthOpts = tokenAuth[1];
    const socialTokenAuthOpts = socialTokenAuth[1];
    const tokenVerifyOpts = tokenVerify[1];

    if (tokenAuthOpts.error || tokenVerifyOpts.error || socialTokenAuthOpts.error) {
      this.logout();
    }
    if (tokenAuthOpts.data) {
      const user = tokenAuthOpts.data.tokenCreate.user;
      // FIXME: Now we set state also when auth fails and returned user is
      // `null`, because the LoginView uses this `null` to display error.
      this.setState({ user });
      if (user) {
        setAuthToken(
          tokenAuthOpts.data.tokenCreate.token,
          this.state.persistToken
        );
      }
    } else {
      if (maybe(() => tokenVerifyOpts.data.tokenVerify === null)) {
        this.logout();
      } else {
        const user = maybe(() => tokenVerifyOpts.data.tokenVerify.user);
        if (!!user) {
          this.setState({ user });
        }
      }
    }

    if (socialTokenAuthOpts.data) {
      if(socialTokenAuthOpts.data.socialAuth.social === null){
        this.logout();
      }
      else{
        const user = socialTokenAuthOpts.data.socialAuth.social.user;
        // FIXME: Now we set state also when auth fails and returned user is
        // `null`, because the LoginView uses this `null` to display error.
        this.setState({ user });
        if (user) {
          setAuthToken(
            socialTokenAuthOpts.data.socialAuth.token,
            this.state.persistToken
          );
        }
      }
    } else {
      if (maybe(() => tokenVerifyOpts.data.tokenVerify === null)) {
        this.logout();
      } else {
        const user = maybe(() => tokenVerifyOpts.data.tokenVerify.user);
        if (!!user) {
          this.setState({ user });
        }
      }
    }
  }

  componentDidMount() {
    const { user } = this.state;
    const token = getAuthToken();
    if (!!token && !user) {
      this.verifyToken(token);
    } else {
      loginWithCredentialsManagementAPI(this.login);
    }
  }

  login = async (email: string, password: string) => {
    const { tokenAuth } = this.props;
    const [tokenAuthFn] = tokenAuth;

    tokenAuthFn({ variables: { email, password } }).then(result => {
      if (result && !result.data.tokenCreate.errors.length) {
        saveCredentials(result.data.tokenCreate.user, password);
      }
    });
  };

  signup = async (email: string, password: string,redirectUrl: string) => {
    const { signUpTokenAuth } = this.props;
    const [tokenAuthFn] = signUpTokenAuth;
    this.setState({
      errors: [],
      success: "",
    })
    tokenAuthFn({ variables: { email, password,redirectUrl } }).then(result => {
      if (result && !result.data.accountRegister.errors.length) {
        this.setState({success: result.data.accountRegister.requiresConfirmation
          ? "Please check your e-mail for further instructions"
          : "New user has been created"})
        setTimeout(()=> {
          this.setState({success: ""})
          window.location.replace("/");
        },3000)
      }
      else {
        this.setState({errors: result.data.accountRegister.errors})
      }
    });
  };

  socialAuth = async (accessToken: string, provider: string,email: string,uid: string) => {
    const { socialTokenAuth } = this.props;
    const [tokenAuthFn] = socialTokenAuth;
    this.setState({
      errors: [],
    })
    tokenAuthFn({ variables: { accessToken,email, provider,uid } }).then(result => {
      if (result && result.data.socialAuth.error === null) {
        saveCredentials(result.data.socialAuth.social.user, email);
      }
      else {
        this.setState({errors: [result.data.socialAuth.error]})
      }
    });
  };

  loginByToken = (token: string, user: User) => {
    this.setState({ user });
    setAuthToken(token, this.state.persistToken);
  };

  logout = () => {
    this.setState({ user: undefined });
    if (isCredentialsManagementAPISupported) {
      navigator.credentials.preventSilentAccess();
    }
    removeAuthToken();
  };

  verifyToken = (token: string) => {
    const { tokenVerify } = this.props;
    const [tokenVerifyFn] = tokenVerify;

    return tokenVerifyFn({ variables: { token } });
  };

  refreshToken = async () => {
    const { tokenRefresh } = this.props;
    const [tokenRefreshFn] = tokenRefresh;
    const token = getAuthToken();

    const refreshData = await tokenRefreshFn({ variables: { token } });

    setAuthToken(refreshData.data.tokenRefresh.token, this.state.persistToken);
  };

  render() {
    const { children, tokenAuth, tokenVerify } = this.props;
    const tokenAuthOpts = tokenAuth[1];
    const tokenVerifyOpts = tokenVerify[1];
    const { errors,success,user } = this.state;
    const isAuthenticated = !!user;

    return (
      <UserContext.Provider
        value={{
          errors,
          login: this.login,
          loginByToken: this.loginByToken,
          logout: this.logout,
          signup: this.signup,
          socialAuth: this.socialAuth,
          success,
          tokenAuthLoading: tokenAuthOpts.loading,
          tokenRefresh: this.refreshToken,
          tokenVerifyLoading: tokenVerifyOpts.loading,
          user
        }}
      >
        {children({
          hasToken: !!getAuthToken(),
          isAuthenticated,
          tokenAuthLoading: tokenAuthOpts.loading,
          tokenVerifyLoading: tokenVerifyOpts.loading,
          user
        })}
      </UserContext.Provider>
    );
  }
}

export default AuthProviderOperations;
