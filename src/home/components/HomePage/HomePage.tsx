import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Dropzone from 'react-dropzone';
import { IntlShape, useIntl } from "react-intl";
import SVG from "react-inlinesvg";

import { isValidPhoneNumber } from 'react-phone-number-input';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import claimBusiness from "@assets/images/Group 9355.svg";
import email from "@assets/images/email.svg";
import newBusiness from "@assets/images/Group 9685.svg";
import employeeAccess from "@assets/images/OBJECTS.svg";
import arrowleft from "@assets/images/arrow-left.svg";
import inputicon from "@assets/images/inputicon.svg";
import location from "@assets/images/location.svg";
import search from "@assets/images/search.svg";
import phone from "@assets/images/phone.svg";
import globe from "@assets/images/globe.svg";
import facebook from "@assets/images/facebook.svg";
import instagram from "@assets/images/instagram.svg";
import saleimg1 from "@assets/images/saleimg1.svg";
import saleimg2 from "@assets/images/saleimg2.svg";
import saleimg3 from "@assets/images/saleimg3.svg";
import saleimg4 from "@assets/images/saleimg4.svg";
import twitter from "@assets/images/twitter.svg";
import uploadicon from "@assets/images/uploadicon.svg";
import CardSpacer from "@saleor/components/CardSpacer";
import ConfirmButton, { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import { FormSpacer } from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import Money from "@saleor/components/Money";
import RadioGroupField, { RadioGroupFieldChoice } from "@saleor/components/RadioGroupField";
import RequirePermissions from "@saleor/components/RequirePermissions";
import Skeleton from "@saleor/components/Skeleton";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import useUser from "@saleor/hooks/useUser";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { UserPermissionProps } from "@saleor/types";
import { PermissionEnum } from "@saleor/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import Orders from "../../../icons/Orders";
import Sales from "../../../icons/Sales";
import {
  Home_activities_edges_node,
  Home_productTopToday_edges_node,
  Home_salesToday_gross
} from "../../types/Home";
import HomeActivityCard from "../HomeActivityCard";
import HomeAnalyticsCard from "../HomeAnalyticsCard";
import HomeHeader from "../HomeHeader";
import HomeNotificationTable from "../HomeNotificationTable/HomeNotificationTable";
import HomeProductListCard from "../HomeProductListCard";
import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";

import { TypedShopInfoQuery } from "../../../../src/components/Shop/query";

import { ClaimBusinessMutation, CreateBusinessMutation, CreateStoreMutation, EmployeeAccessMutation, ProductBulkCreateMutation } from "../../queries";

import { ClaimBusiness } from "../../types/ClaimBusiness";
import { CreateStore } from "../../types/CreateStore";
import { EmployeeAccess } from "../../types/EmployeeAccess";
import { CreateBusiness } from "../../types/CreateBusiness";
import { ProductBulkCreate } from "../../types/ProductBulkCreate";

import { getAuthToken } from "../../../auth/utils";

const useStyles = makeStyles(
  theme => ({
    arrowlefticon: {
      left: '0',
      position: 'absolute',
    },
    btntext: {
      textTransform: 'capitalize',
    },
    businessbtn: {
      "&:hover": {
        backgroundColor: 'transparent',
        border: '1px solid #000',
      },
      backgroundColor: '#fff',
      border: '1px solid transparent',
      color: '#000',
      display: 'block',
      marginTop: '0px',
      padding: '11.8px 10px',
      width: '100%',
    },
    businesscard: {
      backgroundImage: 'Linear-gradient(#fe9725, #f65216)',
    },
    businessimgbox: {
      "& svg": {
        height: '100%',
        marginTop: '-2px',
        width: '100%',
      },
      display: 'flex',
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    businessmodal: {
      display: 'block',
      margin: '0px auto',
      paddingTop: '30px;',
      width: '80%',
    },
    businessmodalcont: {
      backgroundColor: '#fafafa',
      // overflowY: 'hidden',
      paddingBottom: '30px',
    },
    businessmodaltextarea: {
      "& label": {
        overflowX: 'visible',
      },
      marginLeft: '47px',
      marginTop: '30px',
      width: '89%',
    },
    cardContainer: {
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridColumnGap: theme.spacing(1)
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr"
      }
    },
    cardContent: {
      padding: '30px 15px 100px 15px',
      width: '100%',
    },
    cardbtn: {
      display: 'block',
      padding: '13px 10px',
      width: '100%',
    },
    cardbtntext: {
      color: '#000',
      textTransform: 'capitalize',
    },
    cardhead: {
      fontSize: '18px',
      fontWeight: 500,
      position: 'absolute',
      textAlign: 'center',
      top: '1rem',
      width: '100%',
    },
    cardhead1: {
      fontSize: '18px',
    },
    cards: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    cardshomepage: {
      "::-webkit-scrollbar": {
        width: '4px',
      },
      padding: '0px !important',
    },
    cardtext: {
      height: '145px',
    },
    choosefile: {
      "& input": {
        backgroundColor: '#eaeaea',
        padding: '60px 0px !important',
      },
    },
    chooseoption: {
      margin: '0px auto',
      marginTop: '50px !important',
      width: '80%',
    },
    claimcard: {
      backgroundColor: '#fff',
    },
    confirmbtn: {
      "& span": {
        textTransform: 'capitalize',
      },
      padding: '13px 12px',
    },
    dropzonecontent: {
      "& Svg": {
        height: '50px',
        left: '0',
        margin: '0px auto',
        position: 'absolute',
        right: '0',
        top: '95px',
        width: '80px',
      },
      "& path": {
        fill: '#a1a1a1',
      },
      "&:focus": {
        outline: 'none',
      },
      cursor: 'pointer',
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      minHeight: '180px',
      padding: " 2rem 0",
      position: 'relative',
    },
    employeaccessinput: {
      paddingTop: '30px',
    },
    employeecard: {
      backgroundColor: '#fff',
    },
    filepreview: {
      "& img": {
        borderRadius: '5px',
        height: '100px',
        width: '100px',
      },
      backgroundColor: '#695ccd',
      borderRadius: '5px',
      height: '100px',
      width: '100px',
    },
    fileupload: {
      marginTop: '30px',
    },
    fileuploadcont: {
      "& section": {
        "&:focus": {
          outline: 'none',
        },
      },
      backgroundColor: '#eaeaea',
      border: '1px dashed #707070',
      borderRadius: '7px',
    },
    icon: {
      "& path": {
        fill: theme.palette.primary.main,
      }
    },
    imgbox: {
      "& svg": {
        height: '100%',
        marginTop: '-2px',
        width: '100%',
      },
      display: 'flex',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      width: '100%',
    },
    inputbox: {
      "& label": {
        overflowX: 'visible',
      },
      "& svg": {
        "& path": {
          fill: 'red',
        },
        height: '25px',
        width: '34pt',
      },

      alignItems: 'center',
      display: 'flex',
    },
    latlngError: {
      color: "red",
      textAlign: "center",
    },
    listitem: {
      "& svg": {
        cursor: 'pointer',
        left: '-45px',
        position: 'absolute',
        top: '4px',
      },
      position: 'relative',
      textAlign: 'center',
    },
    listtext: {
      color: '#000',
      fontSize: '20px',
    },
    modalfooter: {
      backgroundColor: '#fafafa',
      borderTop: 'none',
      paddingTop: '40px',
    },
    mycard: {
      borderRadius: '10px',
      padding: '0',
      position: 'relative',
      width: '32%',
      // height: '100vh',
    },
    mylist: {
      listStyleType: 'none',
      marginBottom: '40px',
    },
    selectinput: {
      border: 'none',
    },
    selectpoint: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
    },
    selectpointcontent: {
      backgroundColor: '#fff',
      borderRadius: '4px',
      padding: '10px 15px',
      width: '49%',
    },
    selectpointheading: {
      marginBottom: '30px',
      marginTop: '30px',
    },
    selectpointinput: {
      "& label": {
        overflowX: 'visible',
      },
    },
    selectpointinputgroup: {
      marginTop: '20px',
    },
    selectpointlist: {
      '& h4': {
        margin: '0px !important',
      },
      "& li": {
        fontSize: '11px',
        paddingRight: '80px',
        position: 'relative',
      },
      "& svg": {
        position: 'absolute',
        right: '2px',
        top: '-19px',
        width: '65px',
      },
      cursor: "pointer",
      listStyleType: 'none',
      marginTop: '0px',
      paddingLeft: '0px',
    },
    sendbtn: {
      padding: '13px 30px',
      textTransform: 'capitalize',
    },
    skipbtn: {
      "& span": {
        color: '#000',
      },
      "&:hover": {
        backgroundColor: '#fff !important',
      },
      backgroundColor: '#fff',
      border: '1px solid #f3f3f3',

      padding: '13px 30px',
      textTransform: 'capitalize',
    },
    thanksmodallist: {
      textAlign: 'center',
    },
    thanksmodaltext: {
      "& p": {
        marginTop: '20px',
        textAlign: 'center',
      }
    },
    uploadtext: {
      color: '#000',
      fontSize: '16px',
      margin: '0px',
      padding: '15px 0px',
      textAlign: 'center',
      width: '100%',
    },
  }),

  { name: "HomePage" }
);

