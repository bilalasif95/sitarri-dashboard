// import { ContentState, convertToRaw, RawDraftContentState } from "draft-js";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import { useIntl } from "react-intl";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';

import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import SeoForm from "@saleor/components/SeoForm";
import useShop from "@saleor/hooks/useShop";
import { maybe } from "@saleor/misc";
import { sectionNames } from "@saleor/intl";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import BusinessInformationOfSpecificStore from "../../components/BusinessInformationOfSpecificStore";
import CategoryDetailsForm from "../../components/CategoryDetailsForm";
import ContactInformationForm from "../../components/ContactInformationForm";
import StoreOpeningClosingHours from "../../components/StoreOpeningClosingHours";

import { HomePageQuery } from "../../../home/queries";
// import GoogleMap from "./GoogleMap";

export interface FormData {
  // description: RawDraftContentState;
  description: string;
  name: string;
  businessCategory: any;
  seoTitle: string;
  seoDescription: string;
  streetAddress: string;
  streetAddress2: string;
  delivery: string;
  city: string;
  facebook: string;
  country: any;
  postalCode: any;
  phone: string;
  tags: any;
  logo: any;
  status: any;
  reservationSystem: string;
  instagram: string;
  twitter: string;
  website: string;
  mondayOpenClose: boolean;
  tuesdayOpenClose: boolean;
  wednesdayOpenClose: boolean;
  thursdayOpenClose: boolean;
  fridayOpenClose: boolean;
  saturdayOpenClose: boolean;
  sundayOpenClose: boolean;
  mondayOpeningTime: number;
  mondayClosingTime: number;
  tuesdayOpeningTime: number;
  tuesdayClosingTime: number;
  wednesdayOpeningTime: number;
  wednesdayClosingTime: number;
  thursdayOpeningTime: number;
  thursdayClosingTime: number;
  fridayOpeningTime: number;
  fridayClosingTime: number;
  saturdayOpeningTime: number;
  saturdayClosingTime: number;
  sundayOpeningTime: number;
  sundayClosingTime: number;
}

export interface CategoryCreatePageProps {
  errors: ProductErrorFragment[];
  category: any;
  disabled: boolean;
  latlngError: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit(data: FormData);
  onBack();
}

