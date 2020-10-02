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
import RichTextEditor from "@saleor/components/RichTextEditor";
import { commonMessages } from "@saleor/intl";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { maybe } from "../../../misc";
import { CategoryDetails_category } from "../../types/CategoryDetails";
import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";

const useStyles = makeStyles(
  theme => ({
    SelectCategory: {
      marginTop: "20px"
    },

    toolbar: { marginTop: -theme.spacing(0.5) }
  }),
  { name: "BusinessInformationOfSpecificStore" }
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

export const CategoryDetailsForm: React.FC<CategoryDetailsFormProps> = (
  { category, disabled, data, onChange, errors },
  props
) => {
  const intl = useIntl();
  const classes = useStyles(props);

  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => "", "")
  );
  const formErrors = getFormErrors(["name", "descriptionJson"], errors);
  const handleCountrySelect = createSingleAutocompleteSelectHandler(
    onChange,
    setCountryDisplayName,
    businessNamesArray
  );

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
          title={intl.formatMessage(commonMessages.generalInformations)}
        />
        <CardContent>
          <div>
            <TextField
              label={intl.formatMessage({
                defaultMessage: "Name"
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
          <FormSpacer />
          <RichTextEditor
            disabled={disabled}
            error={!!formErrors.descriptionJson}
            helperText={getProductErrorMessage(
              formErrors.descriptionJson,
              intl
            )}
            label={intl.formatMessage({
              defaultMessage: "Description"
            })}
            initial={maybe(() => JSON.parse(category.descriptionJson))}
            name="description"
            onChange={onChange}
          />

          <div className={classes.SelectCategory}>
            <p>Let customers know if they can visit your store</p>
            <SingleAutocompleteSelectField
              disabled={disabled}
              displayValue={countryDisplayName}
              label={intl.formatMessage({
                defaultMessage: "Online or Offline Store"
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
        </CardContent>
      </Card>

      <Card>
        <CardTitle
          title={intl.formatMessage(commonMessages.generalInformations)}
        />
        <CardContent>
          <div>
            <TextField
              label={intl.formatMessage({
                defaultMessage: "Name"
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
          <FormSpacer />
          <RichTextEditor
            disabled={disabled}
            error={!!formErrors.descriptionJson}
            helperText={getProductErrorMessage(
              formErrors.descriptionJson,
              intl
            )}
            label={intl.formatMessage({
              defaultMessage: "Description"
            })}
            initial={maybe(() => JSON.parse(category.descriptionJson))}
            name="description"
            onChange={onChange}
          />

          <div className={classes.SelectCategory}>
            <p>Let customers know if they can visit your store</p>
            <SingleAutocompleteSelectField
              disabled={disabled}
              displayValue={countryDisplayName}
              label={intl.formatMessage({
                defaultMessage: "Online or Offline Store"
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
        </CardContent>
      </Card>
    </>
  );
};
export default CategoryDetailsForm;
