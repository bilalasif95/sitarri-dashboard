import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";

import backicon from "@assets/images/arrow-left.svg";
import emailImg from "@assets/images/email.svg";
import removeImg from "@assets/images/pass-invisible.svg";
import removeImgg from "@assets/images/pass-visible.svg";
import Form from "@saleor/components/Form";
import { FormSpacer } from "@saleor/components/FormSpacer";
import useUser from "@saleor/hooks/useUser";
import { commonMessages } from "@saleor/intl";
import { maybe} from "@saleor/misc";

import { accountConfirmPath } from "../../urls";

import RegisterForm from "./RegisterForm";

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

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
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "2rem",
      marginTop: "2rem",
      padding: 0,
      textAlign: "center",
    },
    ce:{
      color: '#fff',
      fontWeight: 400,
      margin: '3px 0px 0px',
      textAlign: 'center',
    },
    emailButton:{
      "& span":{
      "& svg": {
        "& path":{
          fill: 'white',
        },
        margin: '0 2rem 0 0',
      },
      alignItems: 'center',
      display: "flex",
      fontSize: '400 14.3333px Arial',
      left: '0.3rem',
      position: 'absolute',
      textTransform: 'capitalize',
      top: '3px',
      transform: 'none',
      width: '100%',
      },
      alignItems: 'center',
      backgroundColor: '#f3492b !important',
      borderRadius: '4px',
      display: 'flex',
      height: '40px',
      justifyContent: 'center',
      margin: '1rem 0',
      padding: '1.1666rem !important',
      position: 'relative',
      textTransform: 'capitalize',
      width: '100%',
    },
    facebookLoginButton: {
      "& button": {
        "& i":{
          fontSize: "20px",
          left: "1.5rem",
          margin: "0 2rem 0 0",
          position: "absolute",
        },
        alignItems: "center",
        border: "none !important",
        borderRadius: "4px !important",
        display: "flex",
        font: "400 13.3333px Arial",
        height: "40px",
        justifyContent: "center",
        margin: "0 0 2rem",
        padding: "0.7rem 0.5rem !important",
        position: "relative",
        textTransform: "capitalize",
        width: "100%",
      }
    },
    forgotBtn: {
      "& hover":{
        background: "transparent",
      },
      "& span":{
        color: "#414141",
        fontWeight: 400,
        textTransform: "capitalize"
      },
      background: "#fff",
      border: "1px solid #cccccc78",
      borderRadius: "4px",
      boxShadow: "none !important",
      width: "100%",
    },
    googleLoginButton: {
      "& div": {
        borderRadius: "unset !important",
        left: "1.3rem",
        marginRight: "2rem !important",
        padding: "0 !important",
        position: "absolute",
        top: "10px",
      },
      "& fa":{
        fontSize: "20px",
        margin: "0 2rem 0 0",
      },
      "& span": {
        fontWeight: 400,
        padding: "0 !important",
      },
      alignItems: "center",
      border: "1px solid #cccccc78 !important",
      borderRadius: "4px !important",
      boxShadow: "none !important",
      color: "#000",
      display: "flex",
      font: "400 13.3333px Arial",
      fontWeight: 400,
      height: "40px",
      justifyContent: "center",
      padding: "0.55rem 0.5rem !important",
      position: "relative",
      textTransform: "capitalize",
      width: "100%",
    },
    line: {
      "& span":{
        background: '#fafafa',
        height: '20px',
        left: '47%',
        padding: '0 5px',
        position: 'absolute',
        right: '0',
        textAlign: 'center',
        textTransform: 'lowercase',
        top: '-11px',
        width: '32px',
        },
      background: '#80808059',
      height: '1px',
      margin: '0.5rem 0 1.5rem',
      position: 'relative',
      width: '100%',
    },
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textAlign: "center"
    },
    loginButton: {
      "& hover":{
        background: "#f74b2c",
      },
      "& span": {
        color: "#fff",
        fontWeight: 400,
        textTransform: "capitalize",
      },
      background:"#f74b2c",
      borderRadius: "4px",
      boxShadow: "none !important",
      color: "#fff",
      textTransform: "capitalize",
      width: "100%",
    },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing(),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(1.5)
    },
    passwordEye: {
      borderLeft: '1px solid #cccccc78',
      cursor: 'pointer',
      height: '49px',
      padding: '0.7rem 0.3rem',
      position: 'absolute',
      right: ' 0',
      width: '40px',
    },
    passwordInput: {
        display: 'flex',
        position: 'relative',
    },
    tc:{
      color: '#6e6f6f',
      fontSize: '12px',
    },
    ulink: {
      cursor: "pointer",
      textDecoration: "underline",
    }
  }),
  { name: "LoginCard" }
);

export interface LoginCardProps {
  error: boolean;
  disableLoginButton: boolean;
  onPasswordRecovery: () => void;
  onSubmit?(event: FormData);
}

