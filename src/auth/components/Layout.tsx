import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SVG from "react-inlinesvg";

// import backgroundArt from "@assets/images/login-background.svg";
// import saleorDarkLogo from "@assets/images/logo-dark.svg";
// import saleorLightLogo from "@assets/images/logo-light.svg";
import sitarriLogo from "@assets/images/Sitarri.svg";
import sitarriWhiteLogo from "@assets/images/SitarriWhiteLogo.svg";
import useTheme from "@saleor/hooks/useTheme";

const useStyles = makeStyles(
  theme => ({
    DialogContent: {
      "@media (min-width: 1440px)": {
        padding: "0px !important"
      }
    },
    logo: {
      "& svg": {
        display: "block",
        height: 40,
        marginBottom: theme.spacing(4),
        width: "170px"
      }
    },
    mainPanel: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2)
      },
      background: theme.palette.background.paper,
      // display: "flex",
      // flexDirection: "column",
      // height: "100vh",
      justifyContent: "center",
      padding: theme.spacing(6),
      width: "100%"
    },
    mainPanelContent: {
      [theme.breakpoints.up("xs")]: {
        width: "100%"
      },
      [theme.breakpoints.up("sm")]: {
        width: 328
      },
      "@media (min-width: 1600px)": {
        width: 464
      },
      margin: "auto",
      width: "100%"
    },

    root: {
      // [theme.breakpoints.up("lg")]: {
      //   gridTemplateColumns: "376px 1fr"
      // },
      // "@media (min-width: 1440px)": {
      //   gridTemplateColumns: "520px 1fr"
      // },
      display: "grid",
      gridTemplateColumns: "1fr",
      height: "100vh",
      overflow: "hidden",
      width: "100vw"
    },
    sidebar: {
      [theme.breakpoints.up("lg")]: {
        display: "block"
      },
      display: "none"
    },
    sidebarArt: {
      "& svg": {
        width: "100%"
      }
    }
  }),
  {
    name: "Layout"
  }
);

const Layout: React.FC = props => {
  const { children } = props;

  const classes = useStyles(props);
  const { isDark } = useTheme();

  return (
    <div className={classes.root}>
      {/* <div className={classes.sidebar}>
        <SVG className={classes.sidebarArt} src={backgroundArt} />
      </div> */}
      <div className={classes.mainPanel}>
        <div className={classes.mainPanelContent}>
          <SVG
            className={classes.logo}
            src={isDark ? sitarriWhiteLogo : sitarriLogo}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
export default Layout;
