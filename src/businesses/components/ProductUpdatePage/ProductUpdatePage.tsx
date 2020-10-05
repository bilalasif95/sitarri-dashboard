// import { convertFromRaw, RawDraftContentState } from "draft-js";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
// import { diff } from "fast-array-diff";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import ColumnPicker, {
  ColumnPickerChoice
} from "@saleor/components/ColumnPicker";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import Form from "@saleor/components/Form";
// import Grid from "@saleor/components/Grid";
import SearchBar from "@saleor/components/SearchBar";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
// import SeoForm from "@saleor/components/SeoForm";
// import VisibilityCard from "@saleor/components/VisibilityCard";
// import useDateLocalize from "@saleor/hooks/useDateLocalize";
import useBulkActions from "@saleor/hooks/useBulkActions";
import { ProductListColumns, DEFAULT_INITIAL_PAGINATION_DATA } from "@saleor/config";
import useFormset from "@saleor/hooks/useFormset";
// import useStateFromProps from "@saleor/hooks/useStateFromProps";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { SearchCategories_search_edges_node } from "@saleor/searches/types/SearchCategories";
import { SearchCollections_search_edges_node } from "@saleor/searches/types/SearchCollections";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import { getSortParams, getSortUrlVariables } from "@saleor/utils/sort";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { FetchMoreProps, ListActions } from "@saleor/types";
// import createMultiAutocompleteSelectHandler from "@saleor/utils/handlers/multiAutocompleteSelectChangeHandler";
// import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import { WarehouseFragment } from "@saleor/warehouses/types/WarehouseFragment";
import {
  ProductDetails_product,
  ProductDetails_product_images,
  ProductDetails_product_variants
} from "../../types/ProductDetails";

import { ProductListVariables } from "../../types/ProductList";

import CategoryList from "../CategoryList";

import {
  AvailableInGridAttributes_availableInGrid_edges_node,
  AvailableInGridAttributes_grid_edges_node
} from "../../types/AvailableInGridAttributes";

import {
  getAttributeInputFromProduct,
  // getChoices,
  getProductUpdatePageFormData,
  // getSelectedAttributesFromProduct,
  // ProductAttributeValueChoices,
  ProductUpdatePageFormData,
  // getStockInputFromProduct
} from "../../utils/data";
// import {
//   createAttributeChangeHandler,
//   createAttributeMultiChangeHandler
// } from "../../utils/handlers";
// import ProductAttributes, { ProductAttributeInput } from "../ProductAttributes";
import { ProductAttributeInput } from "../ProductAttributes";
import ProductDetailsForm from "../ProductDetailsForm";
// import ProductImages from "../ProductImages";
// import ProductOrganization from "../ProductOrganization";
// import ProductPricing from "../ProductPricing";
// import ProductVariants from "../ProductVariants";
// import ProductStocks, { ProductStockInput } from "../ProductStocks";
import { ProductStockInput } from "../ProductStocks";

import { HomePageQuery } from "../../../home/queries";

import {
  createFilterStructure
} from "../ProductListPage/filters";

import BusinessProductList from "../BusinessProductList";

import {
  getCategoryFilterVariables,
  getFilterVariables,
  getFilterTabs,
  getFilterQueryParam,
} from "../../views/ProductList/filters";
import { getSortQueryVariables, getCategorySortQueryVariables } from "../../views/ProductList/sort";

import {
  TypedProductListQuery
} from "../../queries";

import {
  // businessesListUrl,
  ProductListUrlDialog,
  ProductListUrlQueryParams,
  ProductListUrlSortField
} from "../../urls";
import { productUrl, productListUrl } from "../../../products/urls";
import {
  categoryUrl,
  categoryAddUrl,
  categoryListUrl,
  CategoryListUrlFilters,
  CategoryListUrlDialog,
  CategoryListUrlQueryParams
} from "../../../categories/urls";
import { TypedCategoriesListQuery } from "../../../categories/queries";
import {
  areFiltersApplied,
  getActiveFilters
} from "../../../categories/views/CategoryList/filter";

