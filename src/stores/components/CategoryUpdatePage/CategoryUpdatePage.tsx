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
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
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
import CategoryProducts from "../CategoryProducts";

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
}

export enum CategoryPageTab {
  categories = "categories",
  products = "products"
}

export interface CategoryUpdatePageProps
  extends TabListActions<"productListToolbar" | "subcategoryListToolbar"> {
  changeTab: (index: CategoryPageTab) => void;
  currentTab: CategoryPageTab;
  errors: ProductErrorFragment[];
  disabled: boolean;
  paramsProps: any;
  // placeholderImage: string;
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
  // onImageEdit?(id: string);
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
  pageInfo,
  // placeholderImage,
  // onImageEdit,
  onImageReorder,
  products,
  images,
  saveButtonBarState,
  latlngError,
  // subcategories,
  // onAddCategory,
  onAddProduct,
  onBack,
  // onCategoryClick,
  onDelete,
  onNextPage,
  onPreviousPage,
  onProductClick,
  onSubmit,
  onImageDelete,
  onImageUpload,
  isChecked,
  productListToolbar,
  selected,
  // subcategoryListToolbar,
  toggle,
  toggleAll
}: CategoryUpdatePageProps) => {
  const intl = useIntl();
  const shop = useShop();
  const [businesses, setBusinesses] = React.useState([]);
  const initialData: FormData = category
    ? {
      backgroundImageAlt: maybe(() => category.backgroundImage.alt, ""),
      businessCategory: maybe(() => category.category, ""),
      city: maybe(() => category.address.city, ""),
      country: maybe(() => category.address.country, ""),
      delivery: maybe(() => category.deliverooUrl, ""),
      description: maybe(() => category.description, ""),
      facebook: maybe(() => category.facebookUrl, ""),
      fridayOpenClose: maybe(() => true, false),
      instagram: maybe(() => category.instagramUrl, ""),
      logo: maybe(() => category.logo, ""),
      mondayOpenClose: maybe(() => true, false),
      name: maybe(() => category.name, ""),
      phone: maybe(() => category.phone, ""),
      postalCode: maybe(() => category.address.postalCode, ""),
      reservationSystem: maybe(() => category.uberEatsUrl, ""),
      saturdayOpenClose: maybe(() => true, false),
      seoDescription: maybe(() => category.seoDescription, ""),
      seoTitle: maybe(() => category.seoTitle, ""),
      status: maybe(() => "", ""),
      streetAddress: maybe(() => category.address.streetAddress, ""),
      streetAddress2: maybe(() => "", ""),
      sundayOpenClose: maybe(() => false, false),
      tags: maybe(() => category.tags, ""),
      thursdayOpenClose: maybe(() => true, false),
      tuesdayOpenClose: maybe(() => true, false),
      twitter: maybe(() => category.twitterUrl, ""),
      website: maybe(() => category.websiteUrl, ""),
      wednesdayOpenClose: maybe(() => true, false),
    }
    : {
      backgroundImageAlt: "",
      businessCategory: "",
      city: "",
      country: "",
      delivery: "",
      description: "",
      facebook: "",
      fridayOpenClose: false,
      instagram: "",
      logo: "",
      mondayOpenClose: false,
      name: "",
      phone: "",
      postalCode: "",
      reservationSystem: "",
      saturdayOpenClose: false,
      seoDescription: "",
      seoTitle: "",
      status: "",
      streetAddress: "",
      streetAddress2: "",
      sundayOpenClose: false,
      tags: "",
      thursdayOpenClose: false,
      tuesdayOpenClose: false,
      twitter: "",
      website: "",
      wednesdayOpenClose: false,
    };
  return (
    <HomePageQuery>
      {({ data }) => {
        maybe(() => setBusinesses(data.businesses.edges))
        return (
          <Form onSubmit={onSubmit} initial={initialData} confirmLeave>
            {({ data, change, submit, hasChanged }) => (
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
                      // placeholderImage={placeholderImage}
                      onImageDelete={onImageDelete}
                      onImageReorder={onImageReorder}
                      // onImageEdit={onImageEdit}
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
                    <CategoryProducts
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
                    />
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
                  disabled={disabled || !hasChanged}
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
