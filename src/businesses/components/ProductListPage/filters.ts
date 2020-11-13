import { defineMessages, IntlShape } from "react-intl";

import { FilterOpts, MinMax, AutocompleteFilterOpts } from "@saleor/types";
import { StockAvailability } from "@saleor/types/globalTypes";
import {
  createOptionsField,
  // createPriceField,
  createAutocompleteField
} from "@saleor/utils/filters/fields";
import { IFilter } from "@saleor/components/Filter";
import { sectionNames } from "@saleor/intl";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";

export enum ProductFilterKeys {
  attributes = "attributes",
  categories = "categories",
  user = "user",
  businessCategories = "businessCategories",
  collections = "collections",
  status = "status",
  price = "price",
  productType = "productType",
  stock = "stock"
}

export interface ProductListFilterOpts {
  attributes: Array<
    FilterOpts<string[]> & {
      choices: MultiAutocompleteChoiceType[];
      name: string;
      slug: string;
    }
  >;
  businessCategories: any;
  categories: FilterOpts<string[]> & AutocompleteFilterOpts;
  collections: FilterOpts<string[]> & AutocompleteFilterOpts;
  price: FilterOpts<MinMax>;
  productType: FilterOpts<string[]> & AutocompleteFilterOpts;
  status: FilterOpts<ProductStatus>;
  stockStatus: FilterOpts<StockAvailability>;
  user: any;
}

export enum ProductStatus {
  PUBLISHED = "published",
  HIDDEN = "hidden"
}

export enum User {
  SUPERUSER = "superuser",
  OTHER = "other"
}

const messages = defineMessages({
  available: {
    defaultMessage: "Available",
    description: "product status"
  },
  businessOwner: {
    defaultMessage: "Business Owner",
    description: "business onwer name"
  },
  hidden: {
    defaultMessage: "Not Verified",
    description: "business is not verified"
  },
  other: {
    defaultMessage: "Others",
    description: "other users"
  },
  outOfStock: {
    defaultMessage: "Out Of Stock",
    description: "product status"
  },
  price: {
    defaultMessage: "Price"
  },
  quantity: {
    defaultMessage: "Stock quantity",
    description: "product"
  },
  superAdmin: {
    defaultMessage: "Super Admin",
    description: "user"
  },
  visibility: {
    defaultMessage: "Status",
    description: "business status"
  },
  visible: {
    defaultMessage: "Verified",
    description: "business is verified"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: ProductListFilterOpts
): IFilter<ProductFilterKeys> {
  return [
    {
      ...createOptionsField(
        ProductFilterKeys.status,
        intl.formatMessage(messages.visibility),
        [opts.status.value],
        false,
        [
          {
            label: intl.formatMessage(messages.visible),
            value: ProductStatus.PUBLISHED
          },
          {
            label: intl.formatMessage(messages.hidden),
            value: ProductStatus.HIDDEN
          }
        ]
      ),
      active: opts.status.active
    },
    {
      ...createOptionsField(
        ProductFilterKeys.user,
        intl.formatMessage(messages.businessOwner),
        [opts.user.value],
        false,
        [
          {
            label: intl.formatMessage(messages.superAdmin),
            value: User.SUPERUSER
          },
          {
            label: intl.formatMessage(messages.other),
            value: User.OTHER
          }
        ]
      ),
      active: opts.user.active
    },
    // {
    //   ...createOptionsField(
    //     ProductFilterKeys.stock,
    //     intl.formatMessage(messages.quantity),
    //     [opts.stockStatus.value],
    //     false,
    //     [
    //       {
    //         label: intl.formatMessage(messages.available),
    //         value: StockAvailability.IN_STOCK
    //       },
    //       {
    //         label: intl.formatMessage(messages.outOfStock),
    //         value: StockAvailability.OUT_OF_STOCK
    //       }
    //     ]
    //   ),
    //   active: opts.stockStatus.active
    // },
    // {
    //   ...createPriceField(
    //     ProductFilterKeys.price,
    //     intl.formatMessage(messages.price),
    //     opts.price.value
    //   ),
    //   active: opts.price.active
    // },
    {
      ...createAutocompleteField(
        ProductFilterKeys.businessCategories,
        intl.formatMessage(sectionNames.businessCategories),
        opts.businessCategories.value,
        opts.businessCategories.displayValues,
        true,
        opts.businessCategories.choices,
        {
          hasMore: opts.businessCategories.hasMore,
          initialSearch: "",
          loading: opts.businessCategories.loading,
          onFetchMore: opts.businessCategories.onFetchMore,
          onSearchChange: opts.businessCategories.onSearchChange
        }
      ),
      active: opts.businessCategories.active
    },
    // {
    //   ...createAutocompleteField(
    //     ProductFilterKeys.collections,
    //     intl.formatMessage(sectionNames.collections),
    //     opts.collections.value,
    //     opts.collections.displayValues,
    //     true,
    //     opts.collections.choices,
    //     {
    //       hasMore: opts.collections.hasMore,
    //       initialSearch: "",
    //       loading: opts.collections.loading,
    //       onFetchMore: opts.collections.onFetchMore,
    //       onSearchChange: opts.collections.onSearchChange
    //     }
    //   ),
    //   active: opts.collections.active
    // },
    // {
    //   ...createAutocompleteField(
    //     ProductFilterKeys.productType,
    //     intl.formatMessage(sectionNames.productTypes),
    //     opts.productType.value,
    //     opts.productType.displayValues,
    //     true,
    //     opts.productType.choices,
    //     {
    //       hasMore: opts.productType.hasMore,
    //       initialSearch: "",
    //       loading: opts.productType.loading,
    //       onFetchMore: opts.productType.onFetchMore,
    //       onSearchChange: opts.productType.onSearchChange
    //     }
    //   ),
    //   active: opts.productType.active
    // },
    ...opts.attributes.map(attr => ({
      ...createOptionsField(
        attr.slug as any,
        attr.name,
        attr.value,
        true,
        attr.choices
      ),
      active: attr.active,
      group: ProductFilterKeys.attributes
    }))
  ];
}