export interface ProductUpdatePageProps extends ListActions {
  errors: ProductErrorFragment[];
  placeholderImage: string;
  collections: SearchCollections_search_edges_node[];
  categories: SearchCategories_search_edges_node[];
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  variants: ProductDetails_product_variants[];
  images: ProductDetails_product_images[];
  product: ProductDetails_product;
  availableInGridAttributes: AvailableInGridAttributes_availableInGrid_edges_node[];
  header: string;
  defaultSettings: any;
  hasMore: boolean;
  loading: boolean;
  currentTab: any;
  filterOpts: any;
  params: any;
  currencySymbol: string;
  settings: any;
  totalGridAttributes: number;
  initialSearch: string;
  tabs: any;
  gridAttributes: AvailableInGridAttributes_grid_edges_node[];
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouses: WarehouseFragment[];
  onFetchMore: () => void;
  onAll: () => void;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: any) => void;
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  onTabChange: (tab: number) => void;
  onVariantsAdd: () => void;
  onTabSave: () => void;
  onTabDelete: () => void;
  onAdd: () => void;
  onUpdateListSettings: (key: "columns" | "rowNumber", value: any) => void;
  onVariantShow: (id: string) => () => void;
  onImageDelete: (id: string) => () => void;
  onBack?();
  onDelete();
  onImageEdit?(id: string);
  onImageReorder?(event: { oldIndex: number; newIndex: number });
  onImageUpload(file: File);
  onSeoClick?();
  onSubmit?(data: ProductUpdatePageSubmitData);
  onVariantAdd?();
}

export interface ProductUpdatePageSubmitData extends ProductUpdatePageFormData {
  attributes: ProductAttributeInput[];
  collections: string[];
  addStocks: ProductStockInput[];
  updateStocks: ProductStockInput[];
  removeStocks: string[];
}

const useStyles = makeStyles(
  theme => ({
    columnPicker: {
      marginRight: theme.spacing(3)
    }
  }),
  { name: "ProductListPage" }
);

