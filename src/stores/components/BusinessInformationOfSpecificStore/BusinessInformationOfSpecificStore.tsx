import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import Book from "@assets/images/book.svg";
import Earth from "@assets/images/earth.svg";
import Instagram from "@assets/images/instagram.svg";
import Tag from "@assets/images/tag.svg";
import TextField from "@material-ui/core/TextField";
// import { RawDraftContentState } from "draft-js";
import Facebook from "@assets/images/facebook1.svg";
import React from "react";
import { useIntl } from "react-intl";
import SVG from "react-inlinesvg";
import CardTitle from "@saleor/components/CardTitle";
// import FormSpacer from "@saleor/components/FormSpacer";
// import RichTextEditor from "@saleor/components/RichTextEditor";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
// import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import Twitter from "@assets/images/twitter1.svg";
import uploadicon from "@assets/images/uploadicon1.svg";

import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import NoImg from "@assets/images/noimg.svg";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import Scooter from "@assets/images/scooter.svg";
import { CategoryDetails_category } from "../../types/CategoryDetails";
import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";
import { maybe } from "../../../misc";

const useStyles = makeStyles(
  theme => ({
    BusinessDropbox: {
      alignItems: "center",
      display: "flex"
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
      "& .MuiInputLabel-formControl": {
        width: "initial"
      },
      "& input": {
        marginLeft: "0px !important"
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
        marginLeft: "90px"
      }
    },
    ImgDropzone: {
      "& p": {
        color: "#000",
        fontSize: "10px",
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
      padding: "0px 10px"
    },
    ImgPreviewBox: {},
    InputIcons: {
      marginRight: "10px",
      marginTop: "33px"
    },
    InputPrepend: {
      position: "relative"
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
        background: "#e8ebeb",
        borderRadius: "5px",
        height: "60px",
        width: "60px"
      },
      background: "#e8ebeb",
      borderRadius: "5px",
      height: "60px",
      marginBottom: "5px",
      marginRight: "35px",
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
      padding: "5px 10px"
    },
    SocialIcons: {
      "& .MuiInputLabel-formControl": {
        width: "initial"
      },
      alignItems: "center",
      display: "flex"
    },
    TitleImg: {
      background: "#e8ebeb",
      borderRadius: "5px",
      height: "60px",
      marginRight: "25px",
      width: "60px"
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
        marginLeft: "35px !important"
      },
      "& label": {
        marginLeft: "35px !important"
      }
    },
    card: {
      marginBottom: theme.spacing(2)
    },
    highlightedImageContainer: {
      borderColor: theme.palette.primary.main
    },
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%"
    },
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
    inputText: {
      fontSize: "8px"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: "repeat(4, 1fr)"
    },
    toolbar: { marginTop: -theme.spacing(0.5) },
    twitter: {
      "& input": {
        marginLeft: "80px !important"
      },
      "& label": {
        marginLeft: "79px !important"
      }
    }
  }),
  { name: "BusinessInformationOfSpecificStore" }
);

interface CategoryDetailsFormProps {
  category?: CategoryDetails_category;
  data: {
    name: string;
    facebook?: string;
    // description: RawDraftContentState;
    website?: string;
    instagram?: string;
    twitter?: string;
    logo?: any;
    reservationSystem?: string;
    delivery?: string;
    businessCategory?: string;
  };
  disabled: boolean;
  businessNames: any;
  errors: any;
  onChange: (event: React.ChangeEvent<any>) => void;
}

