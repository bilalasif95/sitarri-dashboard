import { CategoryFilterInput } from "@saleor/types/globalTypes";
import useUser from "@saleor/hooks/useUser";
import {
  createFilterTabUtils,
  createFilterUtils
} from "../../../utils/filters";
import {
  StoreListUrlFilters,
  CategoryListUrlFiltersEnum,
  StoreListUrlQueryParams
} from "../../urls";

export const CATEGORY_FILTERS_KEY = "categoryFilters";

export function getFilterVariables(
  params: StoreListUrlFilters
): CategoryFilterInput {
  const { user } = useUser();
  return {
    search: params.query,
    store: user.businessUser.edges && user.businessUser.edges[0] && user.businessUser.edges[0].node.businessStore.edges && user.businessUser.edges[0].node.businessStore.edges[0] && user.businessUser.edges[0].node.businessStore.edges[0].node.id,
  };
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<StoreListUrlFilters>(CATEGORY_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  StoreListUrlQueryParams,
  StoreListUrlFilters
>(CategoryListUrlFiltersEnum);
