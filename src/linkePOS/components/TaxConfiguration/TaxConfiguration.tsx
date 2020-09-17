// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// import { FormattedMessage, useIntl } from "react-intl";
import { useIntl } from "react-intl";
import SVG from "react-inlinesvg";

import saleimg1 from "@assets/images/saleimg1.svg";
import saleimg2 from "@assets/images/saleimg2.svg";
import saleimg3 from "@assets/images/saleimg3.svg";
import saleimg4 from "@assets/images/saleimg4.svg";
import CardTitle from "@saleor/components/CardTitle";
// import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import FormSpacer from "@saleor/components/FormSpacer";
// import Hr from "@saleor/components/Hr";
// import { sectionNames } from "@saleor/intl";
import { FormData } from "../CountryListPage";

interface TaxConfigurationProps {
  data: FormData;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  onTaxFetch: () => void;
}

const useStyles = makeStyles(
  {
    content: {
      paddingBottom: 0
    },
    selectpoint: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
      width: '65%'
    },
    selectpointcontent: {
      backgroundColor: "#fff",
      border: '1px solid #b1b1b1',
      borderRadius: "4px",
      padding: "10px 15px",
      width: "49%"
    },
    selectpointheading: {
      marginBottom: "30px",
      marginTop: "30px"
    },
    selectpointinput: {
      "& label": {
        overflowX: "visible"
      }
    },
    selectpointinputgroup: {
      marginTop: "20px"
    },
    selectpointlist: {
      "& h4": {
        margin: "0px !important"
      },
      "& li": {
        fontSize: "11px",
        paddingRight: "80px",
        position: "relative"
      },
      "& svg": {
        position: "absolute",
        right: "2px",
        top: "-19px",
        width: "65px"
      },
      cursor: "pointer",
      listStyleType: "none",
      marginTop: "0px",
      paddingLeft: "0px"
    },
    thanksmodaltext: {
      "& p": {
        marginTop: "20px",
        // textAlign: "center"
      }
    },
  },
  { name: "TaxConfiguration" }
);

