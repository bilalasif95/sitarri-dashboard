import { DocumentNode } from "graphql";

import { PageInfoFragment } from "@saleor/types/PageInfoFragment";
import makeSearch, { SearchVariables, UseSearchHook } from "./makeSearch";

export interface SearchData {
  businessCategories: {
    edges: Array<{
      node: any;
    }>;
    pageInfo: PageInfoFragment;
  };
}

function makeTopLevelBusinessCategorySearch<
  TData extends SearchData,
  TVariables extends SearchVariables
>(query: DocumentNode): UseSearchHook<TData, TVariables> {
  return makeSearch<TData, TVariables>(query, result => {
    if (result.data.businessCategories.pageInfo.hasNextPage) {
      result.loadMore(
        (prev, next) => {
          if (
            prev.businessCategories.pageInfo.endCursor === next.businessCategories.pageInfo.endCursor
          ) {
            return prev;
          }

          return {
            ...prev,
            businessCategories: {
              ...prev.businessCategories,
              edges: [...prev.businessCategories.edges, ...next.businessCategories.edges],
              pageInfo: next.businessCategories.pageInfo
            }
          };
        },
        {
          ...result.variables,
          after: result.data.businessCategories.pageInfo.endCursor
        }
      );
    }
  });
}

export default makeTopLevelBusinessCategorySearch;
