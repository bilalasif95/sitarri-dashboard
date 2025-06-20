import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardTitle from "@saleor/components/CardTitle";
import Hr from "@saleor/components/Hr";
import ImageTile from "@saleor/components/FaviconImageTile";
import ImageUpload from "@saleor/components/ImageUpload";
import Skeleton from "@saleor/components/Skeleton";
import { commonMessages } from "@saleor/intl";
import { FormattedMessage, useIntl } from "react-intl";
// import { ProductImageById_product_mainImage } from "../../types/ProductImageById";

const useStyles = makeStyles(
  theme => ({
    fileField: {
      display: "none"
    },
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%"
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      height: 148,
      justifySelf: "start",
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      width: 148
    },
    title: {
      "& .MuiTypography-h5": {
        fontSize: "1rem !important",
      },
    }
  }),
  { name: "CategoryBackground" }
);

export interface CategoryBackgroundProps {
  data: any;
  image: any;
  onChange: (event: React.ChangeEvent<any>) => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

const CategoryBackground: React.FC<CategoryBackgroundProps> = props => {
  const classes = useStyles(props);
  const intl = useIntl();
  const anchor = React.useRef<HTMLInputElement>();

  const { data, onImageUpload, image, onChange, onImageDelete } = props;

  const handleImageUploadButtonClick = () => anchor.current.click();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Favicon Image",
          description: "section header"
        })}
        className={classes.title}
        toolbar={
          <>
            <Button
              variant="text"
              color="primary"
              onClick={handleImageUploadButtonClick}
            >
              <FormattedMessage {...commonMessages.uploadImage} />
            </Button>
            <input
              className={classes.fileField}
              id="fileUpload"
              onChange={event => onImageUpload(event.target.files[0])}
              type="file"
              ref={anchor}
              accept="image/*"
            />
          </>
        }
      />
      {image === undefined ? (
        <CardContent>
          <div>
            <div className={classes.imageContainer}>
              <Skeleton />
            </div>
          </div>
        </CardContent>
      ) : (image === null) || (image === "") ? (
        <ImageUpload onImageUpload={files => onImageUpload(files[0])} />
      ) : (
            <CardContent>
              <ImageTile image={image} alt={data.faviconAlt} onImageDelete={onImageDelete} />
            </CardContent>
          )}

      {image && (
        <>
          <Hr />
          <CardContent>
            <TextField
              name="faviconAlt"
              label="Favicon Alt"
              helperText={intl.formatMessage({
                defaultMessage: "(Optional)",
                description: "field is optional"
              })}
              value={data.faviconAlt}
              onChange={onChange}
              fullWidth
              multiline
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};
CategoryBackground.displayName = "CategoryBackground";
export default CategoryBackground;
