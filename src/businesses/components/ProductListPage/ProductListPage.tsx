import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Dropzone from "react-dropzone";
import { FormattedMessage, useIntl } from "react-intl";
import SVG from "react-inlinesvg";

import arrowleft from "@assets/images/arrow-left.svg";
import closeIcon from "@assets/images/close.svg";
import inputicon from "@assets/images/inputicon.svg";
import search from "@assets/images/search.svg";
import globe from "@assets/images/globe.svg";
import facebook from "@assets/images/facebook.svg";
import instagram from "@assets/images/instagram.svg";
import NoImg from "@assets/images/noimg.svg";
import saleimg1 from "@assets/images/saleimg1.svg";
import saleimg2 from "@assets/images/saleimg2.svg";
import saleimg3 from "@assets/images/saleimg3.svg";
import saleimg4 from "@assets/images/saleimg4.svg";
import twitter from "@assets/images/twitter.svg";
import uploadicon from "@assets/images/uploadicon.svg";
import ConfirmButton from "@saleor/components/ConfirmButton";
import ColumnPicker, {
  ColumnPickerChoice
} from "@saleor/components/ColumnPicker";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import { FormSpacer } from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import useUser from "@saleor/hooks/useUser";
import { ProductListColumns } from "@saleor/config";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import {
  AvailableInGridAttributes_availableInGrid_edges_node,
  AvailableInGridAttributes_grid_edges_node
} from "@saleor/products/types/AvailableInGridAttributes";
import { ProductList_products_edges_node } from "@saleor/products/types/ProductList";
import {
  FetchMoreProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage
} from "@saleor/types";
import FilterBar from "@saleor/components/FilterBar";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { ProductListUrlQueryParams } from "../../urls";
import { ProductListUrlSortField } from "../../../products/urls";
import ProductList from "../ProductList";

import {
  CreateBusinessMutation,
  ProductBulkCreateMutation,
  // UpdateBusinessMutation
} from "../../../home/queries";

import { CreateBusiness } from "../../../home/types/CreateBusiness";
import { ProductBulkCreate } from "../../../home/types/ProductBulkCreate";
// import { UpdateBusiness } from "../../../home/types/UpdateBusiness";

import SingleAutocompleteSelectField from "../../../components/SingleAutocompleteSelectField";

import { getAuthToken } from "../../../auth/utils";
import {
  createFilterStructure,
  ProductFilterKeys,
  ProductListFilterOpts
} from "./filters";

export interface ProductListPageProps
  extends PageListProps<ProductListColumns>,
  ListActions,
  FilterPageProps<ProductFilterKeys, ProductListFilterOpts>,
  FetchMoreProps,
  SortPage<ProductListUrlSortField> {
  activeAttributeSortId: string;
  businessNames: any;
  availableInGridAttributes: AvailableInGridAttributes_availableInGrid_edges_node[];
  currencySymbol: string;
  gridAttributes: AvailableInGridAttributes_grid_edges_node[];
  totalGridAttributes: number;
  products: ProductList_products_edges_node[];
  paramsProps: ProductListUrlQueryParams;
}