export const CategoryCreatePage: React.FC<CategoryCreatePageProps> = ({
  disabled,
  onSubmit,
  onBack,
  category,
  errors,
  latlngError,
  saveButtonBarState
}) => {
  const intl = useIntl();
  const shop = useShop();
  const [businesses, setBusinesses] = React.useState([]);
  const initialData: FormData = category ? {
    // description: convertToRaw(ContentState.createFromText("")),
    businessCategory: maybe(() => category.businesscategory, ""),
    city: maybe(() => "", ""),
    country: maybe(() => "GB", "GB"),
    delivery: maybe(() => category.deliverooUrl.slice(12), ""),
    description: maybe(() => "", ""),
    facebook: maybe(() => category.facebookUrl.slice(25), ""),
    fridayClosingTime: maybe(() => 1440, 1440),
    fridayOpenClose: maybe(() => true, false),
    fridayOpeningTime: maybe(() => 0, 0),
    instagram: maybe(() => category.instagramUrl.slice(26), ""),
    logo: maybe(() => category.logo, ""),
    mondayClosingTime: maybe(() => 1440, 1440),
    mondayOpenClose: maybe(() => true, false),
    mondayOpeningTime: maybe(() => 0, 0),
    name: maybe(() => "", ""),
    phone: maybe(() => "", ""),
    postalCode: maybe(() => "", ""),
    reservationSystem: maybe(() => category.uberEatsUrl.slice(12), ""),
    saturdayClosingTime: maybe(() => 1440, 1440),
    saturdayOpenClose: maybe(() => true, false),
    saturdayOpeningTime: maybe(() => 0, 0),
    seoDescription: maybe(() => "", ""),
    seoTitle: maybe(() => "", ""),
    status: maybe(() => "", ""),
    streetAddress: maybe(() => "", ""),
    streetAddress2: maybe(() => "", ""),
    sundayClosingTime: maybe(() => 1440, 1440),
    sundayOpenClose: maybe(() => false, false),
    sundayOpeningTime: maybe(() => 0, 0),
    tags: maybe(() => "", ""),
    thursdayClosingTime: maybe(() => 1440, 1440),
    thursdayOpenClose: maybe(() => true, false),
    thursdayOpeningTime: maybe(() => 0, 0),
    tuesdayClosingTime: maybe(() => 1440, 1440),
    tuesdayOpenClose: maybe(() => true, false),
    tuesdayOpeningTime: maybe(() => 0, 0),
    twitter: maybe(() => category.twitterUrl.slice(24), ""),
    website: maybe(() => category.websiteUrl.slice(12), ""),
    wednesdayClosingTime: maybe(() => 1440, 1440),
    wednesdayOpenClose: maybe(() => true, false),
    wednesdayOpeningTime: maybe(() => 0, 0),
  } : {
      businessCategory: "",
      city: "",
      country: "GB",
      delivery: "",
      description: "",
      facebook: "",
      fridayClosingTime: 1440,
      fridayOpenClose: false,
      fridayOpeningTime: 0,
      instagram: "",
      logo: "",
      mondayClosingTime: 1440,
      mondayOpenClose: false,
      mondayOpeningTime: 0,
      name: "",
      phone: "",
      postalCode: "",
      reservationSystem: "",
      saturdayClosingTime: 1440,
      saturdayOpenClose: false,
      saturdayOpeningTime: 0,
      seoDescription: "",
      seoTitle: "",
      status: "",
      streetAddress: "",
      streetAddress2: "",
      sundayClosingTime: 1440,
      sundayOpenClose: false,
      sundayOpeningTime: 0,
      tags: "",
      thursdayClosingTime: 1440,
      thursdayOpenClose: false,
      thursdayOpeningTime: 0,
      tuesdayClosingTime: 1440,
      tuesdayOpenClose: false,
      tuesdayOpeningTime: 0,
      twitter: "",
      website: "",
      wednesdayClosingTime: 1440,
      wednesdayOpenClose: false,
      wednesdayOpeningTime: 0,
    };
  // const [addStoreFromGoogleModalOpened, setAddStoreFromGoogleModalOpened] = React.useState(false);
  // const [openAddStoreFromGoogleModal, setOpenAddStoreFromGoogleModal] = React.useState(false);
  // const [getLocation, setGetLocation] = React.useState("");
  // const onAddStoreFromGoogleClose = () => setAddStoreFromGoogleModalOpened(false);
  // const handleChange = address => {
  //     setGetLocation(address)
  //   };

  //   const handleSelect = (address) => {
  //     geocodeByAddress(address)
  //       .then(results => {console.log(results,"=====");getLatLng(results[0])})
  //       .then(latLng => console.log('Success', latLng))
  //       .catch(error => console.error('Error', error));
  //   };
  return (
    <HomePageQuery>
      {({ data }) => {
        maybe(() => setBusinesses(data.businessCategories.edges))
        return (
          <Form onSubmit={onSubmit} initial={initialData} confirmLeave>
            {({ data, change, submit }) => (
              <Container>
                <AppHeader onBack={onBack}>
                  {intl.formatMessage(sectionNames.stores)}
                </AppHeader>
                <PageHeader
                  title={intl.formatMessage({
                    defaultMessage: "Create Store",
                    description: "page header"
                  })}
                >
                  {/* <Button color="primary" variant="contained" onClick={() => { setOpenAddStoreFromGoogleModal(true); setAddStoreFromGoogleModalOpened(true) }}>
                <FormattedMessage
                  defaultMessage="Add Store From Google"
                  description="button"
                />
              </Button> */}
                </PageHeader>
                <Grid>
                  <div>
                    <CategoryDetailsForm
                      disabled={disabled}
                      data={data}
                      onChange={change}
                      errors={errors}
                      statuses={[
                        {
                          label: "Online",
                          value: "Online"
                        },
                        {
                          label: "Offline",
                          value: "Offline"
                        },
                        {
                          label: "Both",
                          value: "Both"
                        },
                      ]}
                    />
                    <CardSpacer />
                    <ContactInformationForm
                      category={category}
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      latlngError={latlngError}
                      onChange={change}
                      countries={maybe(
                        () =>
                          shop.countries.map(country => ({
                            code: country.code,
                            label: country.country
                          })),
                        []
                      )}
                    />
                    <CardSpacer />
                    <SeoForm
                      helperText={intl.formatMessage({
                        defaultMessage:
                          "Add search engine title and description to make this store easier to find"
                      })}
                      title={data.seoTitle}
                      titlePlaceholder={data.name}
                      description={data.seoDescription}
                      descriptionPlaceholder={data.name}
                      loading={disabled}
                      onChange={change}
                      disabled={disabled}
                    />
                    <CardSpacer />
                    {/* <CategoryProducts
                      categoryName={""}
                      products={products}
                      disabled={disabled}
                      pageInfo={pageInfo}
                      onNextPage={onNextPage}
                      onPreviousPage={onPreviousPage}
                      onRowClick={onProductClick}
                      onAdd={onAddProduct}
                      toggle={toggle}
                      toggleAll={toggleAll}
                      selected={selected}
                      isChecked={isChecked}
                      toolbar={productListToolbar}
                    /> */}
                  </div>
                  <div>
                    <BusinessInformationOfSpecificStore
                      category={category}
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      onChange={change}
                      businessNames={businesses}
                    />
                    <CardSpacer />
                    <StoreOpeningClosingHours
                      category={category}
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      onChange={change}
                    />
                  </div>
                </Grid>
                <SaveButtonBar
                  onCancel={onBack}
                  onSave={submit}
                  state={saveButtonBarState}
                  disabled={disabled}
                />
              </Container>
            )}
          </Form>
        )
      }
      }
    </HomePageQuery>
    // {/* {addStoreFromGoogleModalOpened &&
    //   <Dialog
    //     maxWidth="sm"
    //     fullWidth
    //     // style={{"position": "relative"}}
    //     onClose={onAddStoreFromGoogleClose}
    //     open={openAddStoreFromGoogleModal}
    //   >
    //     <DialogContent>
    //       <GoogleMap /> */}
    // {/* <PlacesAutocomplete
    //         value={getLocation}
    //         onChange={handleChange}
    //         onSelect={handleSelect}
    //       >
    //         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    //           <div>
    //             <input
    //               {...getInputProps({
    //                 className: 'location-search-input',
    //                 placeholder: 'Street Address',
    //               })}
    //             />
    //             <div className="autocomplete-dropdown-container">
    //               {loading && <div>Loading...</div>}
    //               {suggestions.map(suggestion => {
    //                 const className = suggestion.active
    //                   ? 'suggestion-item--active'
    //                   : 'suggestion-item';
    //                 // inline style for demonstration purpose
    //                 const style = suggestion.active
    //                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
    //                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
    //                 return (
    //                   <div
    //                     {...getSuggestionItemProps(suggestion, {
    //                       className,
    //                       style,
    //                     })}
    //                   >
    //                     <span>{suggestion.description}</span>
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         )}
    //       </PlacesAutocomplete> */}
    // {/* <div style={{"display": "none"}}>
    //         <input
    //           id="pac-input"
    //           className="controls"
    //           type="text"
    //           placeholder="Enter a location"
    //         />
    //       </div>
    //       <div id="map"></div>
    //       <div id="infowindow-content">
    //         <span id="place-name" className="title"></span><br />
    //         <strong>Place ID:</strong> <span id="place-id"></span><br />
    //         <span id="place-address"></span>
    //       </div> */}
    // {/* </DialogContent>
    //     <DialogActions>
    //       <ConfirmButton
    //         transitionState={maybe(() => null)}
    //         color="primary"
    //         variant="contained"
    //         onClick={() => setAddStoreFromGoogleModalOpened(false)}
    //       >
    //         <span>Close</span>
    //       </ConfirmButton>
    //       <ConfirmButton
    //         transitionState={maybe(() => null)}
    //         color="primary"
    //         variant="contained"
    //         onClick={() => setAddStoreFromGoogleModalOpened(false)}
    //       >
    //         <span>Save</span>
    //       </ConfirmButton>
    //     </DialogActions>
    //   </Dialog >
    // } */}
    // </>
  );
};
CategoryCreatePage.displayName = "CategoryCreatePage";
export default CategoryCreatePage;
