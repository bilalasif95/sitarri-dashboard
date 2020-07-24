import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";

import backicon from "@assets/images/arrow-left.svg";
import useNavigator from "@saleor/hooks/useNavigator";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";

const useStyles = makeStyles(
  theme => ({
    backBtn: {
      "& hover":{
        background: "transparent",
      },
      "& span": {
        color: "#414141",
        textAlign: 'left',
        textTransform: "capitalize",
      },
      borderRadius: "4px",
      boxShadow: "none !important",
      padding: "0.5rem 0",
      width: "50px",
    },
    bodyHead: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 0 1rem",
    },
    errorText: {
      color: theme.palette.error.contrastText
    },
    panel: {
      background: theme.palette.error.main,
      borderRadius: theme.spacing(),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(1.5)
    },
    submit: {
      width: "100%"
    }
  }),
  {
    name: "ResetPasswordPage"
  }
);

export interface ResetPasswordPageFormData {
  email: string;
}
export interface ResetPasswordPageProps {
  disabled: boolean;
  error: string;
  onSubmit: (data: ResetPasswordPageFormData) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = props => {
  const { disabled, error, onSubmit } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const navigate = useNavigator();

  return (
    <>
    <div className={classes.bodyHead}>
            <p>Reset your Password</p>
            <Button onClick={() => navigate("/")} className={classes.backBtn}>
              <SVG
                src={backicon}
              />
            </Button>
          </div>
    <Form initial={{ email: "" }} onSubmit={onSubmit}>
      {({ change: handleChange, data, submit: handleSubmit }) => (
        <>
          {!!error && (
            <div className={classes.panel}>
              <Typography variant="caption" className={classes.errorText}>
                {error}
              </Typography>
            </div>
          )}
          <Typography>
            <FormattedMessage defaultMessage="Please provide us your email address so we can share you a link to reset your password." />
          </Typography>
          <FormSpacer />
          <TextField
            autoFocus
            disabled={disabled}
            fullWidth
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
          <Button
            className={classes.submit}
            color="primary"
            disabled={disabled}
            variant="contained"
            onClick={handleSubmit}
            type="submit"
          >
            <FormattedMessage
              defaultMessage="Send Instructions"
              description="password reset, button"
            />
          </Button>
        </>
      )}
    </Form>
    </>
  );
};

ResetPasswordPage.displayName = "ResetPasswordPage";
export default ResetPasswordPage;