const useStyles = makeStyles(
  theme => ({
    Facebook: {
      "& input": {
        paddingLeft: "103px !important"
      },
      "& label": {
        marginLeft: "91px !important",
        width: "initial",
      }
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
      left: "46px",
      padding: "20px 8px",
      position: "absolute",
      top: "31px",
      zIndex: 1
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
    Website: {
      "& input": {
        paddingLeft: "50px !important"
      },
      "& label": {
        marginLeft: "37px !important"
      }
    },
    arrowlefticon: {
      left: "0",
      position: "absolute"
    },
    btntext: {
      textTransform: "capitalize"
    },
    businessbtn: {
      "&:hover": {
        backgroundColor: "transparent",
        border: "1px solid #000"
      },
      backgroundColor: "#fff",
      border: "1px solid transparent",
      color: "#000",
      display: "block",
      marginTop: "0px",
      padding: "11.8px 10px",
      width: "100%"
    },
    businesscard: {
      backgroundImage: "Linear-gradient(#fe9725, #f65216)"
    },
    businessimgbox: {
      "& svg": {
        height: "100%",
        marginTop: "-2px",
        width: "100%"
      },
      display: "flex",
      justifyContent: "flex-end",
      overflow: "hidden"
    },
    businessinputbox: {
      "& div": {
        "& .MuiPaper-rounded": {
          position: 'relative'
        }
      },
      "& label": {
        overflowX: "visible"
      },
      "& svg": {
        "& path": {
          fill: "red"
        },
        height: "25px",
        width: "34pt"
      },

      alignItems: "flex-start",
      display: "flex"
    },
    businessmodal: {
      display: "block",
      margin: "0px auto",
      paddingTop: "30px;",
      width: "80%"
    },
    businessmodalcont: {
      backgroundColor: "#fafafa",
      // overflowY: 'hidden',
      paddingBottom: "30px"
    },
    businessmodaltextarea: {
      "& label": {
        overflowX: "visible"
      },
      marginLeft: "47px",
      marginTop: "30px",
      width: "89%"
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
      padding: "0 1rem 1rem",
      width: "100%"
    },
    cardbtn: {
      display: "block",
      padding: "13px 10px",
      width: "100%"
    },
    cardbtntext: {
      color: "#000",
      textTransform: "capitalize"
    },
    cardhead: {
      fontSize: "18px",
      fontWeight: 500,
      position: "absolute",
      textAlign: "center",
      top: "1rem",
      width: "100%"
    },
    cardhead1: {
      fontSize: "18px",
      fontWeight: 500,
      margin: "0.2rem 0"
    },
    cards: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    cardshomepage: {
      "::-webkit-scrollbar": {
        width: "4px"
      },
      padding: "0px !important"
    },
    cardtext: {
      height: "145px"
    },
    choosefile: {
      "& input": {
        backgroundColor: "#eaeaea",
        padding: "60px 0px !important"
      }
    },
    chooseoption: {
      margin: "0px auto",
      marginTop: "50px !important",
      width: "80%"
    },
    claimcard: {
      backgroundColor: "#fff"
    },
    closeicon: {
      "& svg": {
        "& path": {
          fill: "black",
        },
      },
      cursor: "pointer",
      position: "absolute",
      right: "20px",
    },
    columnPicker: {
      marginRight: theme.spacing(3)
    },
    confirmbtn: {
      "& span": {
        textTransform: "capitalize"
      },
      padding: "13px 12px"
    },
    dropzonecontent: {
      "& Svg": {
        height: "50px",
        left: "0",
        margin: "0px auto",
        position: "absolute",
        right: "0",
        top: "95px",
        width: "80px"
      },
      "& path": {
        fill: "#a1a1a1"
      },
      "&:focus": {
        outline: "none"
      },
      cursor: "pointer",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      minHeight: "180px",
      padding: " 2rem 0",
      position: "relative"
    },
    employeaccessinput: {
      paddingTop: "30px"
    },
    employeecard: {
      backgroundColor: "#fff"
    },
    filepreview: {
      "& img": {
        borderRadius: "5px",
        height: "100px",
        width: "100px"
      },
      // backgroundColor: "#695ccd",
      borderRadius: "5px",
      height: "100px",
      width: "100px"
    },
    fileupload: {
      marginTop: "30px"
    },
    fileuploadcont: {
      "& section": {
        "&:focus": {
          outline: "none"
        }
      },
      backgroundColor: "#eaeaea",
      border: "1px dashed #707070",
      borderRadius: "7px"
    },
    icon: {
      "& path": {
        fill: theme.palette.primary.main
      }
    },
    imgbox: {
      "& svg": {
        height: "100%",
        marginTop: "-2px",
        width: "100%"
      },
      display: "flex",
      justifyContent: "flex-start",
      overflow: "hidden",
      width: "100%"
    },
    inputbox: {
      "& label": {
        overflowX: "visible"
      },
      "& svg": {
        "& path": {
          fill: "red"
        },
        height: "25px",
        width: "34pt"
      },

      alignItems: "center",
      display: "flex"
    },
    // latlngError: {
    //   color: "red",
    //   textAlign: "center"
    // },
    listitem: {
      "& svg": {
        cursor: "pointer",
        left: "-45px",
        position: "absolute",
        top: "4px"
      },
      position: "relative",
      textAlign: "center"
    },
    listtext: {
      color: "#000",
      fontSize: "20px"
    },
    modalfooter: {
      backgroundColor: "#fafafa",
      borderTop: "none",
      paddingTop: "40px"
    },
    mycard: {
      borderRadius: "10px",
      padding: "0",
      position: "relative",
      width: "32%"
      // height: '100vh',
    },
    mylist: {
      listStyleType: "none",
      marginBottom: "40px"
    },
    selectinput: {
      border: "none"
    },
    selectpoint: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px"
    },
    selectpointcontent: {
      backgroundColor: "#fff",
      borderRadius: "4px",
      padding: "10px 15px",
      width: "49%"
    },
    selectpointheading: {
      marginBottom: "30px",
      marginTop: "30px"
    },
    selectpointinput: {
      "& label": {
        overflowX: "visible"
      }
    },
    selectpointinputgroup: {
      marginTop: "20px"
    },
    selectpointlist: {
      "& h4": {
        margin: "0px !important"
      },
      "& li": {
        fontSize: "11px",
        paddingRight: "80px",
        position: "relative"
      },
      "& svg": {
        position: "absolute",
        right: "2px",
        top: "-19px",
        width: "65px"
      },
      cursor: "pointer",
      listStyleType: "none",
      marginTop: "0px",
      paddingLeft: "0px"
    },
    sendbtn: {
      padding: "13px 30px",
      textTransform: "capitalize"
    },
    skipbtn: {
      "& span": {
        color: "#000"
      },
      "&:hover": {
        backgroundColor: "#fff !important"
      },
      backgroundColor: "#fff",
      border: "1px solid #f3f3f3",

      padding: "13px 30px",
      textTransform: "capitalize"
    },
    thanksmodallist: {
      textAlign: "center"
    },
    thanksmodaltext: {
      "& p": {
        marginTop: "20px",
        textAlign: "center"
      }
    },
    uploadtext: {
      color: "#000",
      fontSize: "16px",
      margin: "0px",
      padding: "15px 0px",
      textAlign: "center",
      width: "100%"
    },
  }),
  { name: "ProductListPage" }
);

