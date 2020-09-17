import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { RawDraftContentState } from "draft-js";
import React from "react";
import Dropzone from "react-dropzone";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";

import uploadicon from "@assets/images/uploadicon.svg";
// import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
// import RichTextEditor from "@saleor/components/RichTextEditor";
// import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { getFormErrors } from "@saleor/utils/errors";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";

import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";

interface ProductDetailsFormProps {
  data: {
    description: RawDraftContentState;
    name: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    logo?: any;
    businessCategory?: string;
  };
  businessNames: any;
  disabled?: boolean;
  errors: ProductErrorFragment[];
  // Draftail isn't controlled - it needs only initial input
  // because it's autosaving on its own.
  // Ref https://github.com/mirumee/saleor/issues/4470
  // initialDescription: RawDraftContentState;
  onChange(event: any);
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  data,
  disabled,
  errors,
  businessNames,
  // initialDescription,
  onChange
}) => {
  const intl = useIntl();
  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => "", "")
  );
  const [logo, setLogo] = React.useState<any>();
  // const [logoFile, setLogoFile] = React.useState<any>();
  const formErrors = getFormErrors(["website", "facebook", "instagram", "twitter"], errors);
  const handleCountrySelect = createSingleAutocompleteSelectHandler(
    onChange,
    setCountryDisplayName,
    businessNamesArray
  );

  React.useEffect(() => {
    const businessNameArray = [];
    maybe(() =>
      businessNames.map(name => {
        businessNameArray.push({ label: name.node.name, value: name.node.id });
      })
    );
    setBusinessNamesArray(businessNameArray);
  }, [businessNames]);
  return (
    <Card>
      {/* <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      /> */}
      <CardContent>
        <img />
        <h3>Business Name</h3>
        <p>Verified</p>

        <SingleAutocompleteSelectField
          disabled={disabled}
          displayValue={countryDisplayName}
          label={intl.formatMessage({
            defaultMessage: "Business Category"
          })}
          name="businessCategory"
          onChange={handleCountrySelect}
          value={data.businessCategory}
          choices={businessNamesArray}
          InputProps={{
            autoComplete: "off"
          }}
        />
        <TextField
          disabled={disabled}
          label="Website"
          name="website"
          error={!!formErrors.website}
          helperText={!!formErrors.website}
          type="url"
          onChange={onChange}
          value={data.website}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          label="Facebook"
          name="facebook"
          error={!!formErrors.facebook}
          helperText={!!formErrors.facebook}
          type="url"
          onChange={onChange}
          value={data.facebook}
        />
        <TextField
          disabled={disabled}
          label="Instagram"
          name="instagram"
          error={!!formErrors.instagram}
          helperText={!!formErrors.instagram}
          type="url"
          onChange={onChange}
          value={data.instagram}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          label="Twitter"
          name="twitter"
          error={!!formErrors.twitter}
          helperText={!!formErrors.twitter}
          type="url"
          onChange={onChange}
          value={data.twitter}
        />
        <FormSpacer />
        <div>
          <p>Business Logo</p>
          <div>
            <Dropzone
              accept="image/*"
              multiple={false}
              onDrop={acceptedFiles => {
                if (acceptedFiles && acceptedFiles[0]) {
                  data.logo = acceptedFiles[0];
                  // setLogoFile(acceptedFiles[0]);
                  const reader = new FileReader();
                  reader.onload = e => {
                    setLogo(e.target.result);
                  };
                  reader.readAsDataURL(acceptedFiles[0]);
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />

                    <p>
                      Drag and drop an image here or click
                                </p>
                    <SVG src={uploadicon} />
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        <div>
          <p>Preview:</p>
          <div>
            {logo === "" ? "" : <img src={logo} />}
          </div>
        </div>
        <button onClick={() => setLogo("")}>
          Remove
        </button>
        {/* <RichTextEditor
          disabled={disabled}
          error={!!formErrors.descriptionJson}
          helperText={getProductErrorMessage(formErrors.descriptionJson, intl)}
          // initial={initialDescription}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          onChange={onChange}
        /> */}
      </CardContent>
    </Card>
  );
};
export default ProductDetailsForm;
