import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import CardTitle from "@saleor/components/CardTitle";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import Skeleton from "@saleor/components/Skeleton";
// import { commonMessages } from "@saleor/intl";
// import { maybe } from "../../../misc";
import ProductImageNavigation from "../ProductImageNavigation";
// import CategoryBackground from "../CategoryBackground";

const useStyles = makeStyles(
  theme => ({
    image: {
      height: "100%",
      objectFit: "contain",
      width: "100%"
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      margin: `0 auto ${theme.spacing(2)}px`,
      maxWidth: 552,
      padding: theme.spacing(2)
    }
  }),
  { name: "ProductImagePage" }
);

interface ProductImagePageProps {
  image?: {
    id: string;
    alt: string;
    url: string;
    title?: string;
    imageUrl?: string;
    faviconAlt?: string;
    favicon?: any
  };
  images?: Array<{
    id: string;
    url: string;
  }>;
  disabled: boolean;
  product: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  onRowClick: (id: string) => () => void;
  onSubmit: (data: { description: string; imageUrl?: string; title?: string; favicon?: any; faviconAlt?: string; }) => void;
  onImageDelete?: () => void;
  onBack: () => void;
  onDelete: () => void;
  onImageUpload?(file: File);
}

const ProductImagePage: React.FC<ProductImagePageProps> = props => {
  const {
    disabled,
    image,
    images,
    product,
    saveButtonBarState,
    // onImageUpload,
    // onImageDelete,
    onBack,
    onDelete,
    onRowClick,
    onSubmit
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <Form
      initial={{
        description: image ? image.alt : "",
        favicon: image ? image.favicon : "",
        faviconAlt: image ? image.faviconAlt : "",
        imageUrl: image ? image.imageUrl : "",
        title: image ? image.title : "",
      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>{product}</AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Edit Photo",
              description: "header"
            })}
          />
          <Grid variant="inverted">
            <div>
              <ProductImageNavigation
                disabled={disabled}
                images={images}
                highlighted={image ? image.id : undefined}
                onRowClick={onRowClick}
              />
              <Card>
                <CardTitle
                  title={intl.formatMessage({
                    defaultMessage: "Photo Information",
                    description: "section header"
                  })}
                />
                <CardContent>
                  <TextField
                    name="description"
                    label="Image Alt"
                    helperText={intl.formatMessage({
                      defaultMessage: "Optional",
                      description: "field is optional"
                    })}
                    disabled={disabled}
                    onChange={change}
                    value={data.description}
                    multiline
                    fullWidth
                  />
                  <CardSpacer />
                  <TextField
                    name="title"
                    label="Image Title"
                    helperText={intl.formatMessage({
                      defaultMessage: "Optional",
                      description: "field is optional"
                    })}
                    disabled={disabled}
                    onChange={change}
                    value={data.title}
                    fullWidth
                  />
                  <CardSpacer />
                  <TextField
                    name="imageUrl"
                    label="Image Source URL"
                    helperText={intl.formatMessage({
                      defaultMessage: "Optional",
                      description: "field is optional"
                    })}
                    disabled={disabled}
                    onChange={change}
                    value={data.imageUrl}
                    fullWidth
                  />
                  <CardSpacer />
                  <TextField
                    name="favicon"
                    label="Favicon URL"
                    helperText={intl.formatMessage({
                      defaultMessage: "Optional",
                      description: "field is optional"
                    })}
                    disabled={disabled}
                    onChange={change}
                    value={data.favicon}
                    fullWidth
                  />
                  <CardSpacer />
                  <TextField
                    name="faviconAlt"
                    label="Favicon Alt"
                    helperText={intl.formatMessage({
                      defaultMessage: "Optional",
                      description: "field is optional"
                    })}
                    disabled={disabled}
                    onChange={change}
                    value={data.faviconAlt}
                    fullWidth
                  />
                  {/* <CategoryBackground
                    data={data}
                    onImageUpload={onImageUpload}
                    onImageDelete={onImageDelete}
                    image={maybe(() => image.favicon)}
                    onChange={change}
                  /> */}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardTitle
                  title={intl.formatMessage({
                    defaultMessage: "Photo View",
                    description: "section header"
                  })}
                />
                <CardContent>
                  {!!image ? (
                    <div className={classes.imageContainer}>
                      <img src={image.url} className={classes.image} />
                    </div>
                  ) : (
                      <Skeleton />
                    )}
                </CardContent>
              </Card>
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !onSubmit || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onDelete={onDelete}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};
ProductImagePage.displayName = "ProductImagePage";
export default ProductImagePage;