export const BusinessInformationOfSpecificStore: React.FC<CategoryDetailsFormProps> = (
  { disabled, category, data, onChange, errors, businessNames },
  props
) => {
  const intl = useIntl();
  const classes = useStyles(props);
  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => category.businesscategory ? category.businesscategory.name : category.business.businesscategory.name, "")
  );
  const [logo, setLogo] = React.useState<any>();
  const formErrors = getFormErrors(
    ["name", "websiteUrl", "facebookUrl", "uberEatsUrl", "deliverooUrl", "instagramUrl", "twitterUrl"],
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
      <CardTitle
        title={intl.formatMessage(commonMessages.businessInformation)}
      />
      <CardContent>
        {/* imagedropbox */}
        <p>Preview:</p>
        <div className={classes.BusinessDropbox}>
          <div className={classes.ImgPreviewBox}>
            <div className={classes.PreviewBox}>
              {(logo === "" || logo === undefined) && maybe(() => data.logo) === null ? (
                <SVG src={NoImg} />
              ) : (
                  <img src={maybe(() => data.logo) ? typeof (maybe(() => data.logo)) === "string" ? maybe(() => data.logo) : logo : maybe(() => data.logo)} />
                )}
            </div>
          </div>

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
                  <div className={classes.DropzoneOutline} {...getRootProps()}>
                    <input {...getInputProps()} />

                    <p>Drag and drop an image here or click</p>
                    <SVG src={uploadicon} />
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        <button className={classes.RemoveBtn} onClick={() => { setLogo(""); data.logo = null }}>
          Remove
        </button>

        {/* imagedropbox */}

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
                disabled={disabled}
                label="Facebook"
                name="facebook"
                error={!!formErrors.facebookUrl}
                helperText={!!formErrors.facebookUrl}
                // type="url"
                onChange={onChange}
                value={data.facebook}
              />
            </div>
          </div>

          <div className={classes.InputPrepend}>
            <div className={classes.PrependText}>www.twitter.com/</div>
            <div className={classes.SocialIcons}>
              <SVG className={classes.InputIcons} src={Twitter} />
              <TextField
                className={classes.twitter}
                disabled={disabled}
                label="Twitter"
                name="twitter"
                error={!!formErrors.twitterUrl}
                helperText={!!formErrors.twitterUrl}
                // type="url"
                onChange={onChange}
                value={data.twitter}
              />
            </div>
          </div>

          <div className={classes.InputPrepend}>
            <div className={classes.PrependText}>www.</div>
            <div className={classes.SocialIcons}>
              <SVG className={classes.InputIcons} src={Earth} />
              <TextField
                className={classes.Website}
                disabled={disabled}
                label="Website"
                name="website"
                error={!!formErrors.websiteUrl}
                helperText={!!formErrors.websiteUrl}
                // type="url"
                onChange={onChange}
                value={data.website}
              />
            </div>
          </div>

          <div className={classes.InputPrepend}>
            <div className={classes.PrependText}>www.instagram.com/</div>
            <div className={classes.SocialIcons}>
              <SVG className={classes.InputIcons} src={Instagram} />
              <TextField
                disabled={disabled}
                label="Instagram"
                name="instagram"
                error={!!formErrors.instagramUrl}
                helperText={!!formErrors.instagramUrl}
                // type="url"
                onChange={onChange}
                value={data.instagram}
              />
            </div>
          </div>

          <div className={classes.InputPrepend}>
            <div className={classes.PrependText}>www.</div>
            <div className={classes.SocialIcons}>
              <div>
                <SVG className={classes.InputIcons} src={Scooter} />
              </div>
              <div>
                <TextField
                  className={classes.Website}
                  disabled={disabled}
                  label="Delivery Partner Url"
                  name="delivery"
                  error={!!formErrors.deliverooUrl}
                  helperText={!!formErrors.deliverooUrl}
                  // type="url"
                  onChange={onChange}
                  value={data.delivery}
                />
                <p className={classes.inputText}>
                  Your Store page on Deliveroo, UberEats, Just Eat for others
                </p>
              </div>
            </div>
          </div>

          <div className={classes.InputPrepend}>
            <div className={classes.PrependText}>www.</div>
            <div className={classes.SocialIcons}>
              <div>
                <SVG className={classes.InputIcons} src={Book} />
              </div>
              <div>
                <TextField
                  className={classes.Website}
                  disabled={disabled}
                  label="Reservation system Url"
                  name="reservationSystem"
                  error={!!formErrors.uberEatsUrl}
                  helperText={!!formErrors.uberEatsUrl}
                  // type="url"
                  onChange={onChange}
                  value={data.reservationSystem}
                />
                <p className={classes.inputText}>
                  Your booking page on resy, OpenTable, SevenRooms or others
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default BusinessInformationOfSpecificStore;
