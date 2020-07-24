import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Dropzone  from 'react-dropzone';
import { IntlShape,useIntl } from "react-intl";
import SVG from "react-inlinesvg";

import claimBusiness from "@assets/images/Group 9355.svg";
import email from "@assets/images/email.svg";
import newBusiness from "@assets/images/Group 9685.svg";
import employeeAccess from "@assets/images/OBJECTS.svg";
import arrowleft from "@assets/images/arrow-left.svg";
import inputicon from "@assets/images/inputicon.svg";
import location from "@assets/images/location.svg";
import search from "@assets/images/search.svg";
// import phone from "@assets/images/phone.svg";
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
import ConfirmButton, {ConfirmButtonTransitionState} from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import Money from "@saleor/components/Money";
import RadioGroupField, {RadioGroupFieldChoice} from "@saleor/components/RadioGroupField";
import RequirePermissions from "@saleor/components/RequirePermissions";
import Skeleton from "@saleor/components/Skeleton";
// import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { UserPermissionProps } from "@saleor/types";
import { PermissionEnum } from "@saleor/types/globalTypes";
// import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
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
import SingleAutocompleteSelectField,{SingleAutocompleteChoiceType} from "../../../components/SingleAutocompleteSelectField";

import { TypedShopInfoQuery } from "../../../../src/components/Shop/query";

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
        border:'1px solid #000',
      },
      backgroundColor: '#fff',
      border:'1px solid transparent',
      color: '#000',
      display: 'block',
      marginTop: '42px',
      padding: '13px 10px',
      width: '100%', 
    },
    businesscard: {
      backgroundImage: 'Linear-gradient(#fe9725, #f65216)',
    },
    businessimgbox: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    businessmodal: {
      display: 'block',
      margin: '0px auto',
      paddingTop: '30px;',
      width: '80%',
    },
    businessmodalcont: {
      backgroundColor: '#fafafa',
      paddingBottom: '130px',
    },
    businessmodaltextarea:{
      "& label":{
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
    cardContent:{
      padding: '30px 15px 100px 15px',
      width: '100%',
    },
    cardbtn: {
      display: 'block',
      marginTop: '50px',
      padding: '13px 10px',
      width: '100%',
    },
    cardbtntext: {
      color: '#000',
      textTransform: 'capitalize',
    },
    cardhead: {
      fontSize:'22px',
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
      margin: '0px auto',
      width: '80%',
    },
    choosefile: {
      "& input":{
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
      "& span":{
        textTransform: 'capitalize',
      },
      padding: '13px 12px',
    },
    dropzonecontent: {
      "& Svg":{
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
      "&:focus":{
        outline: 'none',
      },
      position: 'relative',
    },
    employeaccessinput: {
      paddingTop: '30px',
    },
    employeecard: {
      backgroundColor: '#fff',
    },
    filepreview: {
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
      "&:focus":{
        outline: 'none',
      },
    },
    backgroundColor: '#eaeaea',
    border: '1px dashed #707070',
    borderRadius: '7px',
    },
    icon: {
      "& path":{
        fill:theme.palette.primary.main,
      }
    },
    imgbox: {
      width: '100%',
    },
    inputbox: {
      "& label":{
        overflowX: 'visible',
      },
      "& svg": {
        "& path":{
          fill: 'red',
        },
        height: '25px',
        width:'34pt',
      },
      
      alignItems:'center',
      display: 'flex',  
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
    selectpoint:{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      },
    selectpointcontent:{
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
      "& label":{
        overflowX: 'visible',
      },
    },
    selectpointinputgroup: {
      marginTop: '20px',
      },
    selectpointlist:{
      '& h4' :{
        margin: '0px !important',
      },
      "& li":{
        fontSize: '11px',
        paddingRight:'80px',
        position: 'relative',
      },
      "& svg":{
        position: 'absolute',
        right: '2px',
        top: '-19px',
        width: '65px',
      },
      listStyleType: 'none',
      marginTop: '0px',
      paddingLeft:'0px',
    },
    sendbtn: {
      padding: '13px 30px',
      textTransform: 'capitalize',
    }, 
    skipbtn:{
      "& span":{
        color: '#000',
      },
      "&:hover":{
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
      padding: '65px 0px', 
      textAlign: 'center',
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
  ordersToCapture: number;
  ordersToFulfill: number;
  productsOutOfStock: number;
  sales: Home_salesToday_gross;
  topProducts: Home_productTopToday_edges_node[];
  userName: string;
  countries: SingleAutocompleteChoiceType[];
  countryDisplayValue: string;
  data: string;
  disabled?: boolean;
  confirmButtonState: ConfirmButtonTransitionState;
  // errors: FormErrors<keyof AddressTypeInput>;
  onOrdersToCaptureClick: () => void;
  onOrdersToFulfillClick: () => void;
  onProductClick: (productId: string, variantId: string) => void;
  onProductsOutOfStockClick: () => void;
  onCountryChange(event: React.ChangeEvent<any>);
}

const HomePage: React.FC<HomePageProps> = props => {
  const {
    countryDisplayValue,
    userName,
    confirmButtonState,
    // data,
    disabled,
    orders,
    sales,
    topProducts,
    onProductClick,
    activities,
    onOrdersToCaptureClick,
    onOrdersToFulfillClick,
    onProductsOutOfStockClick,
    // onCountryChange,
    ordersToCapture,
    ordersToFulfill,
    productsOutOfStock,
    userPermissions
  } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(true);
  const [openClaimBusinessModal,setOpenClaimBusinessModal] = React.useState(false);
  const [claimBusinessModal, setClaimBusinessModal] = React.useState(false);
  const [claimBusinessThanksModal,setClaimBusinessThanksModal]= React.useState(false);
  const [openClaimBusinessThanksModal,setOpenClaimBusinessThanksModal]= React.useState(false);
  const [employeeAccessModal,setEmployeeAccessModal]=React.useState(false);
  const [openEmployeeAccessModal,setOpenEmployeeAccessModal]=React.useState(false);
  const [employeeAccessThanksModal,setEmployeeAccessThanksModal]=React.useState(false);
  const [openEmployeeAccessThanksModal,setOpenEmployeeAccessThanksModal]=React.useState(false);
  const [addBusinessModal,setAddBusinessModal]=React.useState(false);
  const [chooseLocationModal,setChooseLocationModal]=React.useState(false);
  const [openChooseLocationModal,setOpenChooseLocationModal]=React.useState(false);
  const [allDoneModal,setAllDoneModal]=React.useState(false);
  const [openAllDoneModal,setOpenAllDoneModal]=React.useState(false);
  const [addAddressModal,setAddAddressModal]=React.useState(false);
  const [openAddAddressModal,setOpenAddAddressModal]=React.useState(false);
  const [importInformationModal,setImportInformationModal]=React.useState(false);
  const [openImportInformationModal,setOpenImportInformationModal]=React.useState(false);
  // const onDrop =React.useCallback(acceptedFiles => {}, []);
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const [openAddBusinessModal,setOpenAddBusinessModal]=React.useState(false);
  const [chooseCategoryModal,setChooseCategoryModal]=React.useState(false);
  const [openChooseCategoryModal,setOpenChooseCategoryModal]=React.useState(false);
  const [addInformationModal,setAddInformationModal]=React.useState(false);
  const [openAddInformationModal,setOpenAddInformationModal]=React.useState(false);
  const onClose = () => setOpen(false);
  const onClaimBusinessClaimClose = () => setClaimBusinessModal(false);
  const onClaimBusinessClaimThanksClose = () => setClaimBusinessThanksModal(false);
  const onEmployeeAccessClose = () => setOpenEmployeeAccessModal(false);
  const onEmployeeAccessThanksModalClose = () => setEmployeeAccessThanksModal(false);
  const intl = useIntl();
  const choices = createChoices(intl);
  const initialForm: any = {
  business: maybe(() =>"", ""),
};


// const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
//   maybe(() => "", "")
// );

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
      <Dialog 
        onClose={onClose}
        open={open}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            overflowY: "visible",
         },
        }}
      >
        <DialogContent>
          <div className={classes.cards}>
            <div className={`${classes.claimcard} ${classes.mycard}`}>
            <h3 className={classes.cardhead}>Claim Business</h3>
              <div className={classes.imgbox}>
              <SVG src={claimBusiness} />
              {/* <img width="170" height="40" src={sitarriLogo}></img> */}
              </div>
              <div className={classes.cardContent}>
              <h4 className={classes.cardhead1}>Claim a business already on Sitarri</h4>
              <p>If you own or manage a business that is already on Sitarri, click below to take control</p>
              <Button className={classes.cardbtn} color="primary" variant="contained" onClick={()=>{setClaimBusinessModal(true); setOpen(false);setOpenClaimBusinessModal(true)}}>
              <span className={classes.btntext}>Claim Business</span>
              </Button>
              </div>
            </div>
            <div className={`${classes.businesscard} ${classes.mycard}`}>
              <h3 className={classes.cardhead}>New Business</h3>
              <div className={classes.businessimgbox}>
              <SVG src={employeeAccess} />
              </div>
              {/* <img width="170" height="40" src={sitarriLogo}></img> */}
              <div className={classes.cardContent}>
              <h4 className={classes.cardhead1}>Add a business to Sitarri</h4>
              <p>If you own or manage a business, click below to add it to Sitarri</p>
              <Button className={classes.businessbtn} color="primary" variant="contained" onClick={()=> {setAddBusinessModal(true);setOpenAddBusinessModal(true);setOpen(false)}}>
              <span className={classes.cardbtntext}>Add Business</span>
              </Button>
              </div>
            </div>
            <div className={`${classes.employeecard} ${classes.mycard}`}>
              <h3 className={classes.cardhead}>Employee Access</h3>
              <div className={classes.imgbox}>
              <SVG src={newBusiness} />
              </div>
              {/* <img width="170" height="40" src={sitarriLogo}></img> */}
              <div className={classes.cardContent}>
              <h4 className={classes.cardhead1}>Staff member of a business</h4>
              <p>Request employee access to a business listed to Sitarri</p>
              <Button className={classes.cardbtn} color="primary" variant="contained" onClick={()=>{setEmployeeAccessModal(true);setOpen(false);setOpenEmployeeAccessModal(true)}}>
              <span className={classes.btntext}>Make employee account</span>
              </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {claimBusinessModal && (
        <Dialog
        maxWidth="sm"
        fullWidth
        onClose={onClaimBusinessClaimClose}
        open={openClaimBusinessModal}
         >
          <Form initial={initialForm}>
          {({ change, data }) => (
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );

            
              <>
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={classes.mylist}>
                <li className={classes.listitem}><span onClick={()=>{setClaimBusinessModal(false);setOpen(true)}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What is the name of the business?</span></li>
              </ul>


            <div className={classes.inputbox}>

              <SVG src={inputicon} />

              <SingleAutocompleteSelectField
              disabled={disabled}
              displayValue={countryDisplayValue}
              // error={!!errors.city}
              // helperText={errors.city}
              label={intl.formatMessage({
                defaultMessage: "Business name"
              })}
              name="city"
              onChange={change}
              value={data.business}
              choices={[{label: "Business1",value:"Business1"},{label: "Business2",value:"Business2"},{label: "Business3",value:"Business3"}]}
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
                              type="submit"
                              onClick={()=>{setClaimBusinessModal(false);setClaimBusinessThanksModal(true);setOpenClaimBusinessThanksModal(true)}}
                              className={classes.confirmbtn} >
                              <span>Manage Business</span>
                            </ConfirmButton>
                          </DialogActions>
                          </>
          )}
                      </Form>
        </Dialog>

        
      )}
      {claimBusinessThanksModal && (
        <Dialog
        maxWidth="sm"
        fullWidth
          onClose={onClaimBusinessClaimThanksClose}
          open={openClaimBusinessThanksModal}
        >
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                <li className={classes.listitem}><span onClick={()=>{setClaimBusinessThanksModal(false);setOpenClaimBusinessModal(true);setClaimBusinessModal(true);}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Thank You!!</span></li>
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
                              onClick={()=>{setClaimBusinessThanksModal(false)}}
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
          onClose={onEmployeeAccessClose}
          open={openEmployeeAccessModal}
        >
          <Form initial={initialForm}>
          {({ change, data }) => (
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );

            
              <>
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={classes.mylist}>
                <li className={classes.listitem}><span onClick={()=>{setEmployeeAccessModal(false);setOpen(true)}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What is the email address of the</span></li>
              </ul>

            <div className={classes.thanksmodaltext}>
            <p>The business owner or manager will have to approve <br /> your access</p>
            </div>


            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>

              <SVG src={email} />

              <TextField
              autoFocus
              fullWidth
              autoComplete="username"
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
                              type="submit"
                              onClick={()=>{setEmployeeAccessModal(false);setEmployeeAccessThanksModal(true);setOpenEmployeeAccessThanksModal(true)}}
                              className={classes.sendbtn} >
                              <span>Send</span>
                            </ConfirmButton>
                          </DialogActions>
                          </>
          )}
                      </Form>
        </Dialog>

        
      )}

    {employeeAccessThanksModal && (
        <Dialog
        maxWidth="sm"
        fullWidth
          onClose={onEmployeeAccessThanksModalClose}
          open={openEmployeeAccessThanksModal}
        >
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                <li className={classes.listitem}><span onClick={()=>{setEmployeeAccessThanksModal(false);setOpenEmployeeAccessModal(true);setEmployeeAccessModal(true)}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Sent!!</span></li>
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
                              onClick={()=>{setEmployeeAccessThanksModal(false)}}
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
        onClose={()=>setAddBusinessModal(false)}
        open={openAddBusinessModal}
         >
          <Form initial={initialForm}>
          {({ change, data }) => (
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );

            
              <>
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={classes.mylist}>
                <li className={classes.listitem}><span onClick={()=>{setAddBusinessModal(false);setOpenAddBusinessModal(false);setOpen(true);}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What is the name of the business?</span></li>
              </ul>


            <div className={classes.inputbox}>

              <SVG src={inputicon} />

              <TextField
              autoFocus
              required
              fullWidth
              autoComplete="username"
              label="Business Name"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />

            </div>

          <div className={classes.businessmodaltextarea}>    
            <TextField
              fullWidth
              multiline
              autoComplete="username"
              label="Business Description"
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
                              type="submit"
                              onClick={()=>{setAddBusinessModal(false);setChooseCategoryModal(true);setOpenChooseCategoryModal(true)}}
                              className={classes.sendbtn} >
                              <span>Next</span>
                            </ConfirmButton>
                          </DialogActions>
                          </>
          )}
                      </Form>
        </Dialog>

        
      )}

{chooseCategoryModal && (
        <Dialog
        maxWidth="sm"
        fullWidth
          onClose={()=>setChooseCategoryModal(false)}
          open={openChooseCategoryModal}
        >
          <Form initial={initialForm}>
          {({ change, data }) => (
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );

            
              <>
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={classes.mylist}>
                <li className={classes.listitem}><span onClick={()=>{setChooseCategoryModal(false);setOpenChooseCategoryModal(false);setAddBusinessModal(true);}}><SVG className={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Choose the category that best</span></li>
              </ul>

            <div className={classes.thanksmodaltext}>
            <p>This helps customer find you if they are looking for <br /> a business like yours</p>
            </div>


            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>

              <SVG src={search} />

              <TextField
              autoFocus
              fullWidth
              helperText="You can change or add more later"
              autoComplete="username"
              label="Business Category"
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
                              type="submit"
                              onClick={()=> {setChooseCategoryModal(false);setAddInformationModal(true);setOpenAddInformationModal(true)}}
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
          onClose={()=> setAddInformationModal(false)}
          open={openAddInformationModal}
        >
          <Form initial={initialForm}>
          {({ change, data }) => (
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );

            
              <>
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={classes.mylist}>
                <li className={classes.listitem}><span onClick={()=>{setAddInformationModal(false);setOpenAddInformationModal(false);setChooseCategoryModal(true);}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>What information do you want to</span></li>
              </ul>

            <div className={classes.thanksmodaltext}>
            <p>Help customers get in touch and recognise your<br /> business by including this info on your listing</p>
            </div>


            {/* <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>

              <SVG src={phone} />

              <TextField
              autoFocus
              fullWidth
              autoComplete="username"
              label="Phone Number"
              required
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
            </div> */}

            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>

              <SVG src={globe} />

              <TextField
              fullWidth
              autoFocus
              autoComplete="username"
              label="Website"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
            </div>

            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>

              <SVG src={facebook} />

              <TextField
              fullWidth
              autoComplete="username"
              label="Facebook"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
            </div>

            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>

              <SVG src={instagram} />

              <TextField
              fullWidth
              autoComplete="username"
              label="Instagram"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
            </div>

            <div className={`${classes.inputbox} ${classes.employeaccessinput}`}>

              <SVG src={twitter} />

              <TextField
              fullWidth
              autoComplete="username"
              label="Twitter"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
            </div>

            <div className={classes.fileupload}>
                <p>Business Logo</p>

              <div className={classes.fileuploadcont}>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                  {({getRootProps, getInputProps}) => (
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

              </div>

              </div>


            </div>

            
          </DialogContent>
          
          <DialogActions className={classes.modalfooter}>
          <ConfirmButton
                              transitionState={confirmButtonState}
                              color="primary"
                              variant="contained"
                              type="submit"
                              onClick={()=> {setAddInformationModal(false);setChooseLocationModal(true);setOpenChooseLocationModal(true)}}
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
          onClose={()=>setChooseLocationModal(false)}
          open={openChooseLocationModal}
        >
          <Form initial={initialForm}>
          {({ change, data }) => (
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );

            
              <>
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={classes.mylist}>
                <li className={classes.listitem}><span onClick={()=>{setChooseLocationModal(false);setOpenChooseLocationModal(false);setAddInformationModal(true);}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Do you want to add a location</span></li>
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
                              type="submit"
                              onClick={()=> {setChooseLocationModal(false);setAllDoneModal(true);setOpenAllDoneModal(true);setOpenAddAddressModal(true);setAddAddressModal(true);setOpenImportInformationModal(true);setImportInformationModal(true)}}
                              className={classes.sendbtn} >
                              <span>Next</span>
                            </ConfirmButton>
                          </DialogActions>
                          </>
          )}
                      </Form>
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
      return(
        <Dialog
        maxWidth="sm"
        fullWidth
        onClose={()=>setAddAddressModal(false)}
        open={openAddAddressModal}
         >
          <Form initial={initialForm}>
          {({ change, data }) => (
           
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );
            // return (

            
              <>
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={classes.mylist}>
                <li className={classes.listitem}><SVG classname={classes.arrowlefticon} src={arrowleft} /><span className={classes.listtext}>What is the name of the business?</span></li>
              </ul>


            <div className={classes.inputbox}>

              <SVG src={location} />
            
              <SingleAutocompleteSelectField
                disabled={disabled}
                displayValue={countryDisplayValue}
                // error={!!formErrors.country}
                // helperText={getErrorMessage(formErrors.country, intl)}
                label={intl.formatMessage({
                  defaultMessage: "Country"
                })}
                name="country"
                onChange={change}
                value={data.business}
                choices={countryChoices}
                InputProps={{
                  autoComplete: "off"
                }}
              />
            </div>

            <div className={classes.businessmodaltextarea}>    
            <TextField
              fullWidth
              multiline
              autoComplete="username"
              label="Street Address"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
          </div>

          <div className={classes.businessmodaltextarea}>    
            <TextField
              fullWidth
              autoComplete="username"
              label="Postcode"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />
          </div>

          <div className={classes.businessmodaltextarea}>    
            <TextField
              fullWidth
              autoComplete="username"
              label="Town/City"
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
                              type="submit"
                              onClick={()=>{setAddAddressModal(false);setAllDoneModal(true);setOpenAllDoneModal(true)}}
                              className={classes.sendbtn} >
                              <span>Next</span>
                            </ConfirmButton>
                          </DialogActions>
                          
                          </>
          )}
                      </Form>
        </Dialog>
      )}}
</TypedShopInfoQuery>
      )}


{allDoneModal && (
        <Dialog
        maxWidth="sm"
        fullWidth
          onClose={()=> setAllDoneModal(false)}
          open={openAllDoneModal}
        >
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                <li className={classes.listitem}><span onClick={()=>{setAllDoneModal(false);setOpenAllDoneModal(false);setChooseLocationModal(true);}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>All done!!!!</span></li>
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
                              onClick={()=>{setAllDoneModal(false);setOpenAllDoneModal(false)}}
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
          onClose={()=> setImportInformationModal(false)}
          open={openImportInformationModal}
        >
          <DialogContent className={classes.businessmodalcont}>

            <div className={classes.businessmodal}>
              <ul className={`${classes.mylist} ${classes.thanksmodallist}`}>
                <li className={classes.listitem}><span onClick={()=>{setAllDoneModal(false);setOpenAllDoneModal(false);setChooseLocationModal(true);}}><SVG classname={classes.arrowlefticon} src={arrowleft} /></span><span className={classes.listtext}>Import Business Information</span></li>
              </ul>


            <div className={classes.thanksmodaltext}>
            <p>Integrate your point of sale system with Sittari to save time <br /> and keep your business information updated automatically</p>
            </div>

            

            </div>
            
            <h3 className={classes.selectpointheading}>Select Your Point of Sale Provider</h3>
            
            <div className={classes.selectpoint}>

                <div className={classes.selectpointcontent}>
                <ul className={classes.selectpointlist}>
                <h4>Izette</h4>
                  <li>Leading payment and POS<br /> provider for small business<SVG src={saleimg1} /></li>
                </ul>

            {/* inner-sec */}

                <div className={classes.selectpointinput}>

        <Form initial={initialForm}>
          {({ change, data }) => (
           
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );
            // return (

            
              <>


                <div>
                <TextField
              fullWidth
              autoComplete="username"
              label="Access Token"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />

              </div>

            
</>
          )}
          </Form>
            </div>


          {/* inner-sec */}


              </div>

              <div className={classes.selectpointcontent}>
                
                <ul className={classes.selectpointlist}>
                <h4>Square</h4>
                  <li>Leading payment and POS<br /> provider for small business<SVG src={saleimg2} /></li>
                </ul>


                {/* inner-sec */}

                <div className={classes.selectpointinput}>

        <Form initial={initialForm}>
          {({ change, data }) => (
           
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );
            // return (

            
              <>


                <div>
                <TextField
              fullWidth
              autoComplete="username"
              label="Access Token"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />

              </div>

            
</>
          )}
          </Form>
            </div>


          {/* inner-sec */}

              </div>
            

            </div>

            <div className={classes.selectpoint}>

                <div className={classes.selectpointcontent}>
                <ul className={classes.selectpointlist}>
                <h4>Shopify</h4>
                  <li>Global e-commerce and POS company focused on retail<SVG src={saleimg3} /></li>
                </ul>

                {/* inner-sec */}

                <div className={classes.selectpointinput}>

        <Form initial={initialForm}>
          {({ change, data }) => (
           
            // const handleCountrySelect = createSingleAutocompleteSelectHandler(
            //   change,
            //   setCountryDisplayName,
            //   countryChoices
            // );
            // return (

            
              <>


                <div>
                <TextField
              fullWidth
              autoComplete="username"
              label="Access Token"
              name="email"
              onChange={change}
              value={data.email}
              inputProps={{
                "data-tc": "email"
              }}
            />

              </div>

            
        </>
          )}
          </Form>
            </div>


          {/* inner-sec */}

          {/* inner-sec */}

          <div className={`${classes.selectpointinput} ${classes.selectpointinputgroup}`}>

            <Form initial={initialForm}>
              {({ change, data }) => (
              
                // const handleCountrySelect = createSingleAutocompleteSelectHandler(
                //   change,
                //   setCountryDisplayName,
                //   countryChoices
                // );
                // return (

                
                  <>


                    <div>
                    <TextField
                  fullWidth
                  autoComplete="username"
                  label="URL"
                  name="email"
                  onChange={change}
                  value={data.email}
                  inputProps={{
                    "data-tc": "email"
                  }}
                />

                  </div>

                
            </>
              )}
              </Form>
                </div>


              {/* inner-sec */}

              </div>

              <div className={classes.selectpointcontent}>
                
                <ul className={classes.selectpointlist}>
                <h4>Vend</h4>
                  <li>Cloud based e-commerce and ePOS provider<SVG src={saleimg4} /></li>
                </ul>

                  {/* inner-sec */}

                <div className={classes.selectpointinput}>

<Form initial={initialForm}>
  {({ change, data }) => (
   
    // const handleCountrySelect = createSingleAutocompleteSelectHandler(
    //   change,
    //   setCountryDisplayName,
    //   countryChoices
    // );
    // return (

    
      <>


        <div>
        <TextField
      fullWidth
      autoComplete="username"
      label="Access Token"
      name="email"
      onChange={change}
      value={data.email}
      inputProps={{
        "data-tc": "email"
      }}
    />

      </div>

    
</>
  )}
  </Form>
    </div>


  {/* inner-sec */}

        {/* inner-sec */}

        <div className={`${classes.selectpointinput} ${classes.selectpointinputgroup}`}>

      <Form initial={initialForm}>
        {({ change, data }) => (
        
          // const handleCountrySelect = createSingleAutocompleteSelectHandler(
          //   change,
          //   setCountryDisplayName,
          //   countryChoices
          // );
          // return (

          
            <>


              <div>
              <TextField
            fullWidth
            autoComplete="username"
            label="URL"
            name="email"
            onChange={change}
            value={data.email}
            inputProps={{
              "data-tc": "email"
            }}
          />

            </div>

          
      </>
        )}
        </Form>
          </div>


        {/* inner-sec */}
                

              </div>
            

            </div>


          </DialogContent>
          <DialogActions className={classes.modalfooter}>
          <ConfirmButton
                              transitionState={confirmButtonState}
                              color="primary"
                              variant="contained"
                              type="submit"
                              onClick={()=>{setAllDoneModal(false);setOpenAllDoneModal(false)}}
                             className={classes.sendbtn}>
                              <span>Next</span>
                            </ConfirmButton>

                            <ConfirmButton
                              transitionState={confirmButtonState}
                              color="primary"
                              variant="contained"
                              type="submit"
                              onClick={()=>{setImportInformationModal(false);setAllDoneModal(true);setOpenAllDoneModal(true)}}
                             className={classes.skipbtn}>
                              <span>Skip for now</span>
                            </ConfirmButton>

                          </DialogActions>
        </Dialog>

        
      )}

    </Container>
  );
};
HomePage.displayName = "HomePage";
export default HomePage;