const LoginCard: React.FC<LoginCardProps> = props => {
  const { error, disableLoginButton, onPasswordRecovery, onSubmit } = props;
  const [emailClick, setEmailClick] = React.useState(false);
  const [registerClick, setRegisterClick] = React.useState(false);
  const [passwordType, setPasswordType] = React.useState(true);
  // const [errors, setErrors] = React.useState("");
  const classes = useStyles(props);
  const intl = useIntl();
  const menuBack = () => {
    setEmailClick(true)
  };
  const { signup,socialAuth, errors,success,signUpTokenAuthLoading } = useUser();
  const responseFacebook = async response => {
    if (response.accessToken) {
      socialAuth(response.accessToken, "facebook","",response.id);
      // const authenticated = await socialAuth({ accessToken: response.accessToken, provider: "facebook", email: "", uid: response.id });
      // if (authenticated && authenticated.data.socialAuth.error === null) {
      //   setAuthToken(authenticated.data.socialAuth.token);
      // }
      // else {
      //   setErrors(authenticated.data.socialAuth.error.message)
      // }
    }
  };

  const responseGoogle = async response => {
    if (response.accessToken) {
      socialAuth(response.accessToken, "google-oauth2",response.profileObj.email,"");
    //   const authenticated = await socialAuth({ accessToken: response.accessToken, provider: "google-oauth2", email: response.profileObj.email, uid: "" });
    //   if (authenticated && authenticated.data.socialAuth.error === null) {
    //     setAuthToken(authenticated.data.socialAuth.token);
    //   }
    //   else {
    //     setErrors(authenticated.data.socialAuth.error.message)
    //   }
    }
  };
  
  const handleSubmit = (data: FormData) => {
      const redirectUrl = `${window.location.origin}${accountConfirmPath}`;
      signup(data.email, data.password,redirectUrl,menuBack);
  };
  const onPasswordEyeIconClick = () => {
    if (passwordType) {
      return setPasswordType(false);
    }
    setPasswordType(true);
  };
  const emailError = maybe(()=>errors.filter(item => item.field === "email"))
  return (
    <div>
    {emailClick ?
    <>
      <div className={classes.bodyHead}>
            <p>Log in</p>
            <Button onClick={() => { setEmailClick(false); setRegisterClick(false) }} className={classes.backBtn}>
              <SVG src={backicon}
              />
            </Button>
          </div>
      <Form initial={{ confirmPassword:"",email: "", password: "" }} onSubmit={onSubmit}>
        {({ change: handleChange, data, submit: handleSubmit }) => (
          <>
            {error && (
              <div className={classes.panel}>
                <Typography variant="caption">
                  <FormattedMessage defaultMessage="Sorry, your username and/or password are incorrect. Please try again." />
                </Typography>
              </div>
            )}
            <TextField
              autoFocus
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
            {passwordType ? (
              <div className={classes.passwordInput}>
                <TextField
                  fullWidth
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
                <SVG src={removeImg}
                  className={classes.passwordEye}
                />
                </span>
              </div>
            ) : (
                <div className={classes.passwordInput}>
                  <TextField
                    fullWidth
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
                <SVG src={removeImgg}
                    className={classes.passwordEye}
                  />
                  </span>
                </div>
              )}
            <FormSpacer />
            <div className={classes.buttonContainer}>
              <Button
                className={classes.loginButton}
                color="primary"
                disabled={disableLoginButton || data.email === "" || data.password === ""}
                variant="contained"
                onClick={handleSubmit}
                type="submit"
                data-tc="submit"
              >
                <FormattedMessage defaultMessage="Login" description="button" />
              </Button>
            </div>
            <Button onClick={onPasswordRecovery} className={classes.forgotBtn}>Forgot Password?</Button>
            {/* <FormSpacer /> */}
            {/* <Typography className={classes.link} onClick={onPasswordRecovery}>
              <FormattedMessage
                defaultMessage="Reset your password"
                description="button"
              />
            </Typography> */}
          </>
        )}
      </Form>
      <div>
        <p>Don't have an account?&nbsp;
          <span className={classes.ulink} onClick={() => { setRegisterClick(true); setEmailClick(false) }}>
            Sign up
          </span>
        </p>
      </div>
      </>
    : 
    <>
          {registerClick ?
            <RegisterForm error={errors}
            disableLoginButton={signUpTokenAuthLoading}
            onSubmit={handleSubmit} menuBack={menuBack} success={success} />
            :
            <>
              <div className={classes.bodyHead}>
                <p>Sign up or Log in</p>
              </div>
              {emailError && emailError.length !== 0 && (
                <div className={classes.panel}>
                  <Typography variant="caption">
                    {maybe(()=>emailError[0].message)}
                  </Typography>
                </div>
              )}
              {/* <div className="errorMessages">{errors}</div> */}
              <div className={classes.facebookLoginButton}>
              <FacebookLogin
                appId="1078436535883692"
                // appId="734952100605240"
                // autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Continue with Facebook"              
                // buttonText="Login"
                icon="fab fa-facebook-square"
              />
              </div>
              <GoogleLogin
                clientId="325319904531-ce20k86al4d3rtqhjd6heg9s551ksirg.apps.googleusercontent.com"
                // clientId="614159071131-65vivmhjqvlaig531abhllvk88uq5gqt.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                className={classes.googleLoginButton}
                cookiePolicy={"single_host_origin"}
              />
              <br /><br />
              <div className={classes.line}><span>OR</span></div>
              <Button className={classes.emailButton} onClick={() => setEmailClick(true)}>
                <span><SVG src={emailImg} /></span>
                <p className={classes.ce}>Continue with Email</p></Button>
              <p className={classes.tc}>By continuing you agree to our <Link to="" className="statementSection">T&Cs</Link> and<Link to="" className="statementSection"> Privacy Policy</Link>.</p>
            </>
          }
    </>
    }
    </div>
  );
};
LoginCard.displayName = "LoginCard";
export default LoginCard;
