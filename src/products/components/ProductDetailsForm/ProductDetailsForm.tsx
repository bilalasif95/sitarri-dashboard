import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
// import { RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
// import RichTextEditor from "@saleor/components/RichTextEditor";
import { commonMessages } from "@saleor/intl";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";

interface ProductDetailsFormProps {
  data: {
    description: string;
    name: string;
  };
  disabled?: boolean;
  errors: ProductErrorFragment[];
  // Draftail isn't controlled - it needs only initial input
  // because it's autosaving on its own.
  // Ref https://github.com/mirumee/saleor/issues/4470
  // initialDescription: string;
  onChange(event: any);
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  data,
  disabled,
  errors,
  // initialDescription,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "description"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, intl)}
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Name",
            description: "product name"
          })}
          name="name"
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          error={!!formErrors.description}
          helperText={getProductErrorMessage(formErrors.description, intl)}
          disabled={disabled}
          multiline
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Description",
            description: "product description"
          })}
          name="description"
          value={data.description}
          onChange={onChange}
        />
        {/* <RichTextEditor
          disabled={disabled}
          error={!!formErrors.description}
          helperText={getProductErrorMessage(formErrors.description, intl)}
          initial={initialDescription}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          onChange={onChange}
        /> */}
      </CardContent>
    </Card>
  );
};
export default ProductDetailsForm;
