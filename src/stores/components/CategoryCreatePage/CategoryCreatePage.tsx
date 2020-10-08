// import { ContentState, convertToRaw, RawDraftContentState } from "draft-js";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';

import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import ConfirmButton, { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import SeoForm from "@saleor/components/SeoForm";
import { maybe } from "@saleor/misc";
import { sectionNames } from "@saleor/intl";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import CategoryDetailsForm from "../../components/CategoryDetailsForm";

import GoogleMap from "./GoogleMap";

interface FormData {
  // description: RawDraftContentState;
  description: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
}

const initialData: FormData = {
  // description: convertToRaw(ContentState.createFromText("")),
  description: "",
  name: "",
  seoDescription: "",
  seoTitle: ""
};

export interface CategoryCreatePageProps {
  errors: ProductErrorFragment[];
  disabled: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit(data: FormData);
  onBack();
}

export const CategoryCreatePage: React.FC<CategoryCreatePageProps> = ({
  disabled,
  onSubmit,
  onBack,
  errors,
  saveButtonBarState
}) => {
  const intl = useIntl();
  const [addStoreFromGoogleModalOpened, setAddStoreFromGoogleModalOpened] = React.useState(false);
  const [openAddStoreFromGoogleModal, setOpenAddStoreFromGoogleModal] = React.useState(false);
  // const [getLocation, setGetLocation] = React.useState("");
  const onAddStoreFromGoogleClose = () => setAddStoreFromGoogleModalOpened(false);
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
    <>
      <Form onSubmit={onSubmit} initial={initialData} confirmLeave>
        {({ data, change, submit, hasChanged }) => (
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
              <Button color="primary" variant="contained" onClick={() => { setOpenAddStoreFromGoogleModal(true); setAddStoreFromGoogleModalOpened(true) }}>
                <FormattedMessage
                  defaultMessage="Add Store From Google"
                  description="button"
                />
              </Button>
            </PageHeader>
            <div>
              <CategoryDetailsForm
                disabled={disabled}
                data={data}
                onChange={change}
                errors={errors}
                statuses={[
                  {
                    label: "Online",
                    value: "online"
                  },
                  {
                    label: "Offline",
                    value: "offline"
                  },
                  {
                    label: "Both",
                    value: "both"
                  },
                ]}
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
              <SaveButtonBar
                onCancel={onBack}
                onSave={submit}
                state={saveButtonBarState}
                disabled={disabled || !hasChanged}
              />
            </div>
          </Container>
        )}
      </Form>
      {addStoreFromGoogleModalOpened &&
        <Dialog
          maxWidth="sm"
          fullWidth
          // style={{"position": "relative"}}
          onClose={onAddStoreFromGoogleClose}
          open={openAddStoreFromGoogleModal}
        >
          <DialogContent>
            <GoogleMap />
            {/* <PlacesAutocomplete
              value={getLocation}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      className: 'location-search-input',
                      placeholder: 'Street Address',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
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
            {/* <div style={{"display": "none"}}>
              <input
                id="pac-input"
                className="controls"
                type="text"
                placeholder="Enter a location"
              />
            </div>
            <div id="map"></div>
            <div id="infowindow-content">
              <span id="place-name" className="title"></span><br />
              <strong>Place ID:</strong> <span id="place-id"></span><br />
              <span id="place-address"></span>
            </div> */}
          </DialogContent>
          <DialogActions>
            <ConfirmButton
              transitionState={maybe(() => null)}
              color="primary"
              variant="contained"
              onClick={() => setAddStoreFromGoogleModalOpened(false)}
            >
              <span>Close</span>
            </ConfirmButton>
            <ConfirmButton
              transitionState={maybe(() => null)}
              color="primary"
              variant="contained"
              onClick={() => setAddStoreFromGoogleModalOpened(false)}
            >
              <span>Save</span>
            </ConfirmButton>
          </DialogActions>
        </Dialog >
      }
    </>
  );
};
CategoryCreatePage.displayName = "CategoryCreatePage";
export default CategoryCreatePage;
