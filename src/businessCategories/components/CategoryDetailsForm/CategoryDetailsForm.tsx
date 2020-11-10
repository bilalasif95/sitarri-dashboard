import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import RichTextEditor from "@saleor/components/RichTextEditor";
import { commonMessages } from "@saleor/intl";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
// import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import { maybe } from "../../../misc";
import { CategoryDetails_category } from "../../types/CategoryDetails";
import { CategoryUpdate_categoryUpdate_errors } from "../../types/CategoryUpdate";

interface CategoryDetailsFormProps {
  category?: CategoryDetails_category;
  data: {
    name: string;
    description: RawDraftContentState;
  };
  disabled: boolean;
  errors: CategoryUpdate_categoryUpdate_errors[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

export const CategoryDetailsForm: React.FC<CategoryDetailsFormProps> = ({
  category,
  disabled,
  data,
  onChange,
  errors
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "description"], errors);
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <div>
          <TextField
            label={intl.formatMessage({
              defaultMessage: "Business Category Name"
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
          error={!!formErrors.description}
          helperText={getProductErrorMessage(formErrors.description, intl)}
          label={intl.formatMessage({
            defaultMessage: "Business Category Description"
          })}
          initial={maybe(() => JSON.parse(category.description))}
          name="description"
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default CategoryDetailsForm;
