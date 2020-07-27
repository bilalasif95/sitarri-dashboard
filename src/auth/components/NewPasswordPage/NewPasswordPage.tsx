import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";

import removeImg from "@assets/images/pass-invisible.svg";
import removeImgg from "@assets/images/pass-visible.svg";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { SetPassword_setPassword_errors } from "@saleor/auth/types/SetPassword";
import getAccountErrorMessage from "@saleor/utils/errors/account";

const useStyles = makeStyles(
  theme => ({
    errorText: {
      color: theme.palette.error.contrastText
    },
    panel: {
      background: theme.palette.error.main,
      borderRadius: theme.spacing(),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(1.5)
    },
    passwordEye: {
      borderLeft: "1px solid #cccccc78",
      cursor: "pointer",
      height: "49px",
      padding: "0.7rem 0.3rem",
      position: "absolute",
      right: 0,
      width: "40px",
    },
    passwordInput: {
      "& input": {
        width: "86.5%",
      },
      display: "flex",
      position: "relative",
    },
    submit: {
      width: "100%"
    }
  }),
  {
    name: "NewPasswordPage"
  }
);

export interface NewPasswordPageFormData {
  password: string;
  confirmPassword: string;
}
export interface NewPasswordPageProps {
  disabled: boolean;
  errors: SetPassword_setPassword_errors[];
  onSubmit: (data: NewPasswordPageFormData) => void;
}

const initialForm: NewPasswordPageFormData = {
  confirmPassword: "",
  password: ""
};

const NewPasswordPage: React.FC<NewPasswordPageProps> = props => {
  const { disabled, errors, onSubmit } = props;
  const [passwordType, setPasswordType] = React.useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = React.useState(true);
  const classes = useStyles(props);
  const intl = useIntl();
  const error = getAccountErrorMessage(
    errors.find(err => err.field === "password"),
    intl
  );
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
  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change: handleChange, data, submit: handleSubmit }) => {
        const passwordError =
          data.password !== data.confirmPassword && data.password.length > 0;

        return (
          <>
            {!!error && (
              <div className={classes.panel}>
                <Typography variant="caption" className={classes.errorText}>
                  {error}
                </Typography>
              </div>
            )}
            <Typography>
              <FormattedMessage defaultMessage="Please set up a new password." />
            </Typography>
            <FormSpacer />
            {passwordType ? (
              <div className={classes.passwordInput}>
                <TextField
                  autoFocus
                  fullWidth
                  autoComplete="none"
                  disabled={disabled}
                  label={intl.formatMessage({
                    defaultMessage: "New Password"
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
                  className={classes.passwordEye}
                />
                </span>
              </div>
            ) : (
                <div className={classes.passwordInput}>
                  <TextField
                    autoFocus
                    fullWidth
                    autoComplete="none"
                    disabled={disabled}
                    label={intl.formatMessage({
                      defaultMessage: "New Password"
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
                    className={classes.passwordEye}
                  />
                  </span>
                </div>
              )}
            <FormSpacer />
            {confirmPasswordType ? (
              <div className={classes.passwordInput}>
                <TextField
                  fullWidth
                  error={passwordError}
                  autoComplete="none"
                  disabled={disabled}
                  label={intl.formatMessage({
                    defaultMessage: "Confirm Password"
                  })}
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  value={data.confirmPassword}
                  helperText={
                    passwordError &&
                    intl.formatMessage({
                      defaultMessage: "Passwords do not match"
                    })
                  }
                  inputProps={{
                    "data-tc": "confirm-password"
                  }}
                />
                 <span onClick={onConfirmPasswordEyeIconClick}>
                 <SVG
                  src={removeImg}
                  className={classes.passwordEye}
                />
                </span>
              </div>
            ) : (
                <div className={classes.passwordInput}>
                  <TextField
                    fullWidth
                    error={passwordError}
                    autoComplete="none"
                    disabled={disabled}
                    label={intl.formatMessage({
                      defaultMessage: "Confirm Password"
                    })}
                    name="confirmPassword"
                    onChange={handleChange}
                    type="text"
                    value={data.confirmPassword}
                    helperText={
                      passwordError &&
                      intl.formatMessage({
                        defaultMessage: "Passwords do not match"
                      })
                    }
                    inputProps={{
                      "data-tc": "confirm-password"
                    }}
                  />
                  <span onClick={onConfirmPasswordEyeIconClick}>
                 <SVG
                  src={removeImg}
                  className={classes.passwordEye}
                />
                </span>
              </div>
            )}
            <FormSpacer />
            <Button
              className={classes.submit}
              color="primary"
              disabled={(passwordError && data.password.length > 0) || disabled}
              variant="contained"
              onClick={handleSubmit}
              type="submit"
            >
              <FormattedMessage
                defaultMessage="Set new password"
                description="button"
              />
            </Button>
          </>
        );
      }}
    </Form>
  );
};

NewPasswordPage.displayName = "NewPasswordPage";
export default NewPasswordPage;
