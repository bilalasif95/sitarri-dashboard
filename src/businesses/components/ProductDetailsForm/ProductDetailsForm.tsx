import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import { RawDraftContentState } from "draft-js";
import Facebook from "@assets/images/facebook1.svg";
import React from "react";
import Dropzone from "react-dropzone";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";

import Shield from "@assets/images/shield.svg";
import Earth from "@assets/images/earth.svg";
import Instagram from "@assets/images/instagram.svg";
import NoImg from "@assets/images/noimg.svg";
import Twitter from "@assets/images/twitter1.svg";
import Tag from "@assets/images/tag.svg";
import uploadicon from "@assets/images/uploadicon1.svg";

// import CardTitle from "@saleor/components/CardTitle";
// import FormSpacer from "@saleor/components/FormSpacer";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
// import RichTextEditor from "@saleor/components/RichTextEditor";
// import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { getFormErrors } from "@saleor/utils/errors";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";

import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";

const useStyles = makeStyles(
  theme => ({
    "& img": {
      background: "#e8ebeb",
      borderRadius: "5px",
      height: "60px",
      width: "60px"
    },
    BusinessTitle: {
      alignItems: "center",
      display: "flex"
    },
    BusinessTypography: {
      "& h3": {
        fontSize: "20px",
        marginBottom: "0px",
        marginTop: "3px"
      }
    },
    CategoryInput: {
      "& input": {
        paddingLeft: "16px !important"
      },
      "& label": {
        marginLeft: "0px !important"
      },
      alignItems: "center",
      display: "flex"
    },
    DropzoneOutline: {
      "&:focus": {
        border: "none",
        outline: "none"
      }
    },
    Facebook: {
      "& input": {
        paddingLeft: "103px !important"
      },
      "& label": {
        marginLeft: "91px !important",
        width: "initial",
      }
    },
    Form: {
      display: "flex",
      justifyContent: "space-between"
    },

    FormBox: {
      "& .MuiFormControl-root": {
        marginTop: "30px",
        position: "relative",
        width: "100%"
      },
      "& .MuiInputBase-fullWidth": {
        width: "100%"
      },

      "& .MuiInputLabel-animated": {
        marginLeft: "91px"
      },
      "& input": {
        paddingLeft: "108px"
      },
      width: "30%"
    },

    ImgDropzone: {
      "& p": {
        color: "#000",
        fontSize: "13px",
        textAlign: "center"
      },
      "& svg": {
        left: "45%",
        position: "relative",
        right: "0",
        top: "50%"
      },
      background: "#eaeaea",
      border: "1px dashed #a1a1a1",
      borderRadius: "5px",
      cursor: "pointer",
      highlightedImageContainer: {
        borderColor: theme.palette.primary.main
      },
      padding: "0px 10px"
    },

    InputIcons: {
      marginRight: "10px",
      marginTop: "33px"
    },

    InputPrepend: {
      position: "relative"
    },

    Instagram: {
      "& input": {
        paddingLeft: "108px !important"
      },
      "& label": {
        marginLeft: "95px !important",
        width: "initial",
      }
    },
    PrependText: {
      background: "#efefef",
      borderBottomLeftRadius: "5px",
      borderRight: "1px solid #9d9d9d",
      borderTopLeftRadius: "5px",
      fontSize: "8px",
      left: "31px",
      padding: "20px 8px",
      position: "absolute",
      top: "31px",
      zIndex: 1
    },
    PreviewBox: {
      "& img": {
        borderRadius: "4px",
        height: "60px",
        // objectFit: "contain",
        // userSelect: "none",
        width: "60px"
      },
      background: "#e8ebeb",
      borderRadius: "5px",
      height: "60px",
      marginBottom: "1em",
      width: "60px"
    },
    RemoveBtn: {
      "&:focus": {
        outline: "none"
      },
      background: "#eb4c2b",
      border: "none",
      borderRadius: "5px",
      color: "#fff",
      cursor: "pointer",
      display: "block",
      fontSize: "12px",
      imageContainer: {
        background: "#ffffff",
        border: "2px solid #eaeaea",
        borderRadius: theme.spacing(),
        cursor: "pointer",
        height: 48,
        overflow: "hidden",
        padding: theme.spacing(0.5),
        position: "relative"
      },
      margin: "0px auto",
      padding: "5px 10px"
    },
    SocialIcons: {
      alignItems: "center",
      display: "flex"
    },
    TitleImg: {
      "& img": {
        borderRadius: "5px",
        height: "60px",
        width: "60px"
      },
      background: "#e8ebeb",
      borderRadius: "5px",
      height: "60px",
      marginRight: "25px",
      width: "60px"
    },
    Twitter: {
      "& input": {
        paddingLeft: "93px !important"
      },
      "& label": {
        marginLeft: "80px !important",
        width: "initial",
      }
    },
    VerifiedImg: {
      left: "0",
      position: "absolute"
    },
    VerifiedList: {
      listStyleType: "none",
      paddingLeft: "0px"
    },
    VerifiedText: {
      color: "#1873e4",
      fontSize: "12px",
      paddingLeft: " 25px",
      position: "relative"
    },
    Website: {
      "& input": {
        paddingLeft: "50px !important"
      },
      "& label": {
        marginLeft: "37px !important"
      }
    },
    card: {
      marginBottom: theme.spacing(2)
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: "repeat(4, 1fr)"
    },

    toolbar: { marginTop: -theme.spacing(0.5) }
  }),
  { name: "ProductDetailsForm" }
);

