import { DocumentNode } from "graphql";
import { useState } from "react";
import { QueryResult } from "react-apollo";
// import useUser from "@saleor/hooks/useUser";
import makeQuery, { UseQueryResult } from "./makeQuery";
import useDebounce from "./useDebounce";

export interface SearchVariables {
  after?: string;
  first: number;
  query: string;
  business?: string;
}

export interface UseSearchResult<TData, TVariables extends SearchVariables> {
  loadMore: () => void;
  result: QueryResult<TData, TVariables>;
  search: (query: string) => void;
}
export type UseSearchOpts<TVariables extends SearchVariables> = Partial<{
  skip: boolean;
  variables: TVariables;
}>;
export type UseSearchHook<TData, TVariables extends SearchVariables> = (
  opts: UseSearchOpts<TVariables>
) => UseSearchResult<TData, TVariables>;

function makeSearch<TData, TVariables extends SearchVariables>(
  query: DocumentNode,
  loadMoreFn: (result: UseQueryResult<TData, TVariables>) => void
): UseSearchHook<TData, TVariables> {
  const useSearchQuery = makeQuery<TData, TVariables>(query);

  function useSearch(
    opts: UseSearchOpts<TVariables>
  ): UseSearchResult<TData, TVariables> {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(setSearchQuery);
    // const { user } = useUser();
    const result = useSearchQuery({
      ...opts,
      displayLoader: true,
      variables: {
        ...opts.variables,
        query: searchQuery,
        // store: user.businessUser.edges && user.businessUser.edges[0] && user.businessUser.edges[0].node.businessStore.edges && user.businessUser.edges[0].node.businessStore.edges[0] && user.businessUser.edges[0].node.businessStore.edges[0].node.id,
      }
    });

    return {
      loadMore: () => loadMoreFn(result),
      result,
      search: debouncedSearch
    };
  }

  return useSearch;
}

export default makeSearch;