export const TaxConfiguration: React.FC<TaxConfigurationProps> = props => {
  // const { data, disabled, onChange, onTaxFetch } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <Card>
      <CardTitle title={intl.formatMessage({
        defaultMessage: "Import Business Information"
      })} />
      <CardContent className={classes.content}>
        <div className={classes.thanksmodaltext}>
          <p>
            Integrate your point of sale system with Sittari
          to save time <br /> and keep your business
          information updated automatically
        </p>
        </div>
        {/* <ControlledCheckbox
          name={"includeTax" as keyof FormData}
          label={intl.formatMessage({
            defaultMessage: "All products prices are entered with tax included"
          })}
          checked={data.includeTax}
          onChange={onChange}
          disabled={disabled}
        /> */}
        <FormSpacer />
        <h3 className={classes.selectpointheading}>
          Select Your Point of Sale Provider
        </h3>
        {/* <ControlledCheckbox
          name={"showGross" as keyof FormData}
          label={intl.formatMessage({
            defaultMessage: "Show gross prices to customers in the storefront"
          })}
          checked={data.showGross}
          onChange={onChange}
          disabled={disabled}
        /> */}
        <FormSpacer />

        {/* <ControlledCheckbox
          name={"chargeTaxesOnShipping" as keyof FormData}
          label={intl.formatMessage({
            defaultMessage: "Charge taxes on shipping rates"
          })}
          checked={data.chargeTaxesOnShipping}
          onChange={onChange}
          disabled={disabled}
        /> */}
        <FormSpacer />
        <div className={classes.selectpoint}>
          <div className={classes.selectpointcontent}>
            <ul
              className={classes.selectpointlist}
            // onClick={onIzettleClicked}
            >
              <h4>Izettle</h4>
              <li>
                Leading payment and POS
                                <br /> provider for small business
                                <SVG src={saleimg1} />
              </li>
            </ul>
            {/* {izettle && (
              <div className={classes.selectpointinput}>
                <div>
                  <TextField
                    fullWidth
                    autoComplete="izettleAccessToken"
                    label="Access Token"
                    error={maybe(
                      () => izettleAccessTokenError[0].message
                    )}
                    helperText={maybe(
                      () => izettleAccessTokenError[0].message
                    )}
                    name="izettleAccessToken"
                    onChange={change}
                    value={data.izettleAccessToken}
                    inputProps={{
                      "data-tc": "izettleAccessToken"
                    }}
                  />
                </div>
              </div>
            )} */}
          </div>
          <div className={classes.selectpointcontent}>
            <ul
              className={classes.selectpointlist}
            // onClick={onSquareClicked}
            >
              <h4>Square</h4>
              <li>
                Leading payment and POS
                                <br /> provider for small business
                                <SVG src={saleimg2} />
              </li>
            </ul>
            {/* {square && (
              <div className={classes.selectpointinput}>
                <div>
                  <TextField
                    fullWidth
                    autoComplete="squareAccessToken"
                    label="Access Token"
                    error={maybe(
                      () => squareAccessTokenError[0].message
                    )}
                    helperText={maybe(
                      () => squareAccessTokenError[0].message
                    )}
                    name="squareAccessToken"
                    onChange={change}
                    value={data.squareAccessToken}
                    inputProps={{
                      "data-tc": "squareAccessToken"
                    }}
                  />
                </div>
              </div>
            )} */}
          </div>
        </div>

        <div className={classes.selectpoint}>
          <div className={classes.selectpointcontent}>
            <ul
              className={classes.selectpointlist}
            // onClick={onShopifyClicked}
            >
              <h4>Shopify</h4>
              <li>
                Global e-commerce and POS company focused on
                retail
                                <SVG src={saleimg3} />
              </li>
            </ul>
            {/* {shopify && (
              <div className={classes.selectpointinput}>
                <div>
                  <TextField
                    fullWidth
                    autoComplete="shopifyAccessToken"
                    label="Access Token"
                    error={maybe(
                      () => shopifyAccessTokenError[0].message
                    )}
                    helperText={maybe(
                      () => shopifyAccessTokenError[0].message
                    )}
                    name="shopifyAccessToken"
                    onChange={change}
                    value={data.shopifyAccessToken}
                    inputProps={{
                      "data-tc": "shopifyAccessToken"
                    }}
                  />
                  <FormSpacer />
                  <TextField
                    fullWidth
                    autoComplete="shopifyURL"
                    label="URL"
                    error={maybe(
                      () => shopifyURLError[0].message
                    )}
                    helperText={maybe(
                      () => shopifyURLError[0].message
                    )}
                    name="shopifyURL"
                    onChange={change}
                    value={data.shopifyURL}
                    inputProps={{
                      "data-tc": "shopifyURL"
                    }}
                  />
                </div>
              </div>
            )} */}
          </div>
          <div className={classes.selectpointcontent}>
            <ul
              className={classes.selectpointlist}
            // onClick={onVendClicked}
            >
              <h4>Vend</h4>
              <li>
                Cloud based e-commerce and ePOS provider
                                <SVG src={saleimg4} />
              </li>
            </ul>
            {/* {vend && (
              <div className={classes.selectpointinput}>
                <div>
                  <TextField
                    fullWidth
                    autoComplete="vendAccessToken"
                    label="Access Token"
                    error={maybe(
                      () => vendAccessTokenError[0].message
                    )}
                    helperText={maybe(
                      () => vendAccessTokenError[0].message
                    )}
                    name="vendAccessToken"
                    onChange={change}
                    value={data.vendAccessToken}
                    inputProps={{
                      "data-tc": "vendAccessToken"
                    }}
                  />
                  <FormSpacer />
                  <TextField
                    fullWidth
                    autoComplete="vendURL"
                    label="URL"
                    error={maybe(() => vendURLError[0].message)}
                    helperText={maybe(
                      () => vendURLError[0].message
                    )}
                    name="vendURL"
                    onChange={change}
                    value={data.vendURL}
                    inputProps={{
                      "data-tc": "vendURL"
                    }}
                  />
                </div>
              </div>
            )} */}
          </div>
        </div>
        {/* <FormSpacer /> */}
        <div className={classes.thanksmodaltext}>
          <p>
            We apologies if your POS provider is not on the list, we are
          <br /> constantly working to add more POS providers.
        </p>
        </div>
      </CardContent>
      {/* <Hr />
      <CardActions>
        <Button disabled={disabled} onClick={onTaxFetch} color="primary">
          <FormattedMessage defaultMessage="Fetch taxes" description="button" />
        </Button>
      </CardActions> */}
    </Card>
  );
};
export default TaxConfiguration;
