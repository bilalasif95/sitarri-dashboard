import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import { RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
// import RichTextEditor from "@saleor/components/RichTextEditor";
import { commonMessages } from "@saleor/intl";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import MuiPhoneNumber from "material-ui-phone-number";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { maybe } from "../../../misc";
import { CategoryDetails_category } from "../../types/CategoryDetails";
import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";

const useStyles = makeStyles(
  theme => ({
    businessmodaltextarea: {
      "& label": {
        overflowX: "visible"
      },
      marginLeft: "47px",
      marginTop: "30px",
      width: "89%"
    },
    cityInput: {
      width: "60%"
    },
    codeInput: {
      width: "35%"
    },
    contactInfo: {
      display: "flex",
      justifyContent: "space-between"
    },
    latlngError: {
      color: "red",
      textAlign: "center"
    },
    phoneInput: {
      "& .MuiFormControl-root": {
        width: "100%"
      },

      "& .MuiInput-root": {
        "&:before": {
          borderBottom: "initial"
        },
        "&:hover": {
          "&:before": {
            borderBottom: "initial"
          }
        },
        border: "1px solid #BDBDBD",
        borderRadius: "4px",
        height: "52px"
      },

      "& .MuiPhoneNumber-flagButton": {
        background: "#efefef",
        borderBottomLeftRadius: "4px",
        borderRadius: "initial",
        borderTopLeftRadius: "4px",
        padding: "25px 15px"
      }
    },
    selectCategory: {
      marginTop: "20px",
      width: "60%"
    },

    toolbar: { marginTop: -theme.spacing(0.5) }
  }),
  { name: "ContactInformationForm" }
);

interface CategoryDetailsFormProps {
  category?: CategoryDetails_category;
  data: {
    name: string;
    // description: RawDraftContentState;
    businessCategory?: string;
    phone?: string;
    country?: any;
    streetAddress?: string;
    streetAddress2?: string;
    city?: string;
    postalCode?: number;
  };
  countries: any;
  latlngError: string;
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

export const ContactInformationForm: React.FC<CategoryDetailsFormProps> = (
  { disabled, category, data, onChange, errors, countries, latlngError },
  // { category, disabled, data, onChange, errors },
  props
) => {
  const intl = useIntl();
  const classes = useStyles(props);
  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [phone, setPhone] = useStateFromProps(maybe(() => category.phone, ""));
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => category && category.address ? category.address.country.country : "United Kingdom", "")
  );
  const formErrors = getFormErrors(["streetAddress", "streetAddress2", "city", "postalCode"], errors);

  const handleOnChange = value => {
    setPhone(value);
    data.phone = value;
  };

  React.useEffect(() => {
    const setCountries = maybe(
      () =>
        countries.map(country => ({
          label: country.label,
          value: country.code
        })),
      []
    )
    setBusinessNamesArray(setCountries);
  }, [countries]);

  const handleCountrySelect = createSingleAutocompleteSelectHandler(
    onChange,
    setCountryDisplayName,
    businessNamesArray
  );

  return (
    <>
      <Card>
        <CardTitle
          title={intl.formatMessage(commonMessages.contactInformation)}
        />
        <CardContent>
          <div>
            <p>Address</p>
            <TextField
              label={intl.formatMessage({
                defaultMessage: "Address line 1"
              })}
              name="streetAddress"
              disabled={disabled}
              value={data.streetAddress}
              onChange={onChange}
              error={!!formErrors.streetAddress}
              helperText={getProductErrorMessage(formErrors.streetAddress, intl)}
              fullWidth
            />

            <FormSpacer />

            <TextField
              label={intl.formatMessage({
                defaultMessage: "Address line 2"
              })}
              name="streetAddress2"
              disabled={disabled}
              value={data.streetAddress2}
              onChange={onChange}
              error={!!formErrors.streetAddress2}
              helperText={getProductErrorMessage(formErrors.streetAddress2, intl)}
              fullWidth
            />

            <FormSpacer />

            <div className={classes.contactInfo}>
              <div className={classes.cityInput}>
                <TextField
                  label={intl.formatMessage({
                    defaultMessage: "City"
                  })}
                  name="city"
                  disabled={disabled}
                  value={data.city}
                  onChange={onChange}
                  error={!!formErrors.city}
                  helperText={getProductErrorMessage(formErrors.city, intl)}
                  fullWidth
                />
              </div>

              <div className={classes.codeInput}>
                <TextField
                  label={intl.formatMessage({
                    defaultMessage: "Post Code"
                  })}
                  name="postalCode"
                  disabled={disabled}
                  value={data.postalCode}
                  onChange={onChange}
                  error={!!formErrors.postalCode}
                  helperText={getProductErrorMessage(formErrors.postalCode, intl)}
                  fullWidth
                />
              </div>
            </div>
          </div>
          <FormSpacer />
          <div className={classes.selectCategory}>
            <SingleAutocompleteSelectField
              disabled={disabled}
              displayValue={countryDisplayName}
              label={intl.formatMessage({
                defaultMessage: "Country"
              })}
              name="country"
              onChange={handleCountrySelect}
              value={data.country}
              choices={businessNamesArray}
              InputProps={{
                inputProps: {
                  autocomplete: "plsdontautocomplete" // Somehow it shuts it down
                }
              }}
            />
          </div>
          <FormSpacer />
          {latlngError && (
            <div
              className={classes.businessmodaltextarea}
            >
              <p className={classes.latlngError}>
                Invalid Address.
              </p>
            </div>
          )}
          <div className={classes.phoneInput}>
            <p>Phone</p>
            <MuiPhoneNumber value={phone} defaultCountry={"gb"} onChange={handleOnChange} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default ContactInformationForm;