interface ProductDetailsFormProps {
  data: {
    description: string;
    name: string;
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    logo?: any;
    businessCategory?: string;
  };
  product?: any;
  businessNames: any;
  disabled?: boolean;
  errors: ProductErrorFragment[];
  // Draftail isn't controlled - it needs only initial input
  // because it's autosaving on its own.
  // Ref https://github.com/mirumee/saleor/issues/4470
  // initialDescription: RawDraftContentState;
  onChange(event: any);
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = (
  {
    data,
    disabled,
    errors,
    product,
    businessNames,
    // initialDescription,
    onChange
  },
  props
) => {
  const intl = useIntl();
  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => product.businesscategory.name, "")
  );
  const classes = useStyles(props);
  const [logo, setLogo] = React.useState<any>();
  // const [logoFile, setLogoFile] = React.useState<any>();
  const formErrors = getFormErrors(
    ["websiteUrl", "facebookUrl", "instagramUrl", "twitterUrl"],
    errors
  );
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
        <div className={classes.BusinessTitle}>
          <div className={classes.TitleImg}>
            {product && product.logo ?
              <img src={product && product.logo} />
              :
              <SVG src={NoImg} />
            }
          </div>
          <div className={classes.BusinessTypography}>
            <h3>{data.name}</h3>
            <ul className={classes.VerifiedList}>
              <li className={classes.VerifiedText}>
                <SVG className={classes.VerifiedImg} src={Shield} />
                {product && product.isVerified ? "Verified" : "Not Verified"}
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.Form}>
          <div className={classes.FormBox}>
            <div className={classes.CategoryInput}>
              <SVG className={classes.InputIcons} src={Tag} />
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
                  inputProps: {
                    autocomplete: "plsdontautocomplete" // Somehow it shuts it down
                  }
                }}
              />
            </div>

            <div className={classes.InputPrepend}>
              <div className={classes.PrependText}>www.facebook.com/</div>
              <div className={classes.SocialIcons}>
                <SVG className={classes.InputIcons} src={Facebook} />
                <TextField
                  className={classes.Facebook}
                  disabled={disabled}
                  label="Facebook"
                  name="facebookUrl"
                  error={!!formErrors.facebookUrl}
                  helperText={!!formErrors.facebookUrl}
                  // type="url"
                  onChange={onChange}
                  value={data && data.facebookUrl}
                />
              </div>
            </div>

            <div className={classes.InputPrepend}>
              <div className={classes.PrependText}>www.twitter.com/</div>
              <div className={classes.SocialIcons}>
                <SVG className={classes.InputIcons} src={Twitter} />
                <TextField
                  className={classes.Twitter}
                  disabled={disabled}
                  label="Twitter"
                  name="twitterUrl"
                  error={!!formErrors.twitterUrl}
                  helperText={!!formErrors.twitterUrl}
                  // type="url"
                  onChange={onChange}
                  value={data && data.twitterUrl}
                />
              </div>
            </div>
          </div>

          <div className={classes.FormBox}>
            <div className={classes.InputPrepend}>
              <div className={classes.PrependText}>www.</div>
              <div className={classes.SocialIcons}>
                <SVG className={classes.InputIcons} src={Earth} />
                <TextField
                  className={classes.Website}
                  disabled={disabled}
                  label="Website"
                  name="websiteUrl"
                  error={!!formErrors.websiteUrl}
                  helperText={!!formErrors.websiteUrl}
                  // type="url"
                  onChange={onChange}
                  value={data && data.websiteUrl}
                />
              </div>
            </div>

            <div className={classes.InputPrepend}>
              <div className={classes.PrependText}>www.instagram.com/</div>
              <div className={classes.SocialIcons}>
                <SVG className={classes.InputIcons} src={Instagram} />
                <TextField
                  className={classes.Instagram}
                  disabled={disabled}
                  label="Instagram"
                  name="instagramUrl"
                  error={!!formErrors.instagramUrl}
                  helperText={!!formErrors.instagramUrl}
                  // type="url"
                  onChange={onChange}
                  value={data && data.instagramUrl}
                />
              </div>
            </div>
          </div>

          <div className={classes.FormBox}>
            <div>
              <p>Business Logo</p>

              <div className={classes.ImgDropzone}>
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
                    <section className={classes.DropzoneOutline}>
                      <div
                        className={classes.DropzoneOutline}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />

                        <p>Drag and drop an image here or click</p>
                        <SVG src={uploadicon} />
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
            <div>
              <p>Preview:</p>
              <div className={classes.PreviewBox}>
                {logo === "" || logo === undefined ? (
                  <SVG src={NoImg} />
                ) : (
                    <img src={logo} />
                  )}
              </div>
            </div>
            <button className={classes.RemoveBtn} onClick={() => setLogo("")}>
              Remove
            </button>
          </div>
        </div>

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
