// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import { RawDraftContentState } from "draft-js";
import React from "react";
// import { FormattedMessage, useIntl } from "react-intl";
import { useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
// import CardTitle from "@saleor/components/CardTitle";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import SeoForm from "@saleor/components/SeoForm";
// import { Tab, TabContainer } from "@saleor/components/Tab";
import useShop from "@saleor/hooks/useShop";
import { sectionNames } from "@saleor/intl";
// import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import { maybe } from "../../../misc";
import { TabListActions } from "../../../types";
import BusinessInformationOfSpecificStore from "../../components/BusinessInformationOfSpecificStore";
import CategoryDetailsForm from "../../components/CategoryDetailsForm";
import ContactInformationForm from "../../components/ContactInformationForm";
import StoreOpeningClosingHours from "../../components/StoreOpeningClosingHours";
// import CategoryList from "../../components/CategoryList";
import {
  // CategoryDetails_category,
  CategoryDetails_category_children_edges_node,
  CategoryDetails_category_products_edges_node
} from "../../types/CategoryDetails";
// import CategoryBackground from "../CategoryBackground";
// import CategoryProducts from "../CategoryProducts";

import { HomePageQuery } from "../../../home/queries";

import ProductImages from "../ProductImages";

export interface FormData {
  backgroundImageAlt: string;
  // description: RawDraftContentState;
  description: string;
  name: string;
  businessCategory: any;
  seoTitle: string;
  seoDescription: string;
  status: any;
  phone: string;
  city: string;
  rating: any;
  instagram: string;
  mondayOpenClose: boolean;
  delivery: string;
  facebook: string;
  postalCode: number;
  country: any;
  logo: any;
  reservationSystem: string;
  streetAddress: string;
  streetAddress2: string;
  tags: any;
  twitter: string;
  tuesdayOpenClose: boolean;
  thursdayOpenClose: boolean;
  website: string;
  wednesdayOpenClose: boolean;
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

export enum CategoryPageTab {
  categories = "categories",
  products = "products"
}

export interface CategoryUpdatePageProps
  extends TabListActions<"productListToolbar" | "subcategoryListToolbar"> {
  changeTab: (index: CategoryPageTab) => void;
  currentTab: CategoryPageTab;
  errors: any;
  disabled: boolean;
  paramsProps: any;
  placeholderImage: string;
  category: any;
  products: CategoryDetails_category_products_edges_node[];
  latlngError: string;
  subcategories: CategoryDetails_category_children_edges_node[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  images: any;
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: FormData) => void;
  onImageDelete: (id: string) => () => void;
  onImageEdit?(id: string);
  onImageReorder?(event: { oldIndex: number; newIndex: number });
  onImageUpload(file: File);
  onNextPage();
  onPreviousPage();
  onProductClick(id: string): () => void;
  onAddProduct();
  onBack();
  onDelete();
  onAddCategory();
  onCategoryClick(id: string): () => void;
}

// const CategoriesTab = Tab(CategoryPageTab.categories);
// const ProductsTab = Tab(CategoryPageTab.products);

export const CategoryUpdatePage: React.FC<CategoryUpdatePageProps> = ({
  // changeTab,
  // currentTab,
  category,
  // paramsProps,
  disabled,
  errors,
  // pageInfo,
  placeholderImage,
  // onImageEdit,
  onImageReorder,
  // products,
  images,
  saveButtonBarState,
  latlngError,
  // subcategories,
  // onAddCategory,
  // onAddProduct,
  onBack,
  // onCategoryClick,
  onDelete,
  // onNextPage,
  // onPreviousPage,
  // onProductClick,
  onSubmit,
  onImageDelete,
  onImageUpload,
  // isChecked,
  // productListToolbar,
  // selected,
  // subcategoryListToolbar,
  // toggle,
  // toggleAll
}: CategoryUpdatePageProps) => {
  const intl = useIntl();
  const shop = useShop();
  const [businesses, setBusinesses] = React.useState([]);
  const initialData: FormData = category
    ? {
      backgroundImageAlt: maybe(() => category.backgroundImage.alt, ""),
      businessCategory: maybe(() => category.business.businesscategory, ""),
      city: maybe(() => category.address.city, ""),
      country: maybe(() => category.address.country.code, ""),
      delivery: maybe(() => category.business.deliverooUrl.slice(12), ""),
      description: maybe(() => category.description, ""),
      facebook: maybe(() => category.business.facebookUrl.slice(25), ""),
      fridayClosingTime: maybe(() => category.fridayClosingTime, 0),
      fridayOpenClose: maybe(() => category.fridayOpeningStatus, false),
      fridayOpeningTime: maybe(() => category.fridayOpeningTime, 0),
      instagram: maybe(() => category.business.instagramUrl.slice(26), ""),
      logo: maybe(() => category.business.logo, ""),
      mondayClosingTime: maybe(() => category.mondayClosingTime, 0),
      mondayOpenClose: maybe(() => category.mondayOpeningStatus, false),
      mondayOpeningTime: maybe(() => category.mondayOpeningTime, 0),
      name: maybe(() => category.name, ""),
      phone: maybe(() => category.phone, ""),
      postalCode: maybe(() => category.address.postalCode, ""),
      rating: maybe(() => category.rating, 0),
      reservationSystem: maybe(() => category.business.uberEatsUrl.slice(12), ""),
      saturdayClosingTime: maybe(() => category.saturdayClosingTime, 0),
      saturdayOpenClose: maybe(() => category.saturdayOpeningStatus, false),
      saturdayOpeningTime: maybe(() => category.saturdayOpeningTime, 0),
      seoDescription: maybe(() => category.seoDescription, ""),
      seoTitle: maybe(() => category.seoTitle, ""),
      status: maybe(() => category.status, ""),
      streetAddress: maybe(() => category.address.streetAddress, ""),
      streetAddress2: maybe(() => category.address.streetAddress2, ""),
      sundayClosingTime: maybe(() => category.sundayClosingTime, 0),
      sundayOpenClose: maybe(() => category.sundayOpeningStatus, false),
      sundayOpeningTime: maybe(() => category.sundayOpeningTime, 0),
      tags: maybe(() => category.tags, ""),
      thursdayClosingTime: maybe(() => category.thursdayClosingTime, 0),
      thursdayOpenClose: maybe(() => category.thursdayOpeningStatus, false),
      thursdayOpeningTime: maybe(() => category.thursdayOpeningTime, 0),
      tuesdayClosingTime: maybe(() => category.tuesdayClosingTime, 0),
      tuesdayOpenClose: maybe(() => category.tuesdayOpeningStatus, false),
      tuesdayOpeningTime: maybe(() => category.tuesdayOpeningTime, 0),
      twitter: maybe(() => category.business.twitterUrl.slice(24), ""),
      website: maybe(() => category.business.websiteUrl.slice(12), ""),
      wednesdayClosingTime: maybe(() => category.wednesdayClosingTime, 0),
      wednesdayOpenClose: maybe(() => category.wednesdayOpeningStatus, false),
      wednesdayOpeningTime: maybe(() => category.wednesdayOpeningTime, 0),
    }
    : {
      backgroundImageAlt: "",
      businessCategory: "",
      city: "",
      country: "",
      delivery: "",
      description: "",
      facebook: "",
      fridayClosingTime: 0,
      fridayOpenClose: false,
      fridayOpeningTime: 0,
      instagram: "",
      logo: "",
      mondayClosingTime: 0,
      mondayOpenClose: false,
      mondayOpeningTime: 0,
      name: "",
      phone: "",
      postalCode: "",
      rating: 0,
      reservationSystem: "",
      saturdayClosingTime: 0,
      saturdayOpenClose: false,
      saturdayOpeningTime: 0,
      seoDescription: "",
      seoTitle: "",
      status: "",
      streetAddress: "",
      streetAddress2: "",
      sundayClosingTime: 0,
      sundayOpenClose: false,
      sundayOpeningTime: 0,
      tags: "",
      thursdayClosingTime: 0,
      thursdayOpenClose: false,
      thursdayOpeningTime: 0,
      tuesdayClosingTime: 0,
      tuesdayOpenClose: false,
      tuesdayOpeningTime: 0,
      twitter: "",
      website: "",
      wednesdayClosingTime: 0,
      wednesdayOpenClose: false,
      wednesdayOpeningTime: 0,
    };

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
                <PageHeader title={category ? category.name : undefined} />
                <Grid>
                  <div>
                    <CategoryDetailsForm
                      category={category}
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      onChange={change}
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
                    <ProductImages
                      images={images}
                      placeholderImage={placeholderImage}
                      onImageDelete={onImageDelete}
                      onImageReorder={onImageReorder}
                      onImageEdit={undefined}
                      onImageUpload={onImageUpload}
                    />
                    {/* <CategoryBackground
                      data={data}
                      onImageUpload={onImageUpload}
                      onImageDelete={onImageDelete}
                      image={maybe(() => category.backgroundImage)}
                      onChange={change}
                    /> */}
                    <CardSpacer />
                    <SeoForm
                      helperText={intl.formatMessage({
                        defaultMessage:
                          "Add search engine title and description to make this category easier to find"
                      })}
                      title={data.seoTitle}
                      titlePlaceholder={data.name}
                      description={data.seoDescription}
                      descriptionPlaceholder={data.name}
                      loading={!category}
                      onChange={change}
                      disabled={disabled}
                    />
                    <CardSpacer />
                    {/* <TabContainer>
            <CategoriesTab
              isActive={currentTab === CategoryPageTab.categories}
              changeTab={changeTab}
            >
              <FormattedMessage
                defaultMessage="Subcategories"
                description="number of subcategories in category"
              />
            </CategoriesTab>
            <ProductsTab
              isActive={currentTab === CategoryPageTab.products}
              changeTab={changeTab}
            >
              <FormattedMessage
                defaultMessage="Products"
                description="number of products in category"
              />
            </ProductsTab>
          </TabContainer> */}
                    {/* <CardSpacer />
          {currentTab === CategoryPageTab.categories && (
            <Card>
              <CardTitle
                title={intl.formatMessage({
                  defaultMessage: "All Subcategories",
                  description: "section header"
                })}
                toolbar={
                  <Button
                    color="primary"
                    variant="text"
                    onClick={onAddCategory}
                  >
                    <FormattedMessage
                      defaultMessage="Create subcategory"
                      description="button"
                    />
                  </Button>
                }
              />
              <CategoryList
                categories={subcategories}
                disabled={disabled}
                isChecked={isChecked}
                isRoot={false}
                pageInfo={pageInfo}
                selected={selected}
                sort={undefined}
                params={paramsProps}
                toggle={toggle}
                toggleAll={toggleAll}
                toolbar={subcategoryListToolbar}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
                onRowClick={onCategoryClick}
                onSort={() => undefined}
              />
            </Card>
          )} */}
                    {/* {currentTab === CategoryPageTab.products && ( */}
                    {/* <CategoryProducts
                      categoryName={maybe(() => category.name)}
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
                    {/* )} */}
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
                  onDelete={onDelete}
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
  );
};
CategoryUpdatePage.displayName = "CategoryUpdatePage";
export default CategoryUpdatePage;
