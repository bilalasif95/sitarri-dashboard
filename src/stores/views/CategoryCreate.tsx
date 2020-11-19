import React from "react";
import { useIntl } from "react-intl";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { maybe } from "../../misc";
import CategoryCreatePage from "../components/CategoryCreatePage";
import { useCategoryCreateMutation } from "../mutations";
import { storesListUrl, storesUrl } from "../urls";
import { TypedProductDetailsQuery } from "../../businesses/queries";
import { TypedProductUpdateMutation } from "../../businesses/mutations";

interface CategoryCreateViewProps {
  parentId: string;
}

export const CategoryCreateView: React.FC<CategoryCreateViewProps> = ({
  parentId
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const [latlngError, setlatLngError] = React.useState("");
  const [latLngLoading, setlatLngLoading] = React.useState(false);
  const handleSuccess = (data: any) => {
    if (data.storeCreate.storeErrors.length === 0 && data.businessUpdate.businessErrors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Category created"
        })
      });
      navigate(storesUrl(data.storeCreate.store.id));
    }
  };

  const [storeCreate, storeCreateResult] = useCategoryCreateMutation({
    onCompleted: handleSuccess
  });

  const errors = maybe(
    () => storeCreateResult.data.storeCreate.storeErrors,
    []
  );
  const id = localStorage.getItem("businessID");

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create category",
          description: "window title"
        })}
      />
      <TypedProductDetailsQuery displayLoader variables={{ id }}>
        {({ data, loading }) => (
          <TypedProductUpdateMutation onCompleted={handleSuccess}>
            {(businessUpdate, businessUpdateOpts) => (
              <CategoryCreatePage
                saveButtonBarState={storeCreateResult.status}
                errors={errors}
                category={maybe(() => data.business)}
                latlngError={latlngError}
                disabled={storeCreateResult.loading || latLngLoading || loading || businessUpdateOpts.loading}
                onBack={() =>
                  navigate(parentId ? storesUrl(parentId) : storesListUrl())
                }
                onSubmit={formData => {
                  // if (formData.country === "") {
                  //   const countryError = errors.push({
                  //     code: "REQUIRED",
                  //     field: "country"
                  //   })
                  //   console.log(countryError, "=====")
                  // }
                  // else {
                  setlatLngError("");
                  setlatLngLoading(true);
                  geocodeByAddress(
                    formData.streetAddress +
                    "," +
                    formData.city +
                    "," +
                    formData.country
                  )
                    .then(results => getLatLng(results[0]))
                    .then(latLng => {
                      setlatLngLoading(false);
                      storeCreate({
                        variables: {
                          input: {
                            address: {
                              city: formData.city,
                              country: formData.country,
                              latitude: latLng.lat,
                              longitude: latLng.lng,
                              postalCode: formData.postalCode,
                              streetAddress: formData.streetAddress,
                              streetAddress2: formData.streetAddress2,
                            },
                            business: id,
                            description: formData.description,
                            fridayClosingTime: formData.fridayClosingTime,
                            fridayOpeningStatus: formData.fridayOpenClose,
                            fridayOpeningTime: formData.fridayOpeningTime,
                            mondayClosingTime: formData.mondayClosingTime,
                            mondayOpeningStatus: formData.mondayOpenClose,
                            mondayOpeningTime: formData.mondayOpeningTime,
                            name: formData.name,
                            phone: formData.phone,
                            saturdayClosingTime: formData.saturdayClosingTime,
                            saturdayOpeningStatus: formData.saturdayOpenClose,
                            saturdayOpeningTime: formData.saturdayOpeningTime,
                            seoDescription: formData.seoDescription,
                            seoTitle: formData.seoTitle,
                            status: formData.status,
                            sundayClosingTime: formData.sundayClosingTime,
                            sundayOpeningStatus: formData.sundayOpenClose,
                            sundayOpeningTime: formData.sundayOpeningTime,
                            tags: formData.tags,
                            thursdayClosingTime: formData.thursdayClosingTime,
                            thursdayOpeningStatus: formData.thursdayOpenClose,
                            thursdayOpeningTime: formData.thursdayOpeningTime,
                            tuesdayClosingTime: formData.tuesdayClosingTime,
                            tuesdayOpeningStatus: formData.tuesdayOpenClose,
                            tuesdayOpeningTime: formData.tuesdayOpeningTime,
                            wednesdayClosingTime: formData.wednesdayClosingTime,
                            wednesdayOpeningStatus: formData.wednesdayOpenClose,
                            wednesdayOpeningTime: formData.wednesdayOpeningTime,
                          },
                          // parent: parentId || null
                        }
                      })
                      businessUpdate({
                        variables: {
                          businesscategory: formData.businessCategory.id,
                          deliverooUrl: formData.delivery ? "https://www." + formData.delivery : "",
                          facebookUrl: formData.facebook ? "https://www.facebook.com/" + formData.facebook : "",
                          id,
                          instagramUrl: formData.instagram ? "https://www.instagram.com/" + formData.instagram : "",
                          logo: formData.logo,
                          twitterUrl: formData.twitter ? "https://www.twitter.com/" + formData.twitter : "",
                          uberEatsUrl: formData.reservationSystem ? "https://www." + formData.reservationSystem : "",
                          websiteUrl: formData.website ? "https://www." + formData.website : "",
                        }
                      })
                    })
                    .catch(error => {
                      setlatLngLoading(false);
                      setlatLngError(error);
                    });
                }
                  // }
                }
              />
            )}
          </TypedProductUpdateMutation>
        )}
      </TypedProductDetailsQuery>
    </>
  );
};
export default CategoryCreateView;