export const ProductUpdatePage: React.FC<ProductUpdatePageProps> = ({
  disabled,
  // categories: categoryChoiceList,
  // collections: collectionChoiceList,
  errors,
  gridAttributes,
  availableInGridAttributes,
  defaultSettings,
  hasMore,
  initialSearch,
  loading,
  currentTab,
  settings,
  params,
  currencySymbol,
  filterOpts,
  tabs,
  totalGridAttributes,
  // fetchCategories,
  // fetchCollections,
  // fetchMoreCategories,
  // fetchMoreCollections,
  // images,
  // header,
  // placeholderImage,
  product,
  saveButtonBarState,
  variants,
  // warehouses,
  onFetchMore,
  // onAll,
  onBack,
  onAdd,
  onDelete,
  // onTabDelete,
  // onSearchChange,
  onUpdateListSettings,
  // onTabChange,
  // onTabSave,
  // onImageDelete,
  // onImageEdit,
  // onImageReorder,
  // onImageUpload,
  // onSeoClick,
  onSubmit,
  // onFilterChange,
  // onVariantAdd,
  // onVariantsAdd,
  // onVariantShow,
  // isChecked,
  // selected,
  // toggle,
  // toggleAll,
  // toolbar
}, props) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const paginate = usePaginator();
  // const localizeDate = useDateLocalize();
  const [businesses, setBusinesses] = React.useState([]);
  const attributeInput = React.useMemo(
    () => getAttributeInputFromProduct(product),
    [product]
  );
  // const stockInput = React.useMemo(() => getStockInputFromProduct(product), [
  //   product
  // ]);
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  // const { change: changeAttributeData, data: attributes } = useFormset(
  //   attributeInput
  // );
  const { data: attributes } = useFormset(
    attributeInput
  );
  // const {
  // add: addStock,
  // change: changeStockData,
  // data: stocks,
  // remove: removeStock
  // } = useFormset(stockInput);

  // const [selectedAttributes, setSelectedAttributes] = useStateFromProps<
  //   ProductAttributeValueChoices[]
  // >(getSelectedAttributesFromProduct(product));

  // const [selectedCategory, setSelectedCategory] = useStateFromProps(
  //   maybe(() => product.category.name, "")
  // );

  // const [selectedCollections, setSelectedCollections] = useStateFromProps(
  //   getChoices(maybe(() => product.collections, []))
  // );

  const initialData = getProductUpdatePageFormData(product, variants);
  // const initialDescription = maybe<RawDraftContentState>(() =>
  //   JSON.parse(product.descriptionJson)
  // );

  // const categories = getChoices(categoryChoiceList);
  // const collections = getChoices(collectionChoiceList);
  // const currency = maybe(() => product.basePrice.currency);
  // const hasVariants = maybe(() => product.productType.hasVariants, false);

  const filterStructure = createFilterStructure(intl, filterOpts);
  const classes = useStyles(props);
  const columns: ColumnPickerChoice[] = [
    {
      label: intl.formatMessage({
        defaultMessage: "Published",
        description: "product status"
      }),
      value: "isPublished" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Price",
        description: "product price"
      }),
      value: "price" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Type",
        description: "product type"
      }),
      value: "productType" as ProductListColumns
    },
    ...availableInGridAttributes.map(attribute => ({
      label: attribute.name,
      value: `attribute:${attribute.id}`
    }))
  ];

  const handleSubmit = (data: ProductUpdatePageFormData) => {
    // const dataStocks = stocks.map(stock => stock.id);
    // const variantStocks = product.variants[0].stocks.map(
    //   stock => stock.warehouse.id
    // );
    // const stockDiff = diff(variantStocks, dataStocks);

    onSubmit({
      ...data,
      addStocks: [],
      // stocks.filter(stock =>
      //   stockDiff.added.some(addedStock => addedStock === stock.id)
      // ),
      attributes,
      removeStocks: [],
      // stockDiff.removed,
      updateStocks: [],
      // stocks.filter(
      //   stock => !stockDiff.added.some(addedStock => addedStock === stock.id)
      // )
    });
  };

  const [openModal] = createDialogActionHandlers<
    ProductListUrlDialog,
    ProductListUrlQueryParams
  >(navigate, productListUrl, params);

  const [openCategoryModal] = createDialogActionHandlers<
    CategoryListUrlDialog,
    CategoryListUrlQueryParams
  >(navigate, categoryListUrl, params);

  const currentCategoryTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const handleSave = (columns: ProductListColumns[]) =>
    onUpdateListSettings("columns", columns);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const filter = getFilterVariables(params);
  const sort = getSortQueryVariables(params);

  const queryVariables = React.useMemo<ProductListVariables>(
    () => ({
      ...paginationState,
      filter,
      sort
    }),
    [params, settings.rowNumber]
  );

  const categoryQueryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getCategoryFilterVariables(params),
      sort: getCategorySortQueryVariables(params)
    }),
    [params]
  );

  const handleSort = (field: ProductListUrlSortField, attributeId?: string) =>
    navigate(
      productListUrl({
        ...params,
        ...getSortUrlVariables(field, params),
        attributeId,
        ...DEFAULT_INITIAL_PAGINATION_DATA
      })
    );

  const categoryHandleSort = createSortHandler(navigate, categoryListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      productListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: productListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const changeFilterField = (filter: CategoryListUrlFilters) => {
    reset();
    navigate(
      categoryListUrl({
        ...getActiveFilters(params),
        ...filter,
        activeTab: undefined
      })
    );
  };

  const handleCategoryTabChange = (tab: number) => {
    reset();
    navigate(
      categoryListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  return (
    <HomePageQuery>
      {({ data }) => {
        maybe(() => setBusinesses(data.businesses.edges))
        return (
          <Form onSubmit={handleSubmit} initial={initialData} confirmLeave>
            {({ change, data, hasChanged, submit }) => (
              // {
              // {({ change, data, hasChanged, submit, triggerChange, toggleValue }) => {
              // const handleCollectionSelect = createMultiAutocompleteSelectHandler(
              //   toggleValue,
              //   setSelectedCollections,
              //   selectedCollections,
              //   collections
              // );
              // const handleCategorySelect = createSingleAutocompleteSelectHandler(
              //   change,
              //   setSelectedCategory,
              //   categories
              // );
              // const handleAttributeChange = createAttributeChangeHandler(
              //   changeAttributeData,
              //   setSelectedAttributes,
              //   selectedAttributes,
              //   attributes,
              //   triggerChange
              // );
              // const handleAttributeMultiChange = createAttributeMultiChangeHandler(
              //   changeAttributeData,
              //   setSelectedAttributes,
              //   selectedAttributes,
              //   attributes,
              //   triggerChange
              // );

              // return (
              <>
                <Container>
                  <AppHeader onBack={onBack}>
                    {intl.formatMessage(sectionNames.businesses)}
                  </AppHeader>
                  <div>
                    <ProductDetailsForm
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      businessNames={businesses}
                      // initialDescription={initialDescription}
                      onChange={change}
                    />
                    <CardSpacer />
                    <PageHeader title={intl.formatMessage(sectionNames.products)}>
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
                        onClick={onAdd}
                        color="primary"
                        variant="contained"
                        data-tc="add-product"
                      >
                        <FormattedMessage
                          defaultMessage="Create Product"
                          description="button"
                        />
                      </Button>
                    </PageHeader>
                    <Card>
                      <FilterBar
                        currencySymbol={currencySymbol}
                        currentTab={currentTab}
                        initialSearch={initialSearch}
                        onAll={resetFilters}
                        onFilterChange={changeFilters}
                        onSearchChange={handleSearchChange}
                        onTabChange={handleTabChange}
                        onTabDelete={() => openModal("delete-search")}
                        onTabSave={() => openModal("save-search")}
                        tabs={getFilterTabs().map(tab => tab.name)}
                        allTabLabel={intl.formatMessage({
                          defaultMessage: "All Products",
                          description: "tab name"
                        })}
                        filterStructure={filterStructure}
                        searchPlaceholder={intl.formatMessage({
                          defaultMessage: "Search Products..."
                        })}
                      />
                      <TypedProductListQuery displayLoader variables={queryVariables}>
                        {({ data, loading }) => {
                          const { loadNextPage, loadPreviousPage } = paginate(
                            maybe(() => data.products.pageInfo),
                            paginationState,
                            params
                          );
                          return (
                            <BusinessProductList
                              products={maybe(() =>
                                data.products.edges.map(edge => edge.node)
                              )}
                              toggle={toggle}
                              sort={{
                                asc: params.asc,
                                sort: params.sort
                              }}
                              onSort={handleSort}
                              isChecked={isSelected}
                              selected={listElements.length}
                              toggleAll={toggleAll}
                              toolbar={
                                <>
                                  <Button
                                    color="primary"
                                    onClick={() =>
                                      openModal("unpublish", {
                                        ids: listElements
                                      })
                                    }
                                  >
                                    <FormattedMessage
                                      defaultMessage="Unpublish"
                                      description="unpublish product, button"
                                    />
                                  </Button>
                                  <Button
                                    color="primary"
                                    onClick={() =>
                                      openModal("publish", {
                                        ids: listElements
                                      })
                                    }
                                  >
                                    <FormattedMessage
                                      defaultMessage="Publish"
                                      description="publish product, button"
                                    />
                                  </Button>
                                  <IconButton
                                    color="primary"
                                    onClick={() =>
                                      openModal("delete", {
                                        ids: listElements
                                      })
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </>
                              }
                              params={params}
                              activeAttributeSortId={params.attributeId}
                              onRowClick={id => () => navigate(productUrl(id))}
                              disabled={loading}
                              onNextPage={loadNextPage}
                              onPreviousPage={loadPreviousPage}
                              gridAttributes={gridAttributes}
                              settings={settings}
                              onUpdateListSettings={onUpdateListSettings}
                            />
                          )
                        }}
                      </TypedProductListQuery>
                    </Card>
                    <CardSpacer />
                    <PageHeader title={intl.formatMessage(sectionNames.categories)}>
                      <Button color="primary" variant="contained" onClick={() => navigate(categoryAddUrl())}>
                        <FormattedMessage
                          defaultMessage="Create category"
                          description="button"
                        />
                      </Button>
                    </PageHeader>
                    <Card>
                      <SearchBar
                        allTabLabel={intl.formatMessage({
                          defaultMessage: "All Categories",
                          description: "tab name"
                        })}
                        currentTab={currentCategoryTab}
                        initialSearch={initialSearch}
                        searchPlaceholder={intl.formatMessage({
                          defaultMessage: "Search Category"
                        })}
                        tabs={tabs}
                        onAll={() => navigate(categoryListUrl())}
                        onSearchChange={query => changeFilterField({ query })}
                        onTabChange={handleCategoryTabChange}
                        onTabDelete={() => openCategoryModal("delete-search")}
                        onTabSave={() => openCategoryModal("save-search")}
                      />
                      <TypedCategoriesListQuery displayLoader variables={categoryQueryVariables}>
                        {({ data }) => {
                          const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
                            maybe(() => data.categories.pageInfo),
                            paginationState,
                            params
                          );
                          return (
                            <CategoryList
                              categories={maybe(
                                () => data.categories.edges.map(edge => edge.node),
                                []
                              )}
                              disabled={disabled}
                              isChecked={isSelected}
                              isRoot={true}
                              pageInfo={pageInfo}
                              selected={listElements.length}
                              settings={settings}
                              toggle={toggle}
                              toggleAll={toggleAll}
                              toolbar={
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    openCategoryModal("delete", {
                                      ids: listElements
                                    })
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                              onAdd={() => navigate(categoryAddUrl())}
                              onNextPage={loadNextPage}
                              onPreviousPage={loadPreviousPage}
                              onRowClick={id => () => navigate(categoryUrl(id))}
                              onUpdateListSettings={onUpdateListSettings}
                              sort={getSortParams(params)}
                              onSort={categoryHandleSort}
                            />
                          )
                        }}
                      </TypedCategoriesListQuery>
                    </Card>
                  </div>
                  {/* <PageHeader title={header} />
              <Grid>
                <div>
                  <ProductDetailsForm
                    data={data}
                    disabled={disabled}
                    errors={errors}
                    initialDescription={initialDescription}
                    onChange={change}
                  />
                  <CardSpacer />
                  <ProductImages
                    images={images}
                    placeholderImage={placeholderImage}
                    onImageDelete={onImageDelete}
                    onImageReorder={onImageReorder}
                    onImageEdit={onImageEdit}
                    onImageUpload={onImageUpload}
                  />
                  <CardSpacer />
                  {attributes.length > 0 && (
                    <ProductAttributes
                      attributes={attributes}
                      disabled={disabled}
                      onChange={handleAttributeChange}
                      onMultiChange={handleAttributeMultiChange}
                    />
                  )}
                  <CardSpacer />
                  <ProductPricing
                    currency={currency}
                    data={data}
                    disabled={disabled}
                    errors={errors}
                    onChange={change}
                  />
                  <CardSpacer />
                  {hasVariants ? (
                    <ProductVariants
                      disabled={disabled}
                      variants={variants}
                      fallbackPrice={product ? product.basePrice : undefined}
                      onRowClick={onVariantShow}
                      onVariantAdd={onVariantAdd}
                      onVariantsAdd={onVariantsAdd}
                      toolbar={toolbar}
                      isChecked={isChecked}
                      selected={selected}
                      toggle={toggle}
                      toggleAll={toggleAll}
                    />
                  ) : (
                    <ProductStocks
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      stocks={stocks}
                      warehouses={warehouses}
                      onChange={(id, value) => {
                        triggerChange();
                        changeStockData(id, value);
                      }}
                      onFormDataChange={change}
                      onWarehouseStockAdd={id => {
                        triggerChange();
                        addStock({
                          data: null,
                          id,
                          label: warehouses.find(
                            warehouse => warehouse.id === id
                          ).name,
                          value: "0"
                        });
                      }}
                      onWarehouseStockDelete={id => {
                        triggerChange();
                        removeStock(id);
                      }}
                    />
                  )}
                  <CardSpacer />
                  <SeoForm
                    title={data.seoTitle}
                    titlePlaceholder={data.name}
                    description={data.seoDescription}
                    descriptionPlaceholder={maybe(() =>
                      convertFromRaw(data.description)
                        .getPlainText()
                        .slice(0, 300)
                    )}
                    loading={disabled}
                    onClick={onSeoClick}
                    onChange={change}
                    helperText={intl.formatMessage({
                      defaultMessage:
                        "Add search engine title and description to make this product easier to find"
                    })}
                  />
                </div>
                <div>
                  <ProductOrganization
                    canChangeType={false}
                    categories={categories}
                    categoryInputDisplayValue={selectedCategory}
                    collections={collections}
                    collectionsInputDisplayValue={selectedCollections}
                    data={data}
                    disabled={disabled}
                    errors={errors}
                    fetchCategories={fetchCategories}
                    fetchCollections={fetchCollections}
                    fetchMoreCategories={fetchMoreCategories}
                    fetchMoreCollections={fetchMoreCollections}
                    productType={maybe(() => product.productType)}
                    onCategoryChange={handleCategorySelect}
                    onCollectionChange={handleCollectionSelect}
                  />
                  <CardSpacer />
                  <VisibilityCard
                    data={data}
                    errors={errors}
                    disabled={disabled}
                    hiddenMessage={intl.formatMessage(
                      {
                        defaultMessage: "will be visible from {date}",
                        description: "product"
                      },
                      {
                        date: localizeDate(data.publicationDate)
                      }
                    )}
                    onChange={change}
                    visibleMessage={intl.formatMessage(
                      {
                        defaultMessage: "since {date}",
                        description: "product"
                      },
                      {
                        date: localizeDate(data.publicationDate)
                      }
                    )}
                  />
                </div>
              </Grid> */}
                  <SaveButtonBar
                    onCancel={onBack}
                    onDelete={onDelete}
                    onSave={submit}
                    state={saveButtonBarState}
                    disabled={disabled || !hasChanged}
                  />
                </Container>
              </>
              // );
              // }
            )
            }
          </Form>
        )
      }
      }
    </HomePageQuery>
  );
};
ProductUpdatePage.displayName = "ProductUpdatePage";
export default ProductUpdatePage;