export const ProductListPage: React.FC<ProductListPageProps> = props => {
  const {
    currencySymbol,
    currentTab,
    defaultSettings,
    gridAttributes,
    availableInGridAttributes,
    filterOpts,
    hasMore,
    paramsProps,
    businessNames,
    initialSearch,
    loading,
    settings,
    tabs,
    totalGridAttributes,
    onAdd,
    onAll,
    onFetchMore,
    onFilterChange,
    onSearchChange,
    onTabChange,
    onTabDelete,
    onTabSave,
    onUpdateListSettings,
    ...listProps
  } = props;
  const intl = useIntl();
  const classes = useStyles(props);
  const [addBusinessModal, setAddBusinessModal] = React.useState(false);
  const [openAddBusinessModal, setOpenAddBusinessModal] = React.useState(false);
  const [businessNamesArray, setBusinessNamesArray] = React.useState([]);
  const [chooseCategoryModal, setChooseCategoryModal] = React.useState(false);
  const [openChooseCategoryModal, setOpenChooseCategoryModal] = React.useState(false);
  const [businessName, setBusinessName] = React.useState("");
  const [createBusinessNameError, setCreateBusinessNameError] = React.useState([]);
  const [businesscategory, setBusinessCategory] = React.useState("");
  const [addInformationModal, setAddInformationModal] = React.useState(false);
  const [openAddInformationModal, setOpenAddInformationModal] = React.useState(false);
  const [logoFile, setLogoFile] = React.useState<any>();
  const [logo, setLogo] = React.useState<any>();
  const [openImportInformationModal, setOpenImportInformationModal] = React.useState(false);
  const [importInformationModal, setImportInformationModal] = React.useState(false);
  const [websiteURLError, setWebsiteURLError] = React.useState<any>();
  const [facebookURLError, setFacebookURLError] = React.useState<any>();
  const [instagramURLError, setInstagramURLError] = React.useState<any>();
  const [twitterURLError, setTwitterURLError] = React.useState<any>();
  const [allDoneModal, setAllDoneModal] = React.useState(false);
  const [openAllDoneModal, setOpenAllDoneModal] = React.useState(false);
  const [izettleAccessTokenError, setIzettleAccessTokenError] = React.useState([]);
  const [squareAccessTokenError, setSquareAccessTokenError] = React.useState([]);
  const [shopifyAccessTokenError, setShopifyAccessTokenError] = React.useState([]);
  const [vendAccessTokenError, setVendAccessTokenError] = React.useState([]);
  const [shopifyURLError, setShopifyURLError] = React.useState([]);
  const [vendURLError, setVendURLError] = React.useState([]);
  const [izettle, setIzettle] = React.useState(false);
  const [square, setSquare] = React.useState(false);
  const [shopify, setShopify] = React.useState(false);
  const [vend, setVend] = React.useState(false);
  const [platform, setPlatform] = React.useState("");
  const [businessID, setBusinessID] = React.useState("");

  const initialForm: any = {
    address: maybe(() => "", ""),
    business: maybe(() => "", ""),
    businessCategory: maybe(() => businesscategory, ""),
    businessName: maybe(() => businessName, ""),
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
    website: maybe(() => "", "")
  };

  React.useEffect(() => {
    const businessNameArray = [];
    maybe(() =>
      businessNames.map(name => {
        businessNameArray.push({ label: name.node.name, value: name.node.id });
      })
    );
    setBusinessNamesArray(businessNameArray);
  }, [businessNames]);

  const { user, verifyTokenAndSetData } = useUser();
  const token = getAuthToken();
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
    maybe(() => "", "")
  );

  const onCreateBusinessCompleted = (data: CreateBusiness) => {
    setCreateBusinessNameError([]);
    if (data.businessCreate.businessErrors.length === 0) {
      setAddInformationModal(false);
      setOpenAddInformationModal(false);
      setOpenImportInformationModal(true);
      setImportInformationModal(true);
      // setAddBusinessModal(false);
      // setChooseCategoryModal(true);
      // setOpenChooseCategoryModal(true);
      setBusinessID(data.businessCreate.business.id);
      // setBusinessName(data.businessCreate.business.name);
      // setBusinessDescription(data.businessCreate.business.description);
    } else {
      setCreateBusinessNameError(
        data.businessCreate.businessErrors.filter(item => item.field === "name")
      );
      setAddInformationModal(false);
      setOpenAddInformationModal(false);
      setAddBusinessModal(true);
      setOpenAddBusinessModal(true);
    }
  };
  // const onUpdateBusinessCompleted = (data: UpdateBusiness) => {
  //   if (data.businessUpdate.businessErrors.length === 0) {
  //     setAddInformationModal(false);
  //     setOpenAddInformationModal(false);
  //     setOpenImportInformationModal(true);
  //     setImportInformationModal(true);
  //   }
  // };
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
    } else {
      if (platform === "IZETTLE") {
        setIzettleAccessTokenError(
          data.productBulkCreate.productErrors.filter(
            item => item.field === "accessToken"
          )
        );
      }
      if (platform === "SQUAREUP") {
        setSquareAccessTokenError(
          data.productBulkCreate.productErrors.filter(
            item => item.field === "accessToken"
          )
        );
      }
      if (platform === "SHOPIFY") {
        setShopifyAccessTokenError(
          data.productBulkCreate.productErrors.filter(
            item => item.field === "accessToken"
          )
        );
        setShopifyURLError(
          data.productBulkCreate.productErrors.filter(
            item => item.field === "url"
          )
        );
      }
      if (platform === "VENDHQ") {
        setVendAccessTokenError(
          data.productBulkCreate.productErrors.filter(
            item => item.field === "accessToken"
          )
        );
        setVendURLError(
          data.productBulkCreate.productErrors.filter(
            item => item.field === "url"
          )
        );
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
  const handleSave = (columns: ProductListColumns[]) =>
    onUpdateListSettings("columns", columns);

  const filterStructure = createFilterStructure(intl, filterOpts);

  const columns: ColumnPickerChoice[] = [
    {
      label: intl.formatMessage({
        defaultMessage: "Status",
        description: "product status"
      }),
      value: "isPublished" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Business Owner",
        description: "product price"
      }),
      value: "price" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Website",
        description: "product type"
      }),
      value: "productType" as ProductListColumns
    },
    ...availableInGridAttributes.map(attribute => ({
      label: attribute.name,
      value: `attribute:${attribute.id}`
    }))
  ];

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.businesses)}>
        <ColumnPicker
          className={classes.columnPicker}
          columns={columns}
          defaultColumns={defaultSettings.columns}
          hasMore={hasMore}
          loading={loading}
          initialColumns={settings.columns}
          total={
            columns.length -
            availableInGridAttributes.length +
            totalGridAttributes
          }
          onFetchMore={onFetchMore}
          onSave={handleSave}
        />
        <Button
          onClick={() => {
            setAddBusinessModal(true);
            setOpenAddBusinessModal(true);
          }}
          color="primary"
          variant="contained"
          data-tc="add-product"
        >
          <FormattedMessage
            defaultMessage="Create Business"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          tabs={tabs}
          allTabLabel={intl.formatMessage({
            defaultMessage: "Businesses",
            description: "tab name"
          })}
          filterStructure={filterStructure}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Businesses..."
          })}
        />
        <ProductList
          {...listProps}
          params={paramsProps}
          gridAttributes={gridAttributes}
          settings={settings}
          onUpdateListSettings={onUpdateListSettings}
        />
      </Card>
      {addBusinessModal && (
        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={() => setAddBusinessModal(false)}
          open={openAddBusinessModal}
        >
          {/* <CreateBusinessMutation onCompleted={onCreateBusinessCompleted}>
            {(businessCreate, businessCreateOpts) => (
              <> */}
          <Form
            initial={initialForm}
          // onSubmit={input =>
          //   businessCreate({
          //     variables: {
          //       input: {
          //         // description: input.description,
          //         name: input.businessName
          //       }
          //     }
          //   })
          // }
          >
            {({ change, data }) => (
              <>
                <DialogContent className={classes.businessmodalcont}>
                  <span onClick={() => setAddBusinessModal(false)}>
                    <SVG
                      className={classes.closeicon}
                      src={closeIcon}
                    />
                  </span>
                  <div className={classes.businessmodal}>
                    <ul className={classes.mylist}>
                      <li className={classes.listitem}>
                        <span
                        // onClick={() => {
                        //     setCreateBusinessNameError([]);
                        //     setAddBusinessModal(false);
                        //     setOpenAddBusinessModal(false);
                        //     setOpen(true);
                        // }}
                        >
                          {/* <SVG
                                                                    className={classes.arrowlefticon}
                                                                    src={arrowleft}
                                                                /> */}
                        </span>
                        <span className={classes.listtext}>
                          What is the name of the business?
                                                            </span>
                      </li>
                    </ul>
                    <div className={classes.inputbox}>
                      <SVG src={inputicon} />
                      <TextField
                        autoFocus
                        required
                        fullWidth
                        error={maybe(
                          () => createBusinessNameError[0].message
                        )}
                        helperText={maybe(
                          () => createBusinessNameError[0].message
                        )}
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
                    {/* <div className={classes.businessmodaltextarea}>
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
                          </div> */}
                  </div>
                </DialogContent>
                <DialogActions className={classes.modalfooter}>
                  <ConfirmButton
                    transitionState={maybe(() => null)}
                    color="primary"
                    disabled={
                      // businessCreateOpts.loading ||
                      data.businessName === ""
                    }
                    variant="contained"
                    onClick={() => {
                      setBusinessName(data.businessName);
                      setAddBusinessModal(false);
                      setChooseCategoryModal(true);
                      setOpenChooseCategoryModal(true);
                      // submit()
                    }}
                    className={classes.sendbtn}
                  >
                    <span>Next</span>
                  </ConfirmButton>
                </DialogActions>
              </>
            )}
          </Form>
          {/* </>
            )}
          </CreateBusinessMutation> */}
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
            {({ change, data }) => {
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
                        <li className={classes.listitem}>
                          <span onClick={() => {
                            // if (user.businessUser.edges.length === 0) {
                            setAddBusinessModal(true);
                            setOpenAddBusinessModal(true);
                            setChooseCategoryModal(false);
                            setOpenChooseCategoryModal(false);
                            // } else {
                            //     setChooseCategoryModal(false);
                            //     setOpenChooseCategoryModal(false);
                            // }
                          }}>
                            <SVG className={classes.arrowlefticon} src={arrowleft} />
                          </span>
                          <span className={classes.listtext}>
                            Choose the category that best
                                                    </span>
                        </li>
                      </ul>
                      <div className={classes.thanksmodaltext}>
                        <p>
                          This helps customer find you if they are looking for{" "}
                          <br /> a business like yours
                                                </p>
                      </div>
                      <div
                        className={`${classes.businessinputbox} ${classes.employeaccessinput}`}
                      >
                        <SVG src={search} style={{ marginTop: '0.8rem' }} />
                        <SingleAutocompleteSelectField
                          disabled={false}
                          displayValue={countryDisplayName}
                          label={intl.formatMessage({
                            defaultMessage: "Business Category"
                          })}
                          name="businessCategory"
                          onChange={handleCountrySelect}
                          value={data.businessCategory}
                          helperText="You can change or add more later"
                          choices={businessNamesArray}
                          InputProps={{
                            inputProps: {
                              autocomplete: "plsdontautocomplete" // Somehow it shuts it down
                            }
                          }}
                        />
                        {/* <TextField
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
                      /> */}
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions className={classes.modalfooter}>
                    <ConfirmButton
                      transitionState={maybe(() => null)}
                      color="primary"
                      variant="contained"
                      disabled={data.businessCategory === ""}
                      onClick={() => {
                        setBusinessCategory(data.businessCategory);
                        setChooseCategoryModal(false);
                        setAddInformationModal(true);
                        setOpenAddInformationModal(true);
                      }}
                      className={classes.sendbtn}
                    >
                      <span>Next</span>
                    </ConfirmButton>
                  </DialogActions>
                </>
              )
            }}
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
          <CreateBusinessMutation onCompleted={onCreateBusinessCompleted}>
            {(businessCreate, businessCreateOpts) => (
              <>
                <Form initial={initialForm} onSubmit={input =>
                  businessCreate({
                    variables: {
                      input: {
                        // business: businessID,
                        businesscategory,
                        // description: businessDescription,
                        facebookUrl: input.facebook ? "https://www.facebook.com/" + input.facebook : "",
                        instagramUrl: input.instagram ? "https://www.instagram.com/" + input.instagram : "",
                        isVerified: user.isSuperuser ? true : false,
                        logo: logoFile,
                        // maxPrice: 0,
                        // minPrice: 0,
                        name: businessName,
                        // rating: 4,
                        // totalReviews: 10,
                        // phone: phoneNumber,
                        twitterUrl: input.twitter ? "https://www.twitter.com/" + input.twitter : "",
                        websiteUrl: input.website ? "https://www." + input.website : "",
                      }
                    }
                  })
                }>
                  {({ change, data, submit }) => (
                    <>
                      <DialogContent className={classes.businessmodalcont}>
                        <div className={classes.businessmodal}>
                          <ul className={classes.mylist}>
                            <li className={classes.listitem}>
                              <span
                                onClick={() => {
                                  setWebsiteURLError("");
                                  setFacebookURLError("");
                                  setInstagramURLError("");
                                  setTwitterURLError("");
                                  // setPhoneError("");
                                  setLogo("");
                                  setAddInformationModal(false);
                                  setOpenAddInformationModal(false);
                                  setChooseCategoryModal(true);
                                }}
                              >
                                <SVG
                                  className={classes.arrowlefticon}
                                  src={arrowleft}
                                />
                              </span>
                              <span className={classes.listtext}>
                                What information do you want to
                        </span>
                            </li>
                          </ul>
                          <div className={classes.thanksmodaltext}>
                            <p>
                              Help customers get in touch and recognise your
                        <br /> business by including this info on your listing
                      </p>
                          </div>
                          {/* <div
                      className={`${classes.inputbox} ${classes.employeaccessinput}`}
                    >
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
                    </div> */}
                          <div className={classes.InputPrepend}>
                            <div className={classes.PrependText}>www.</div>
                            <div
                              className={`${classes.inputbox} ${classes.employeaccessinput}`}
                            >
                              <SVG src={globe} />
                              <TextField
                                className={classes.Website}
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
                          </div>
                          <div className={classes.InputPrepend}>
                            <div className={classes.PrependText}>www.facebook.com/</div>
                            <div
                              className={`${classes.inputbox} ${classes.employeaccessinput}`}
                            >
                              <SVG src={facebook} />
                              <TextField
                                className={classes.Facebook}
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
                          </div>
                          <div className={classes.InputPrepend}>
                            <div className={classes.PrependText}>www.instagram.com/</div>
                            <div
                              className={`${classes.inputbox} ${classes.employeaccessinput}`}
                            >
                              <SVG src={instagram} />
                              <TextField
                                className={classes.Instagram}
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
                          </div>
                          <div className={classes.InputPrepend}>
                            <div className={classes.PrependText}>www.twitter.com/</div>
                            <div
                              className={`${classes.inputbox} ${classes.employeaccessinput}`}
                            >
                              <SVG src={twitter} />
                              <TextField
                                className={classes.Twitter}
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
                          </div>
                          <div className={classes.fileupload}>
                            <p>Business Logo</p>
                            <div className={classes.fileuploadcont}>
                              <Dropzone
                                accept="image/*"
                                multiple={false}
                                onDrop={acceptedFiles => {
                                  if (acceptedFiles && acceptedFiles[0]) {
                                    setLogoFile(acceptedFiles[0]);
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
                                      className={classes.dropzonecontent}
                                    >
                                      <input {...getInputProps()} />

                                      <p className={classes.uploadtext}>
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
                            <div className={classes.filepreview}>
                              {logo === "" || logo === undefined ? <img src={NoImg} /> : <img src={logo} />}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.modalfooter}>
                        <ConfirmButton
                          transitionState={maybe(() => null)}
                          color="primary"
                          // disabled={data.phone === ""}
                          disabled={businessCreateOpts.loading}
                          variant="contained"
                          onClick={() => {
                            // if (data.phone !== "" && !/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(data.phone)) {
                            //   setPhoneError("Invalid Phone Number.");
                            // }
                            // if (isValidPhoneNumber(data.phone) === false) {
                            //   setPhoneError("Invalid Phone Number.");
                            // } else {
                            //   setPhoneError("");
                            // if (
                            //   data.website !== "" &&
                            //   !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
                            //     data.website
                            //   )
                            // ) {
                            //   setWebsiteURLError("Invalid Website URL.");
                            // } else {
                            //   setWebsiteURLError("");
                            //   if (
                            //     data.facebook !== "" &&
                            //     !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
                            //       data.facebook
                            //     )
                            //   ) {
                            //     setFacebookURLError("Invalid Facebook URL.");
                            //   } else {
                            //     setFacebookURLError("");
                            //     if (
                            //       data.instagram !== "" &&
                            //       !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
                            //         data.instagram
                            //       )
                            //     ) {
                            //       setInstagramURLError("Invalid Twitter URL.");
                            //     } else {
                            //       setInstagramURLError("");
                            //       if (
                            //         data.twitter !== "" &&
                            //         !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
                            //           data.twitter
                            //         )
                            //       ) {
                            //         setTwitterURLError("Invalid Instagram URL.");
                            //       } else {
                            //         setTwitterURLError("");
                            submit();
                            // setFacebookURL(data.facebook);
                            // setInstagramURL(data.instagram);
                            // setWebsiteURL(data.website);
                            // setTwitterURL(data.twitter);
                            // setPhone(data.phone);
                            // setAddInformationModal(false);
                            // setChooseLocationModal(true);
                            // setOpenChooseLocationModal(true);
                            //     }
                            //   }
                            // }
                            // }
                            // }
                          }}
                          className={classes.sendbtn}
                        >
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
                <li className={classes.listitem}>
                  <span
                    onClick={() => {
                      // if (skip) {
                      setAllDoneModal(false);
                      setOpenAllDoneModal(false);
                      setImportInformationModal(true);
                      // } else if (addressModal) {
                      //   setAllDoneModal(false);
                      //   setOpenAllDoneModal(false);
                      // setAddAddressModal(true);
                      // } else {
                      //   setAllDoneModal(false);
                      //   setOpenAllDoneModal(false);
                      //   // setChooseLocationModal(true);
                      // }
                    }}
                  >
                    <SVG className={classes.arrowlefticon} src={arrowleft} />
                  </span>
                  <span className={classes.listtext}>All done!!!!</span>
                </li>
              </ul>
              <div className={classes.thanksmodaltext}>
                <p>
                  We've set your business listing, now you can use
                  <br /> the dashboard to add products, photos and more to
                  <br /> your listing
                </p>
              </div>
            </div>
          </DialogContent>
          <DialogActions className={classes.modalfooter}>
            <ConfirmButton
              transitionState={maybe(() => null)}
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => { verifyTokenAndSetData(token); setAllDoneModal(false); setOpenAllDoneModal(false); window.location.reload() }}
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
                <Form
                  initial={initialForm}
                  onSubmit={input =>
                    productBulkCreate({
                      variables: {
                        input: {
                          accessToken:
                            platform === "IZETTLE"
                              ? input.izettleAccessToken
                              : platform === "SQUAREUP"
                                ? input.squareAccessToken
                                : platform === "SHOPIFY"
                                  ? input.shopifyAccessToken
                                  : platform === "VENDHQ"
                                    ? input.vendAccessToken
                                    : "",
                          platform,
                          store: businessID,
                          url:
                            platform === "SHOPIFY"
                              ? input.shopifyURL
                              : platform === "VENDHQ"
                                ? input.vendURL
                                : ""
                        }
                      }
                    })
                  }
                >
                  {({ change, data, submit }) => (
                    <>
                      <DialogContent className={classes.businessmodalcont}>
                        <div className={classes.businessmodal}>
                          <ul
                            className={`${classes.mylist} ${classes.thanksmodallist}`}
                          >
                            <li className={classes.listitem}>
                              <span
                                onClick={() => {
                                  setIzettleAccessTokenError([]);
                                  setSquareAccessTokenError([]);
                                  setShopifyAccessTokenError([]);
                                  setShopifyURLError([]);
                                  setVendAccessTokenError([]);
                                  setVendURLError([]);
                                  setImportInformationModal(false);
                                  // setChooseLocationModal(true);
                                  setAddInformationModal(true);
                                  setOpenAddInformationModal(true);
                                  setOpenImportInformationModal(false);
                                  setShopify(false);
                                  setIzettle(false);
                                  setVend(false);
                                  setSquare(false);
                                }}
                              >
                                <SVG
                                  className={classes.arrowlefticon}
                                  src={arrowleft}
                                />
                              </span>
                              <span className={classes.listtext}>
                                Import Business Information
                              </span>
                            </li>
                          </ul>
                          <div className={classes.thanksmodaltext}>
                            <p>
                              Integrate your point of sale system with Sittari
                              to save time <br /> and keep your business
                              information updated automatically
                            </p>
                          </div>
                        </div>
                        <h3 className={classes.selectpointheading}>
                          Select Your Point of Sale Provider
                        </h3>
                        <div className={classes.selectpoint}>
                          <div className={classes.selectpointcontent}>
                            <ul
                              className={classes.selectpointlist}
                              onClick={onIzettleClicked}
                            >
                              <h4>Izettle</h4>
                              <li>
                                Leading payment and POS
                                <br /> provider for small business
                                <SVG src={saleimg1} />
                              </li>
                            </ul>
                            {izettle && (
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="izettleAccessToken"
                                    label="Access Token"
                                    error={maybe(
                                      () => izettleAccessTokenError[0].message
                                    )}
                                    helperText={maybe(
                                      () => izettleAccessTokenError[0].message
                                    )}
                                    name="izettleAccessToken"
                                    onChange={change}
                                    value={data.izettleAccessToken}
                                    inputProps={{
                                      "data-tc": "izettleAccessToken"
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={classes.selectpointcontent}>
                            <ul
                              className={classes.selectpointlist}
                              onClick={onSquareClicked}
                            >
                              <h4>Square</h4>
                              <li>
                                Leading payment and POS
                                <br /> provider for small business
                                <SVG src={saleimg2} />
                              </li>
                            </ul>
                            {square && (
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="squareAccessToken"
                                    label="Access Token"
                                    error={maybe(
                                      () => squareAccessTokenError[0].message
                                    )}
                                    helperText={maybe(
                                      () => squareAccessTokenError[0].message
                                    )}
                                    name="squareAccessToken"
                                    onChange={change}
                                    value={data.squareAccessToken}
                                    inputProps={{
                                      "data-tc": "squareAccessToken"
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={classes.selectpoint}>
                          <div className={classes.selectpointcontent}>
                            <ul
                              className={classes.selectpointlist}
                              onClick={onShopifyClicked}
                            >
                              <h4>Shopify</h4>
                              <li>
                                Global e-commerce and POS company focused on
                                retail
                                <SVG src={saleimg3} />
                              </li>
                            </ul>
                            {shopify && (
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="shopifyAccessToken"
                                    label="Access Token"
                                    error={maybe(
                                      () => shopifyAccessTokenError[0].message
                                    )}
                                    helperText={maybe(
                                      () => shopifyAccessTokenError[0].message
                                    )}
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
                                    error={maybe(
                                      () => shopifyURLError[0].message
                                    )}
                                    helperText={maybe(
                                      () => shopifyURLError[0].message
                                    )}
                                    name="shopifyURL"
                                    onChange={change}
                                    value={data.shopifyURL}
                                    inputProps={{
                                      "data-tc": "shopifyURL"
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={classes.selectpointcontent}>
                            <ul
                              className={classes.selectpointlist}
                              onClick={onVendClicked}
                            >
                              <h4>Vend</h4>
                              <li>
                                Cloud based e-commerce and ePOS provider
                                <SVG src={saleimg4} />
                              </li>
                            </ul>
                            {vend && (
                              <div className={classes.selectpointinput}>
                                <div>
                                  <TextField
                                    fullWidth
                                    autoComplete="vendAccessToken"
                                    label="Access Token"
                                    error={maybe(
                                      () => vendAccessTokenError[0].message
                                    )}
                                    helperText={maybe(
                                      () => vendAccessTokenError[0].message
                                    )}
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
                                    helperText={maybe(
                                      () => vendURLError[0].message
                                    )}
                                    name="vendURL"
                                    onChange={change}
                                    value={data.vendURL}
                                    inputProps={{
                                      "data-tc": "vendURL"
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.modalfooter}>
                        <ConfirmButton
                          transitionState={maybe(() => null)}
                          color="primary"
                          variant="contained"
                          disabled={
                            productBulkCreateOpts.loading ||
                            ((!izettle || data.izettleAccessToken === "") &&
                              (!square || data.squareAccessToken === "") &&
                              (!shopify ||
                                data.shopifyAccessToken === "" ||
                                data.shopifyURL === "") &&
                              (!vend ||
                                data.vendAccessToken === "" ||
                                data.vendURL === ""))
                          }
                          onClick={() => {
                            setIzettleAccessTokenError([]);
                            setSquareAccessTokenError([]);
                            setShopifyAccessTokenError([]);
                            setShopifyURLError([]);
                            setVendAccessTokenError([]);
                            setVendURLError([]);
                            submit();
                            // setSkip(true);
                          }}
                          className={classes.sendbtn}
                        >
                          <span>Next</span>
                        </ConfirmButton>
                        <ConfirmButton
                          transitionState={maybe(() => null)}
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            // setSkip(true);
                            setShopify(false);
                            setIzettle(false);
                            setVend(false);
                            setSquare(false);
                            setImportInformationModal(false);
                            setAllDoneModal(true);
                            setOpenAllDoneModal(true);
                          }}
                          className={classes.skipbtn}
                        >
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
ProductListPage.displayName = "ProductListPage";
export default ProductListPage;
