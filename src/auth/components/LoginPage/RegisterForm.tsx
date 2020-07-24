import Button from "@material-ui/core/Button";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";

import removeImg from "@assets/images/pass-invisible.svg";
import removeImgg from "@assets/images/pass-visible.svg";
import Form from "@saleor/components/Form";
import { FormSpacer } from "@saleor/components/FormSpacer";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { maybe} from "@saleor/misc";

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end"
    },
    errorMessages: {
      color: 'red',
      fontWeight: 300,
      marginBottom: '1rem',
    },
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textAlign: "center"
    },
    loginButton: {
      width: 140
    },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing(),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(1.5)
    }
  });

export interface LoginCardProps extends WithStyles<typeof styles> {
  error: any;
  passwordMismatchError: string;
  success: string;
  disableLoginButton: boolean;
  menuBack: ()=>void;
  onSubmit?(event: FormData);
}

const LoginCard = withStyles(styles, { name: "LoginCard" })(
  ({
    classes,
    error,
    success,
    passwordMismatchError,
    disableLoginButton,
    // onPasswordRecovery,
    menuBack,
    onSubmit
  }: LoginCardProps) => {
    const intl = useIntl();
    const notify = useNotifier();
    const [passwordType, setPasswordType] = React.useState(true);
    const [confirmPasswordType, setConfirmPasswordType] = React.useState(true);
    const emailError = maybe(()=>error.filter(item => item.field === "email"))
    const passwordError = maybe(()=>error.filter(item => item.field === "password"))
    const onPasswordEyeIconClick = () => {
      if (passwordType) {
        return setPasswordType(false);
      }
      setPasswordType(true);
    };
    const onConfirmPasswordEyeIconClick = () => {
      if (confirmPasswordType) {
        return setConfirmPasswordType(false);
      }
      setConfirmPasswordType(true);
    };
    if(success !== ""){
      notify({text: success})
    }
    return (
      <>
      <p>Sign up</p>
      {passwordMismatchError !== "" && <div className={classes.errorMessages}>{passwordMismatchError}</div>}
      <Form initial={{ confirmPassword: "",email: "", password: "" }} onSubmit={onSubmit}>
        {({ change: handleChange, data, submit: handleSubmit }) => (
          <>
            <TextField
              autoFocus
              fullWidth
              error={maybe(()=>emailError[0].message)}
              helperText={maybe(()=>emailError[0].message)}
              autoComplete="username"
              label={intl.formatMessage(commonMessages.email)}
              name="email"
              onChange={handleChange}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
            <FormSpacer />
            {passwordType ? (
              <div className="passwordInput">
                <TextField
                  fullWidth
                  error={maybe(()=>passwordError[0].message)}
                  helperText={maybe(()=>passwordError[0].message)}
                  autoComplete="password"
                  label={intl.formatMessage({
                    defaultMessage: "Password"
                  })}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={data.password}
                  inputProps={{
                    "data-tc": "password"
                  }}
                />
                <span onClick={onPasswordEyeIconClick}>
                <SVG
                  src={removeImg}
                  className="passwordEye"
                />
                </span>
              </div>
            ) : (
                <div className="passwordInput">
                  <TextField
                  fullWidth
                  error={maybe(()=>passwordError[0].message)}
                  helperText={maybe(()=>passwordError[0].message)}
                  autoComplete="password"
                  label={intl.formatMessage({
                    defaultMessage: "Password"
                  })}
                  name="password"
                  onChange={handleChange}
                  type="text"
                  value={data.password}
                  inputProps={{
                    "data-tc": "password"
                  }}
                />
                <span onClick={onPasswordEyeIconClick}>
                <SVG
                    src={removeImgg}
                    className="passwordEye"
                  />
                  </span>
                </div>
              )}
            <FormSpacer />
            {confirmPasswordType ? (
              <div className="passwordInput">
                <TextField
                  fullWidth
                  autoComplete="confirmPassword"
                  label={intl.formatMessage({
                    defaultMessage: "Confirm Password"
                  })}
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  value={data.confirmPassword}
                  inputProps={{
                    "data-tc": "confirmPassword"
                  }}
                />
                <span onClick={onConfirmPasswordEyeIconClick}>
                 <SVG
                  src={removeImg}
                  className="passwordEye"
                />
                </span>
              </div>
            ) : (
                <div className="passwordInput">
                  <TextField
                    fullWidth
                    autoComplete="confirmPassword"
                    label={intl.formatMessage({
                      defaultMessage: "Confirm Password"
                    })}
                    name="confirmPassword"
                    onChange={handleChange}
                    type="text"
                    value={data.confirmPassword}
                    inputProps={{
                      "data-tc": "confirmPassword"
                    }}
                  />
                <span onClick={onConfirmPasswordEyeIconClick}>
                 <SVG
                  src={removeImg}
                  className="passwordEye"
                />
                </span>
              </div>
            )}
            <FormSpacer />
            <div className={classes.buttonContainer}>
              <Button
                className={classes.loginButton}
                color="primary"
                disabled={disableLoginButton}
                variant="contained"
                onClick={handleSubmit}
                type="submit"
                data-tc="submit"
              >
                <FormattedMessage defaultMessage="Register" description="button" />
              </Button>
            </div>
            <FormSpacer />
            <div className="login__content__password-reminder">
              <p>
                Already have an account?&nbsp;
                <span className="u-link" onClick={()=> menuBack()}>
                  Login
                </span>
              </p>
            </div>
            {/* <Typography className={classes.link} onClick={onPasswordRecovery}>
              <FormattedMessage
                defaultMessage="Reset your password"
                description="button"
              />
            </Typography> */}
          </>
        )}
      </Form>
      </>
    );
  }
);
LoginCard.displayName = "LoginCard";
export default LoginCard;
