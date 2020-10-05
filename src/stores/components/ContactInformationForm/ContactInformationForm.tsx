import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { RawDraftContentState } from "draft-js";
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
    description: RawDraftContentState;
    businessCategory?: string;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

export const ContactInformationForm: React.FC<CategoryDetailsFormProps> = (
  { disabled, data, onChange, errors },
  // { category, disabled, data, onChange, errors },
  props
) => {
  const intl = useIntl();
  const classes = useStyles(props);

  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [phone, setPhone] = React.useState([]);
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => "", "")
  );
  const formErrors = getFormErrors(["name", "descriptionJson"], errors);
  const handleCountrySelect = createSingleAutocompleteSelectHandler(
    onChange,
    setCountryDisplayName,
    businessNamesArray
  );

  const handleOnChange = value => {
    setPhone(value);
  };

  React.useEffect(() => {
    setBusinessNamesArray([
      {
        label: "Online",
        value: "online"
      },
      {
        label: "Offline",
        value: "offline"
      },
      {
        label: "Both",
        value: "both"
      }
    ]);
  }, []);
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
              name="name"
              disabled={disabled}
              value={data && data.name}
              onChange={onChange}
              error={!!formErrors.name}
              helperText={getProductErrorMessage(formErrors.name, intl)}
              fullWidth
            />

            <FormSpacer />

            <TextField
              label={intl.formatMessage({
                defaultMessage: "Address line 2"
              })}
              name="name"
              disabled={disabled}
              value={data && data.name}
              onChange={onChange}
              error={!!formErrors.name}
              helperText={getProductErrorMessage(formErrors.name, intl)}
              fullWidth
            />

            <FormSpacer />

            <div className={classes.contactInfo}>
              <div className={classes.cityInput}>
                <TextField
                  label={intl.formatMessage({
                    defaultMessage: "City"
                  })}
                  name="name"
                  disabled={disabled}
                  value={data && data.name}
                  onChange={onChange}
                  error={!!formErrors.name}
                  helperText={getProductErrorMessage(formErrors.name, intl)}
                  fullWidth
                />
              </div>

              <div className={classes.codeInput}>
                <TextField
                  label={intl.formatMessage({
                    defaultMessage: "Post Code"
                  })}
                  name="name"
                  disabled={disabled}
                  value={data && data.name}
                  onChange={onChange}
                  error={!!formErrors.name}
                  helperText={getProductErrorMessage(formErrors.name, intl)}
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
              name="businessCategory"
              onChange={handleCountrySelect}
              value={data.businessCategory}
              choices={businessNamesArray}
              InputProps={{
                autoComplete: "off"
              }}
            />
          </div>

          <FormSpacer />

          <div className={classes.phoneInput}>
            <p>Phone</p>
            <MuiPhoneNumber defaultCountry={"gb"} onChange={handleOnChange} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default ContactInformationForm;