function createChoices(intl: IntlShape): RadioGroupFieldChoice[] {
  return [
    {
      label: intl.formatMessage({
        defaultMessage: "Yes",
        description: "yes"
      }),
      value: "Yes"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "I have an online store",
        description: "I have an online store"
      }),
      value: "Online"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Not now",
        description: "Not now"
      }),
      value: "No"
    }
  ];
}
export interface HomePageProps extends UserPermissionProps {
  activities: Home_activities_edges_node[];
  orders: number;
  businessNames: any;
  ordersToCapture: number;
  ordersToFulfill: number;
  productsOutOfStock: number;
  sales: Home_salesToday_gross;
  topProducts: Home_productTopToday_edges_node[];
  userName: string;
  disabled?: boolean;
  confirmButtonState: ConfirmButtonTransitionState;
  // errors: FormErrors<keyof AddressTypeInput>;
  onOrdersToCaptureClick: () => void;
  onOrdersToFulfillClick: () => void;
  onProductClick: (productId: string, variantId: string) => void;
  onProductsOutOfStockClick: () => void;
}

const HomePage: React.FC<HomePageProps> = props => {
  const {
    userName,
    confirmButtonState,
    disabled,
    businessNames,
    orders,
    sales,
    topProducts,
    onProductClick,
    activities,
    onOrdersToCaptureClick,
    onOrdersToFulfillClick,
    onProductsOutOfStockClick,
    ordersToCapture,
    ordersToFulfill,
    productsOutOfStock,
    userPermissions
  } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const [openClaimBusinessModal, setOpenClaimBusinessModal] = React.useState(false);
  const [claimBusinessModal, setClaimBusinessModal] = React.useState(false);
  const [claimBusinessThanksModal, setClaimBusinessThanksModal] = React.useState(false);
  const [openClaimBusinessThanksModal, setOpenClaimBusinessThanksModal] = React.useState(false);
  const [employeeAccessModal, setEmployeeAccessModal] = React.useState(false);
  const [openEmployeeAccessModal, setOpenEmployeeAccessModal] = React.useState(false);
  const [employeeAccessThanksModal, setEmployeeAccessThanksModal] = React.useState(false);
  const [openEmployeeAccessThanksModal, setOpenEmployeeAccessThanksModal] = React.useState(false);
  const [addBusinessModal, setAddBusinessModal] = React.useState(false);
  const [chooseLocationModal, setChooseLocationModal] = React.useState(false);
  const [openChooseLocationModal, setOpenChooseLocationModal] = React.useState(false);
  const [allDoneModal, setAllDoneModal] = React.useState(false);
  const [openAllDoneModal, setOpenAllDoneModal] = React.useState(false);
  const [addAddressModal, setAddAddressModal] = React.useState(false);
  const [openAddAddressModal, setOpenAddAddressModal] = React.useState(false);
  const [importInformationModal, setImportInformationModal] = React.useState(false);
  const [openImportInformationModal, setOpenImportInformationModal] = React.useState(false);
  const [openAddBusinessModal, setOpenAddBusinessModal] = React.useState(false);
  const [chooseCategoryModal, setChooseCategoryModal] = React.useState(false);
  const [openChooseCategoryModal, setOpenChooseCategoryModal] = React.useState(false);
  const [addInformationModal, setAddInformationModal] = React.useState(false);
  const [openAddInformationModal, setOpenAddInformationModal] = React.useState(false);
  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [logo, setLogo] = React.useState<any>();
  const [logoFile, setLogoFile] = React.useState<any>();
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => "", "")
  );
  // const onClose = () => setOpen(false);
  // const onClaimBusinessClaimClose = () => setClaimBusinessModal(false);
  // const onClaimBusinessClaimThanksClose = () => setClaimBusinessThanksModal(false);
  // const onEmployeeAccessClose = () => setOpenEmployeeAccessModal(false);
  // const onEmployeeAccessThanksModalClose = () => setEmployeeAccessThanksModal(false);
  const [employeeAccessEmailError, setEmployeeAccessEmailError] = React.useState([]);
  const [createBusinessNameError, setCreateBusinessNameError] = React.useState([]);
  const [izettleAccessTokenError, setIzettleAccessTokenError] = React.useState([]);
  const [squareAccessTokenError, setSquareAccessTokenError] = React.useState([]);
  const [shopifyAccessTokenError, setShopifyAccessTokenError] = React.useState([]);
  const [vendAccessTokenError, setVendAccessTokenError] = React.useState([]);
  const [shopifyURLError, setShopifyURLError] = React.useState([]);
  const [vendURLError, setVendURLError] = React.useState([]);
  const [businessID, setBusinessID] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [businessDescription, setBusinessDescription] = React.useState("");
  const [businesscategory, setBusinessCategory] = React.useState("");
  const [facebookURL, setFacebookURL] = React.useState("");
  const [phoneNumber, setPhone] = React.useState("");
  const [instagramURL, setInstagramURL] = React.useState("");
  const [twitterURL, setTwitterURL] = React.useState("");
  const [websiteURL, setWebsiteURL] = React.useState("");
  const [izettle, setIzettle] = React.useState(false);
  const [square, setSquare] = React.useState(false);
  const [shopify, setShopify] = React.useState(false);
  const [vend, setVend] = React.useState(false);
  const [skip, setSkip] = React.useState(false);
  const [addressModal, setAddressModal] = React.useState(false);
  const [typeOf, setType] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [websiteURLError, setWebsiteURLError] = React.useState<any>();
  const [phoneError, setPhoneError] = React.useState<any>();
  const [facebookURLError, setFacebookURLError] = React.useState<any>();
  const [instagramURLError, setInstagramURLError] = React.useState<any>();
  const [twitterURLError, setTwitterURLError] = React.useState<any>();
  const [storeID, setStoreID] = React.useState("");
  // const [getLocation, setGetLocation] = React.useState("");
  const [latlngError, setlatLngError] = React.useState("");
  const [latLngLoading, setlatLngLoading] = React.useState(false);
  const intl = useIntl();
  const { logout, user, verifyToken } = useUser();
  const choices = createChoices(intl);
  const initialForm: any = {
    address: maybe(() => "", ""),
    business: maybe(() => "", ""),
    businessCategory: maybe(() => "", ""),
    businessName: maybe(() => "", ""),
    city: maybe(() => "", ""),
    country: maybe(() => "", ""),
    description: maybe(() => "", ""),
    email: maybe(() => "", ""),
    facebook: maybe(() => "", ""),
    instagram: maybe(() => "", ""),
    izettleAccessToken: maybe(() => "", ""),
    phone: maybe(() => "", ""),
    postcode: maybe(() => "", ""),
    shopifyAccessToken: maybe(() => "", ""),
    shopifyURL: maybe(() => "", ""),
    squareAccessToken: maybe(() => "", ""),
    twitter: maybe(() => "", ""),
    type: maybe(() => "", ""),
    vendAccessToken: maybe(() => "", ""),
    vendURL: maybe(() => "", ""),
    website: maybe(() => "", ""),
  };
  const token = getAuthToken();
  React.useEffect(() => {
    const businessNameArray = [];
    maybe(() => businessNames.map(name => {
      businessNameArray.push({ label: name.node.name, value: name.node.id })
    }))
    setBusinessNamesArray(businessNameArray)
  }, [businessNames])

  const onClaimBusinessCompleted = (data: ClaimBusiness) => {
    if (data.requestClaimBusiness.businessErrors.length === 0) {
      setClaimBusinessModal(false);
      setClaimBusinessThanksModal(true);
      setOpenClaimBusinessThanksModal(true);
    }
  };

  const onEmployeeAccessCompleted = (data: EmployeeAccess) => {
    setEmployeeAccessEmailError([])
    if (data.requestEmployeeAccess.businessErrors.length === 0) {
      setEmployeeAccessModal(false);
      setEmployeeAccessThanksModal(true);
      setOpenEmployeeAccessThanksModal(true);
    }
    else {
      setEmployeeAccessEmailError(data.requestEmployeeAccess.businessErrors.filter(item => item.field === "email"))
    }
  };

  const onCreateBusinessCompleted = (data: CreateBusiness) => {
    setCreateBusinessNameError([])
    if (data.businessCreate.businessErrors.length === 0) {
      setAddBusinessModal(false);
      setChooseCategoryModal(true);
      setOpenChooseCategoryModal(true);
      setBusinessID(data.businessCreate.business.id);
      setBusinessName(data.businessCreate.business.name);
      setBusinessDescription(data.businessCreate.business.description);
    }
    else {
      setCreateBusinessNameError(data.businessCreate.businessErrors.filter(item => item.field === "name"))
    }
  };

  const onCreateStoreCompleted = (data: CreateStore) => {
    if (data.storeCreate.errors.length === 0) {
      setStoreID(data.storeCreate.store.id);
      if (typeOf === "No") {
        setChooseLocationModal(false);
        setAllDoneModal(true);
        setOpenAllDoneModal(true);
      }
      else {
        setChooseLocationModal(false);
        setOpenImportInformationModal(true);
        setImportInformationModal(true);
      }
    }
  };

  const onCreateStoreWithAddressCompleted = (data: CreateStore) => {
    if (data.storeCreate.errors.length === 0) {
      setAddressModal(true);
      setAddAddressModal(false);
      setAllDoneModal(true);
      setOpenAllDoneModal(true);
    }
  };

  const onProductBulkCreateCompleted = (data: ProductBulkCreate) => {
    setIzettleAccessTokenError([]);
    setSquareAccessTokenError([]);
    setShopifyAccessTokenError([]);
    setShopifyURLError([]);
    setVendAccessTokenError([]);
    setVendURLError([]);
    if (data.productBulkCreate.productErrors.length === 0) {
      setImportInformationModal(false);
      setAllDoneModal(true);
      setOpenAllDoneModal(true);
      setShopify(false);
      setIzettle(false);
      setVend(false);
      setSquare(false);
    }
    else {
      if (platform === "IZETTLE") {
        setIzettleAccessTokenError(data.productBulkCreate.productErrors.filter(item => item.field === "accessToken"))
      }
      if (platform === "SQUAREUP") {
        setSquareAccessTokenError(data.productBulkCreate.productErrors.filter(item => item.field === "accessToken"))
      }
      if (platform === "SHOPIFY") {
        setShopifyAccessTokenError(data.productBulkCreate.productErrors.filter(item => item.field === "accessToken"))
        setShopifyURLError(data.productBulkCreate.productErrors.filter(item => item.field === "url"))
      }
      if (platform === "VENDHQ") {
        setVendAccessTokenError(data.productBulkCreate.productErrors.filter(item => item.field === "accessToken"))
        setVendURLError(data.productBulkCreate.productErrors.filter(item => item.field === "url"))
      }
    }
  };

  const onIzettleClicked = () => {
    if (izettle) {
      return setIzettle(false);
    }
    setSquareAccessTokenError([]);
    setShopifyAccessTokenError([]);
    setShopifyURLError([]);
    setVendAccessTokenError([]);
    setVendURLError([]);
    setPlatform("IZETTLE");
    setShopify(false);
    setSquare(false);
    setVend(false);
    setIzettle(true);
  };

  const onSquareClicked = () => {
    if (square) {
      return setSquare(false);
    }
    setIzettleAccessTokenError([]);
    setShopifyAccessTokenError([]);
    setShopifyURLError([]);
    setVendAccessTokenError([]);
    setVendURLError([]);
    setPlatform("SQUAREUP");
    setShopify(false);
    setIzettle(false);
    setVend(false);
    setSquare(true);
  };

  const onShopifyClicked = () => {
    if (shopify) {
      return setShopify(false);
    }
    setIzettleAccessTokenError([]);
    setSquareAccessTokenError([]);
    setVendAccessTokenError([]);
    setVendURLError([]);
    setPlatform("SHOPIFY");
    setIzettle(false);
    setVend(false);
    setSquare(false);
    setShopify(true);
  };

  const onVendClicked = () => {
    if (vend) {
      return setVend(false);
    }
    setIzettleAccessTokenError([]);
    setSquareAccessTokenError([]);
    setShopifyAccessTokenError([]);
    setShopifyURLError([]);
    setPlatform("VENDHQ");
    setIzettle(false);
    setSquare(false);
    setShopify(false);
    setVend(true);
  };

  // const handleChange = address => {
  //   setGetLocation(address)
  // };

  // const handleSelect = (address) => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error));
  // };
  return (
    <Container>
      <HomeHeader userName={userName} />
      <CardSpacer />
      <Grid>
        <div>
          <RequirePermissions
            userPermissions={userPermissions}
            requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
          >
            <div className={classes.cardContainer}>
              <HomeAnalyticsCard
                title={"Sales"}
                icon={<Sales className={classes.icon} fontSize={"inherit"} viewBox="0 0 64 64" />}
              >
                {sales ? (
                  <Money money={sales} />
                ) : (
                    <Skeleton style={{ width: "5em" }} />
                  )}
              </HomeAnalyticsCard>
              <HomeAnalyticsCard
                title={"Orders"}
                icon={<Orders className={classes.icon} fontSize={"inherit"} viewBox="0 0 64 64" />}
              >
                {orders === undefined ? (
                  <Skeleton style={{ width: "5em" }} />
                ) : (
                    orders
                  )}
              </HomeAnalyticsCard>
            </div>
          </RequirePermissions>
          <HomeNotificationTable
            onOrdersToCaptureClick={onOrdersToCaptureClick}
            onOrdersToFulfillClick={onOrdersToFulfillClick}
            onProductsOutOfStockClick={onProductsOutOfStockClick}
            ordersToCapture={ordersToCapture}
            ordersToFulfill={ordersToFulfill}
            productsOutOfStock={productsOutOfStock}
            userPermissions={userPermissions}
          />
          <CardSpacer />
          <RequirePermissions
            userPermissions={userPermissions}
            requiredPermissions={[
              PermissionEnum.MANAGE_ORDERS,
              PermissionEnum.MANAGE_PRODUCTS
            ]}
          >
            <HomeProductListCard
              onRowClick={onProductClick}
              topProducts={topProducts}
            />
            <CardSpacer />
          </RequirePermissions>
        </div>
        <div>
          <RequirePermissions
            userPermissions={userPermissions}
            requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
          >
            <HomeActivityCard activities={activities} />
          </RequirePermissions>
        </div>
      </Grid>
      {user.businessUser.edges.length === 0 &&
        <Dialog
          // onClose={onClose}
          open={open}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              margin: '0px',
              overflow: 'hidden',
              overflowY: "visible",
              width: '80%',
            },
          }}
        >
          <DialogContent className={classes.cardshomepage}>
            <div className={classes.cards}>
              <div className={`${classes.claimcard} ${classes.mycard}`}>
                <h3 className={classes.cardhead}>Claim Business</h3>
                <div className={classes.imgbox}>
                  <SVG src={claimBusiness} />
                </div>
                <div className={classes.cardContent}>
                  <div className={classes.cardtext}>
                    <h4 className={classes.cardhead1}>Claim a business already on Sitarri</h4>
                    <p>If you own or manage a business that is already on Sitarri, click below to take control</p>
                  </div>
                  <Button className={classes.cardbtn} color="primary" variant="contained" onClick={() => { setClaimBusinessModal(true); setOpen(false); setOpenClaimBusinessModal(true) }}>
                    <span className={classes.btntext}>Claim Business</span>
                  </Button>
                </div>
              </div>
              <div className={`${classes.businesscard} ${classes.mycard}`}>
                <h3 className={classes.cardhead}>New Business</h3>
                <div className={classes.businessimgbox}>
                  <SVG src={employeeAccess} />
                </div>
                <div className={classes.cardContent}>
                  <div className={classes.cardtext}>
                    <h4 className={classes.cardhead1}>Add a business to Sitarri</h4>
                    <p>If you own or manage a business, click below to add it to Sitarri</p>
                  </div>
                  <Button className={classes.businessbtn} color="primary" variant="contained" onClick={() => { setAddBusinessModal(true); setOpenAddBusinessModal(true); setOpen(false) }}>
                    <span className={classes.cardbtntext}>Add Business</span>
                  </Button>
                </div>
              </div>
              <div className={`${classes.employeecard} ${classes.mycard}`}>
                <h3 className={classes.cardhead}>Employee Access</h3>
                <div className={classes.imgbox}>
                  <SVG src={newBusiness} />
                </div>
                <div className={classes.cardContent}>
                  <div className={classes.cardtext}>
                    <h4 className={classes.cardhead1}>Staff member of a business</h4>
                    <p>Request employee access to a business listed to Sitarri</p>
                  </div>
                  <Button className={`${classes.cardbtn}`} color="primary" variant="contained" onClick={() => { setEmployeeAccessModal(true); setOpen(false); setOpenEmployeeAccessModal(true) }}>
                    <span className={classes.btntext}>Make employee account</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      }

      {claimBusinessModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={onClaimBusinessClaimClose}
          open={openClaimBusinessModal}
        >
          <ClaimBusinessMutation onCompleted={onClaimBusinessCompleted}>
            {(requestClaimBusiness, requestClaimBusinessOpts) => (
              <>
                <Form initial={initialForm} onSubmit={input =>
                  requestClaimBusiness({
                    variables: {
                      input: {
                        business: input.business,
                        email: user.email,
                        redirectUrl: window.location.origin + "/#/",
                      }
                    }
                  })
                }>
                  {({ change, data, submit }) => {
                    const handleCountrySelect = createSingleAutocompleteSelectHandler(
                      change,
                      setCountryDisplayName,
                      businessNamesArray
                    );
                    return (
                      <>
                        <DialogContent className={classes.businessmodalcont}>
                          <div className={classes.businessmodal}>
                            <ul className={classes.mylist}>
                              <li className={classes.listitem}><span onClick={() => { setClaimBusinessModal(false); setOpen(true) }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What is the name of the business?</span></li>
                            </ul>
                            <div className={classes.inputbox}>
                              <SVG src={inputicon} />
                              <SingleAutocompleteSelectField
                                disabled={disabled}
                                displayValue={countryDisplayName}
                                label={intl.formatMessage({
                                  defaultMessage: "Business name"
                                })}
                                name="business"
                                onChange={handleCountrySelect}
                                value={data.business}
                                choices={businessNamesArray}
                                InputProps={{
                                  autoComplete: "off"
                                }}
                              />
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions className={classes.modalfooter}>
                          <ConfirmButton
                            transitionState={confirmButtonState}
                            color="primary"
                            variant="contained"
                            disabled={requestClaimBusinessOpts.loading || data.business === ""}
                            onClick={() => { submit() }}
                            className={classes.confirmbtn} >
                            <span>Manage Business</span>
                          </ConfirmButton>
                        </DialogActions>
                      </>
                    );
                  }}
                </Form>
              </>
            )}
          </ClaimBusinessMutation>
        </Dialog>
      )}

      {claimBusinessThanksModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={onClaimBusinessClaimThanksClose}
          open={openClaimBusinessThanksModal}
        >
          <DialogContent className={classes.businessmodalcont}>
            <div className={classes.businessmodal}>
              <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                <li className={classes.listitem}><span onClick={() => { setClaimBusinessThanksModal(false); setOpenClaimBusinessModal(true); setClaimBusinessModal(true); }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Thank You!!</span></li>
              </ul>
              <div className={classes.thanksmodaltext}>
                <p>We will review your request and notify you by email.<br />It can take up to two business days for approval</p>
              </div>
            </div>
          </DialogContent>
          <DialogActions className={classes.modalfooter}>
            <ConfirmButton
              transitionState={confirmButtonState}
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => { logout(); setClaimBusinessThanksModal(false) }}
              className={classes.confirmbtn}>
              <span>Back to login</span>
            </ConfirmButton>
          </DialogActions>
        </Dialog>
      )}

      {employeeAccessModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={onEmployeeAccessClose}
          open={openEmployeeAccessModal}
        >
          <EmployeeAccessMutation onCompleted={onEmployeeAccessCompleted}>
            {(requestEmployeeAccess, requestEmployeeAccessOpts) => (
              <>
                <Form initial={initialForm} onSubmit={input =>
                  requestEmployeeAccess({
                    variables: {
                      input: {
                        business: input.business,
                        email: input.email,
                        redirectUrl: window.location.origin + "/#/",
                      }
                    }
                  })
                }>
                  {({ change, data, submit }) => {
                    const handleCountrySelect = createSingleAutocompleteSelectHandler(
                      change,
                      setCountryDisplayName,
                      businessNamesArray
                    );
                    return (
                      <>
                        <DialogContent className={classes.businessmodalcont}>
                          <div className={classes.businessmodal}>
                            <ul className={classes.mylist}>
                              <li className={classes.listitem}><span onClick={() => { setEmployeeAccessEmailError([]); setEmployeeAccessModal(false); setOpen(true) }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What is the email address of the</span></li>
                            </ul>
                            <div className={classes.thanksmodaltext}>
                              <p>The business owner or manager will have to approve <br /> your access</p>
                            </div>
                            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                              <SVG src={inputicon} />
                              <SingleAutocompleteSelectField
                                disabled={disabled}
                                displayValue={countryDisplayName}
                                label={intl.formatMessage({
                                  defaultMessage: "Business name"
                                })}
                                name="business"
                                onChange={handleCountrySelect}
                                value={data.business}
                                choices={businessNamesArray}
                                InputProps={{
                                  autoComplete: "off"
                                }}
                              />
                            </div>
                            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                              <SVG src={email} />
                              <TextField
                                fullWidth
                                required
                                autoComplete="username"
                                error={maybe(() => employeeAccessEmailError[0].message)}
                                helperText={maybe(() => employeeAccessEmailError[0].message)}
                                label={intl.formatMessage(commonMessages.email)}
                                name="email"
                                onChange={change}
                                value={data.email}
                                inputProps={{
                                  "data-tc": "email"
                                }}
                              />
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions className={classes.modalfooter}>
                          <ConfirmButton
                            transitionState={confirmButtonState}
                            color="primary"
                            variant="contained"
                            disabled={requestEmployeeAccessOpts.loading || data.email === "" || data.business === ""}
                            onClick={() => { submit() }}
                            className={classes.sendbtn} >
                            <span>Send</span>
                          </ConfirmButton>
                        </DialogActions>
                      </>
                    );
                  }}
                </Form>
              </>
            )}
          </EmployeeAccessMutation>
        </Dialog>
      )}

      {employeeAccessThanksModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={onEmployeeAccessThanksModalClose}
          open={openEmployeeAccessThanksModal}
        >
          <DialogContent className={classes.businessmodalcont}>
            <div className={classes.businessmodal}>
              <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                <li className={classes.listitem}><span onClick={() => { setEmployeeAccessThanksModal(false); setOpenEmployeeAccessModal(true); setEmployeeAccessModal(true) }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Sent!!</span></li>
              </ul>
              <div className={classes.thanksmodaltext}>
                <p>We will notify you by email when you have been <br /> granted access</p>
              </div>
            </div>
          </DialogContent>
          <DialogActions className={classes.modalfooter}>
            <ConfirmButton
              transitionState={confirmButtonState}
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => { logout(); setEmployeeAccessThanksModal(false) }}
              className={classes.confirmbtn}>
              <span>Back to login</span>
            </ConfirmButton>
          </DialogActions>
        </Dialog>
      )}

      {addBusinessModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={() => setAddBusinessModal(false)}
          open={openAddBusinessModal}
        >
          <CreateBusinessMutation onCompleted={onCreateBusinessCompleted}>
            {(businessCreate, businessCreateOpts) => (
              <>
                <Form initial={initialForm} onSubmit={input =>
                  businessCreate({
                    variables: {
                      input: {
                        description: input.description,
                        name: input.businessName,
                      }
                    }
                  })
                }>
                  {({ change, data, submit }) => (
                    <>
                      <DialogContent className={classes.businessmodalcont}>
                        <div className={classes.businessmodal}>
                          <ul className={classes.mylist}>
                            <li className={classes.listitem}><span onClick={() => { setCreateBusinessNameError([]); setAddBusinessModal(false); setOpenAddBusinessModal(false); setOpen(true); }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What is the name of the business?</span></li>
                          </ul>
                          <div className={classes.inputbox}>
                            <SVG src={inputicon} />
                            <TextField
                              autoFocus
                              required
                              fullWidth
                              error={maybe(() => createBusinessNameError[0].message)}
                              helperText={maybe(() => createBusinessNameError[0].message)}
                              autoComplete="businessName"
                              label="Business Name"
                              name="businessName"
                              onChange={change}
                              value={data.businessName}
                              inputProps={{
                                "data-tc": "businessName"
                              }}
                            />
                          </div>
                          <div className={classes.businessmodaltextarea}>
                            <TextField
                              fullWidth
                              multiline
                              autoComplete="description"
                              label="Business Description"
                              name="description"
                              onChange={change}
                              value={data.description}
                              inputProps={{
                                "data-tc": "description"
                              }}
                            />
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.modalfooter}>
                        <ConfirmButton
                          transitionState={confirmButtonState}
                          color="primary"
                          disabled={businessCreateOpts.loading || data.businessName === ""}
                          variant="contained"
                          onClick={() => submit()}
                          className={classes.sendbtn} >
                          <span>Next</span>
                        </ConfirmButton>
                      </DialogActions>
                    </>
                  )}
                </Form>
              </>
            )}
          </CreateBusinessMutation>
        </Dialog>
      )}

      {chooseCategoryModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={() => setChooseCategoryModal(false)}
          open={openChooseCategoryModal}
        >
          <Form initial={initialForm}>
            {({ change, data }) => (
              <>
                <DialogContent className={classes.businessmodalcont}>
                  <div className={classes.businessmodal}>
                    <ul className={classes.mylist}>
                      <li className={classes.listitem}>
                        {/* <span onClick={() => { setChooseCategoryModal(false); setOpenChooseCategoryModal(false); setAddBusinessModal(true); }}>
                          <SVG className={classes.arrowlefticon} src={arrowleft} />
                        </span> */}
                        <span className={classes.listtext}>Choose the category that best</span></li>
                    </ul>
                    <div className={classes.thanksmodaltext}>
                      <p>This helps customer find you if they are looking for <br /> a business like yours</p>
                    </div>
                    <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                      <SVG src={search} />
                      <TextField
                        autoFocus
                        required
                        fullWidth
                        helperText="You can change or add more later"
                        autoComplete="username"
                        label="Business Category"
                        name="businessCategory"
                        onChange={change}
                        value={data.businessCategory}
                        inputProps={{
                          "data-tc": "businessCategory"
                        }}
                      />
                    </div>
                  </div>
                </DialogContent>
                <DialogActions className={classes.modalfooter}>
                  <ConfirmButton
                    transitionState={confirmButtonState}
                    color="primary"
                    variant="contained"
                    disabled={data.businessCategory === ""}
                    onClick={() => { setBusinessCategory(data.businessCategory); setChooseCategoryModal(false); setAddInformationModal(true); setOpenAddInformationModal(true) }}
                    className={classes.sendbtn} >
                    <span>Next</span>
                  </ConfirmButton>
                </DialogActions>
              </>
            )}
          </Form>
        </Dialog>
      )}

      {addInformationModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={() => setAddInformationModal(false)}
          open={openAddInformationModal}
        >
          <Form initial={initialForm}>
            {({ change, data }) => (
              <>
                <DialogContent className={classes.businessmodalcont}>
                  <div className={classes.businessmodal}>
                    <ul className={classes.mylist}>
                      <li className={classes.listitem}><span onClick={() => {
                        setWebsiteURLError("");
                        setFacebookURLError("");
                        setInstagramURLError("");
                        setTwitterURLError("");
                        setPhoneError("");
                        setLogo("");
                        setAddInformationModal(false);
                        setOpenAddInformationModal(false);
                        setChooseCategoryModal(true);
                      }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What information do you want to</span></li>
                    </ul>
                    <div className={classes.thanksmodaltext}>
                      <p>Help customers get in touch and recognise your<br /> business by including this info on your listing</p>
                    </div>
                    <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                      <SVG src={phone} />
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        autoComplete="phone"
                        label="Phone Number (+921234567890)"
                        name="phone"
                        error={phoneError}
                        helperText={phoneError}
                        type="tel"
                        onChange={change}
                        value={data.phone}
                        inputProps={{
                          "data-tc": "phone"
                        }}
                      />
                    </div>
                    <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                      <SVG src={globe} />
                      <TextField
                        fullWidth
                        autoComplete="website"
                        label="Website"
                        name="website"
                        error={websiteURLError}
                        helperText={websiteURLError}
                        type="url"
                        onChange={change}
                        value={data.website}
                        inputProps={{
                          "data-tc": "website"
                        }}
                      />
                    </div>
                    <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                      <SVG src={facebook} />
                      <TextField
                        fullWidth
                        autoComplete="facebook"
                        label="Facebook"
                        name="facebook"
                        error={facebookURLError}
                        helperText={facebookURLError}
                        type="url"
                        onChange={change}
                        value={data.facebook}
                        inputProps={{
                          "data-tc": "facebook"
                        }}
                      />
                    </div>
                    <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                      <SVG src={instagram} />
                      <TextField
                        fullWidth
                        autoComplete="instagram"
                        label="Instagram"
                        name="instagram"
                        error={instagramURLError}
                        helperText={instagramURLError}
                        type="url"
                        onChange={change}
                        value={data.instagram}
                        inputProps={{
                          "data-tc": "instagram"
                        }}
                      />
                    </div>
                    <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>
                      <SVG src={twitter} />
                      <TextField
                        fullWidth
                        autoComplete="twitter"
                        label="Twitter"
                        error={twitterURLError}
                        helperText={twitterURLError}
                        name="twitter"
                        type="url"
                        onChange={change}
                        value={data.twitter}
                        inputProps={{
                          "data-tc": "twitter"
                        }}
                      />
                    </div>
                    <div className={classes.fileupload}>
                      <p>Business Logo</p>
                      <div className={classes.fileuploadcont}>
                        <Dropzone accept="image/*" multiple={false} onDrop={acceptedFiles => {
                          if (acceptedFiles && acceptedFiles[0]) {
                            setLogoFile(acceptedFiles[0]);
                            const reader = new FileReader();
                            reader.onload = e => {
                              setLogo(e.target.result)
                            };
                            reader.readAsDataURL(acceptedFiles[0]);
                          }
                        }}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()} className={classes.dropzonecontent}>
                                <input {...getInputProps()} />

                                <p className={classes.uploadtext}>Drag and drop an image here or click</p>
                                <SVG src={uploadicon} />
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                    <div>
                      <p>Preview:</p>
                      <div className={classes.filepreview}>
                        {logo === "" ? "" : <img src={logo} />}
                      </div>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions className={classes.modalfooter}>
                  <ConfirmButton
                    transitionState={confirmButtonState}
                    color="primary"
                    disabled={data.phone === ""}
                    variant="contained"
                    onClick={() => {
                      // if (data.phone !== "" && !/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(data.phone)) {
                      //   setPhoneError("Invalid Phone Number.");
                      // }
                      if (isValidPhoneNumber(data.phone) === false) {
                        setPhoneError("Invalid Phone Number.");
                      }
                      else {
                        setPhoneError("");
                        if (data.website !== "" && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.website)) {
                          setWebsiteURLError("Invalid Website URL.");
                        }
                        else {
                          setWebsiteURLError("");
                          if (data.facebook !== "" && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.facebook)) {
                            setFacebookURLError("Invalid Facebook URL.");
                          }
                          else {
                            setFacebookURLError("");
                            if (data.instagram !== "" && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.instagram)) {
                              setInstagramURLError("Invalid Twitter URL.");
                            }
                            else {
                              setInstagramURLError("");
                              if (data.twitter !== "" && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.twitter)) {
                                setTwitterURLError("Invalid Instagram URL.");
                              }
                              else {
                                setTwitterURLError("");
                                setFacebookURL(data.facebook);
                                setInstagramURL(data.instagram);
                                setWebsiteURL(data.website);
                                setTwitterURL(data.twitter);
                                setPhone(data.phone);
                                setAddInformationModal(false);
                                setChooseLocationModal(true);
                                setOpenChooseLocationModal(true);
                              }
                            }
                          }
                        }
                      }
                    }}
                    className={classes.sendbtn} >
                    <span>Next</span>
                  </ConfirmButton>
                </DialogActions>
              </>
            )}
          </Form>
        </Dialog>
      )}

      {chooseLocationModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={() => setChooseLocationModal(false)}
          open={openChooseLocationModal}
        >
          <CreateStoreMutation onCompleted={onCreateStoreCompleted}>
            {(storeCreate, storeCreateOpts) => (
              <>
                <Form initial={initialForm} onSubmit={() =>
                  storeCreate({
                    variables: {
                      input: {
                        business: businessID,
                        category: businesscategory,
                        description: businessDescription,
                        facebookUrl: facebookURL,
                        instagramUrl: instagramURL,
                        logo: logoFile,
                        // maxPrice: 0,
                        // minPrice: 0,
                        name: businessName,
                        // rating: 4,
                        // totalReviews: 10,
                        phone: phoneNumber,
                        twitterUrl: twitterURL,
                        websiteUrl: websiteURL,
                      }
                    }
                  })
                }>
                  {({ change, data, submit }) => (
                    <>
                      <DialogContent className={classes.businessmodalcont}>
                        <div className={classes.businessmodal}>
                          <ul className={classes.mylist}>
                            <li className={classes.listitem}><span onClick={() => { setChooseLocationModal(false); setOpenChooseLocationModal(false); setAddInformationModal(true); }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Do you want to add a location</span></li>
                          </ul>
                          <div className={classes.thanksmodaltext}>
                            <p>This helps customer find you if they are looking for <br /> a business like yours</p>
                          </div>
                          <div className={classes.chooseoption}>
                            <RadioGroupField
                              choices={choices}
                              disabled={disabled}
                              name={"type" as keyof FormData}
                              value={data.type}
                              onChange={change}
                            />
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.modalfooter}>
                        <ConfirmButton
                          transitionState={confirmButtonState}
                          color="primary"
                          variant="contained"
                          disabled={storeCreateOpts.loading || data.type === ""}
                          onClick={() => {
                            setType(data.type);
                            if (data.type === "Online" || data.type === "No") {
                              submit();
                            }
                            else {
                              setChooseLocationModal(false);
                              setOpenAddAddressModal(true);
                              setAddAddressModal(true);
                            }
                          }}
                          className={classes.sendbtn} >
                          <span>Next</span>
                        </ConfirmButton>
                      </DialogActions>
                    </>
                  )}
                </Form>
              </>
            )}
          </CreateStoreMutation>
        </Dialog>
      )}

      {addAddressModal && (
        <TypedShopInfoQuery>
          {({ data }) => {
            const countryChoices = maybe(
              () =>
                data.shop.countries.map(country => ({
                  label: country.country,
                  value: country.code
                })),
              []
            );
            return (
              <Dialog
                maxWidth="sm"
                fullWidth
                // onClose={() => setAddAddressModal(false)}
                open={openAddAddressModal}
              >
                <CreateStoreMutation onCompleted={onCreateStoreWithAddressCompleted}>
                  {(storeCreate, storeCreateOpts) => (
                    <>
                      <Form initial={initialForm} onSubmit={input => {
                        setlatLngError("")
                        setlatLngLoading(true)
                        geocodeByAddress(input.address + "," + input.city + "," + countryDisplayName)
                          .then(results => getLatLng(results[0]))
                          .then(latLng => {
                            setlatLngLoading(false)
                            storeCreate({
                              variables: {
                                input: {
                                  address: {
                                    city: input.city,
                                    country: input.country,
                                    latitude: latLng.lat,
                                    longitude: latLng.lng,
                                    postalCode: input.postcode,
                                    streetAddress: input.address,
                                  },
                                  business: businessID,
                                  category: businesscategory,
                                  description: businessDescription,
                                  facebookUrl: facebookURL,
                                  instagramUrl: instagramURL,
                                  logo: logoFile,
                                  // maxPrice: 0,
                                  // minPrice: 0,
                                  name: businessName,
                                  // rating: 4,
                                  // totalReviews: 10,
                                  phone: phoneNumber,
                                  twitterUrl: twitterURL,
                                  websiteUrl: websiteURL,
                                }
                              }
                            })
                          })
                          .catch(error => {
                            setlatLngLoading(false)
                            setlatLngError(error)
                          })
                      }
                      }>
                        {({ change, data, submit }) => {
                          const handleCountrySelect = createSingleAutocompleteSelectHandler(
                            change,
                            setCountryDisplayName,
                            countryChoices
                          );
                          return (
                            <>
                              <DialogContent className={classes.businessmodalcont}>
                                <div className={classes.businessmodal}>
                                  <ul className={classes.mylist}>
                                    <li className={classes.listitem}><span onClick={() => { setlatLngError(""); setAddAddressModal(false); setOpenAddAddressModal(false); setChooseLocationModal(true); }}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What is the Address?</span></li>
                                  </ul>
                                  <div className={classes.inputbox}>
                                    <SVG src={location} />
                                    <SingleAutocompleteSelectField
                                      disabled={disabled}
                                      displayValue={countryDisplayName}
                                      label={intl.formatMessage({
                                        defaultMessage: "Country"
                                      })}
                                      name="country"
                                      onChange={handleCountrySelect}
                                      value={data.country}
                                      choices={countryChoices}
                                      InputProps={{
                                        autoComplete: "off"
                                      }}
                                    />
                                  </div>
                                  <div className={classes.businessmodaltextarea}>
                                    {/* <PlacesAutocomplete
                                    value={getLocation}
                                    onChange={handleChange}
                                    onSelect={handleSelect}
                                  >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                      <div> */}
                                    <TextField
                                      fullWidth
                                      multiline
                                      autoComplete="address"
                                      label="Street Address"
                                      name="address"
                                      onChange={change}
                                      value={data.address}
                                      inputProps={{
                                        "data-tc": "address"
                                      }}
                                    // {...getInputProps({
                                    //   className: 'location-search-input',
                                    //   // placeholder: 'Street Address',
                                    // })}
                                    />
                                    {/* <input
                                          {...getInputProps({
                                            className: 'location-search-input',
                                            placeholder: 'Street Address',
                                          })}
                                        /> */}
                                    {/* <div className="autocomplete-dropdown-container">
                                          {loading && <div>Loading...</div>}
                                          {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                              ? 'suggestion-item--active'
                                              : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                              <div
                                                {...getSuggestionItemProps(suggestion, {
                                                  className,
                                                  style,
                                                })}
                                              >
                                                <span>{suggestion.description}</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </PlacesAutocomplete> */}

                                  </div>
                                  <div className={classes.businessmodaltextarea}>
                                    <TextField
                                      fullWidth
                                      autoComplete="postcode"
                                      label="Postcode"
                                      name="postcode"
                                      onChange={change}
                                      value={data.postcode}
                                      inputProps={{
                                        "data-tc": "postcode"
                                      }}
                                    />
                                  </div>
                                  <div className={classes.businessmodaltextarea}>
                                    <TextField
                                      fullWidth
                                      autoComplete="city"
                                      label="Town/City"
                                      name="city"
                                      onChange={change}
                                      value={data.city}
                                      inputProps={{
                                        "data-tc": "city"
                                      }}
                                    />
                                  </div>
                                  {latlngError && <div className={classes.businessmodaltextarea}><p className={classes.latlngError}>Invalid Address.</p></div>}
                                </div>
                              </DialogContent>
                              <DialogActions className={classes.modalfooter}>
                                <ConfirmButton
                                  transitionState={confirmButtonState}
                                  color="primary"
                                  variant="contained"
                                  disabled={
                                    latLngLoading ||
                                    storeCreateOpts.loading ||
                                    data.country === "" ||
                                    data.address === "" ||
                                    data.postcode === "" ||
                                    data.city === ""
                                  }
                                  onClick={() => {
                                    submit();
                                  }}
                                  className={classes.sendbtn} >
                                  <span>Next</span>
                                </ConfirmButton>
                              </DialogActions>
                            </>
                          )
                        }}
                      </Form>
                    </>
                  )}
                </CreateStoreMutation>
              </Dialog>
            )
          }}
        </TypedShopInfoQuery>
      )}

      {allDoneModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={() => setAllDoneModal(false)}
          open={openAllDoneModal}
        >
          <DialogContent className={classes.businessmodalcont}>
            <div className={classes.businessmodal}>
              <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                <li className={classes.listitem}><span onClick={() => {
                  if (skip) {
                    setAllDoneModal(false);
                    setOpenAllDoneModal(false);
                    setImportInformationModal(true);
                  }
                  else if (addressModal) {
                    setAllDoneModal(false);
                    setOpenAllDoneModal(false);
                    setAddAddressModal(true);
                  }
                  else {
                    setAllDoneModal(false);
                    setOpenAllDoneModal(false);
                    setChooseLocationModal(true);
                  }
                }}>
                  <SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>All done!!!!</span></li>
              </ul>
              <div className={classes.thanksmodaltext}>
                <p>We've set your business listing, now you can use<br /> the dashboard to add products, photos and more to<br /> your listing</p>
              </div>
            </div>
          </DialogContent>
          <DialogActions className={classes.modalfooter}>
            <ConfirmButton
              transitionState={confirmButtonState}
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => { verifyToken(token); setAllDoneModal(false); setOpenAllDoneModal(false) }}
              className={classes.confirmbtn}>
              <span>Go to dashboard</span>
            </ConfirmButton>
          </DialogActions>
        </Dialog>
      )}

      {importInformationModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          // onClose={() => setImportInformationModal(false)}
          open={openImportInformationModal}
        >
          <ProductBulkCreateMutation onCompleted={onProductBulkCreateCompleted}>
            {(productBulkCreate, productBulkCreateOpts) => (
              <>
                <Form initial={initialForm} onSubmit={input =>
                  productBulkCreate({
                    variables: {
                      input: {
                        accessToken: platform === "IZETTLE" ? input.izettleAccessToken :
                          platform === "SQUAREUP" ? input.squareAccessToken :
                            platform === "SHOPIFY" ? input.shopifyAccessToken :
                              platform === "VENDHQ" ? input.vendAccessToken : "",
                        platform,
                        store: storeID,
                        url: platform === "SHOPIFY" ? input.shopifyURL :
                          platform === "VENDHQ" ? input.vendURL : "",
                      }
                    }
                  })
                }>
                  {({ change, data, submit }) => (
                    <>
                      <DialogContent className={classes.businessmodalcont}>
                        <div className={classes.businessmodal}>
                          <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                            <li className={classes.listitem}><span onClick={() => {
                              setIzettleAccessTokenError([]);
                              setSquareAccessTokenError([]);
                              setShopifyAccessTokenError([]);
                              setShopifyURLError([]);
                              setVendAccessTokenError([]);
                              setVendURLError([]);
                              setImportInformationModal(false);
                              setChooseLocationModal(true);
                              setOpenImportInformationModal(false);
                              setShopify(false);
                              setIzettle(false);
                              setVend(false);
                              setSquare(false);
                            }}>
                              <SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Import Business Information</span></li>
                          </ul>
                          <div className={classes.thanksmodaltext}>
                            <p>Integrate your point of sale system with Sittari to save time <br /> and keep your business information updated automatically</p>
                          </div>
                        </div>
                        <h3 className={classes.selectpointheading}>Select Your Point of Sale Provider</h3>
                        <div className={classes.selectpoint}>
                          <div className={classes.selectpointcontent}>
                            <ul className={classes.selectpointlist} onClick={onIzettleClicked}>
                              <h4>Izettle</h4>
                              <li>Leading payment and POS<br /> provider for small business<SVG src={saleimg1} /></li>
                            </ul>
                            {izettle &&
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="izettleAccessToken"
                                    label="Access Token"
                                    error={maybe(() => izettleAccessTokenError[0].message)}
                                    helperText={maybe(() => izettleAccessTokenError[0].message)}
                                    name="izettleAccessToken"
                                    onChange={change}
                                    value={data.izettleAccessToken}
                                    inputProps={{
                                      "data-tc": "izettleAccessToken"
                                    }}
                                  />
                                </div>
                              </div>
                            }
                          </div>
                          <div className={classes.selectpointcontent}>
                            <ul className={classes.selectpointlist} onClick={onSquareClicked}>
                              <h4>Square</h4>
                              <li>Leading payment and POS<br /> provider for small business<SVG src={saleimg2} /></li>
                            </ul>
                            {square &&
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="squareAccessToken"
                                    label="Access Token"
                                    error={maybe(() => squareAccessTokenError[0].message)}
                                    helperText={maybe(() => squareAccessTokenError[0].message)}
                                    name="squareAccessToken"
                                    onChange={change}
                                    value={data.squareAccessToken}
                                    inputProps={{
                                      "data-tc": "squareAccessToken"
                                    }}
                                  />
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                        <div className={classes.selectpoint}>
                          <div className={classes.selectpointcontent}>
                            <ul className={classes.selectpointlist} onClick={onShopifyClicked}>
                              <h4>Shopify</h4>
                              <li>Global e-commerce and POS company focused on retail<SVG src={saleimg3} /></li>
                            </ul>
                            {shopify &&
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="shopifyAccessToken"
                                    label="Access Token"
                                    error={maybe(() => shopifyAccessTokenError[0].message)}
                                    helperText={maybe(() => shopifyAccessTokenError[0].message)}
                                    name="shopifyAccessToken"
                                    onChange={change}
                                    value={data.shopifyAccessToken}
                                    inputProps={{
                                      "data-tc": "shopifyAccessToken"
                                    }}
                                  />
                                  <FormSpacer />
                                  <TextField
                                    fullWidth
                                    autoComplete="shopifyURL"
                                    label="URL"
                                    error={maybe(() => shopifyURLError[0].message)}
                                    helperText={maybe(() => shopifyURLError[0].message)}
                                    name="shopifyURL"
                                    onChange={change}
                                    value={data.shopifyURL}
                                    inputProps={{
                                      "data-tc": "shopifyURL"
                                    }}
                                  />
                                </div>
                              </div>
                            }
                          </div>
                          <div className={classes.selectpointcontent}>
                            <ul className={classes.selectpointlist} onClick={onVendClicked}>
                              <h4>Vend</h4>
                              <li>Cloud based e-commerce and ePOS provider<SVG src={saleimg4} /></li>
                            </ul>
                            {vend &&
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="vendAccessToken"
                                    label="Access Token"
                                    error={maybe(() => vendAccessTokenError[0].message)}
                                    helperText={maybe(() => vendAccessTokenError[0].message)}
                                    name="vendAccessToken"
                                    onChange={change}
                                    value={data.vendAccessToken}
                                    inputProps={{
                                      "data-tc": "vendAccessToken"
                                    }}
                                  />
                                  <FormSpacer />
                                  <TextField
                                    fullWidth
                                    autoComplete="vendURL"
                                    label="URL"
                                    error={maybe(() => vendURLError[0].message)}
                                    helperText={maybe(() => vendURLError[0].message)}
                                    name="vendURL"
                                    onChange={change}
                                    value={data.vendURL}
                                    inputProps={{
                                      "data-tc": "vendURL"
                                    }}
                                  />
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.modalfooter}>
                        <ConfirmButton
                          transitionState={confirmButtonState}
                          color="primary"
                          variant="contained"
                          disabled={
                            productBulkCreateOpts.loading ||
                            (!izettle || data.izettleAccessToken === "") &&
                            (!square || data.squareAccessToken === "") &&
                            (!shopify || data.shopifyAccessToken === "" || data.shopifyURL === "") &&
                            (!vend || data.vendAccessToken === "" || data.vendURL === "")
                          }
                          onClick={() => {
                            setIzettleAccessTokenError([]);
                            setSquareAccessTokenError([]);
                            setShopifyAccessTokenError([]);
                            setShopifyURLError([]);
                            setVendAccessTokenError([]);
                            setVendURLError([]);
                            submit();
                            setSkip(true);
                          }}
                          className={classes.sendbtn}>
                          <span>Next</span>
                        </ConfirmButton>
                        <ConfirmButton
                          transitionState={confirmButtonState}
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setSkip(true);
                            setShopify(false);
                            setIzettle(false);
                            setVend(false);
                            setSquare(false);
                            setImportInformationModal(false);
                            setAllDoneModal(true);
                            setOpenAllDoneModal(true);
                          }}
                          className={classes.skipbtn}>
                          <span>Skip for now</span>
                        </ConfirmButton>
                      </DialogActions>
                    </>
                  )}
                </Form>
              </>
            )}
          </ProductBulkCreateMutation>
        </Dialog>
      )}
    </Container>
  );
};
HomePage.displayName = "HomePage";
export default HomePage;
