import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "@saleor/components/ActionDialog";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import { ListViews } from "@saleor/types";
import { getSortParams } from "@saleor/utils/sort";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import { CategoryListPage } from "../../components/CategoryListPage/CategoryListPage";
import { useCategoryBulkDeleteMutation } from "../../mutations";
import { useRootCategoriesQuery } from "../../queries";
import { CategoryBulkDelete } from "../../types/CategoryBulkDelete";
import {
  storeAddUrl,
  StoreListUrlFilters,
  StoreListUrlQueryParams,
  storesUrl,
  StoreListUrlDialog,
  storesListUrl
} from "../../urls";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterTabs,
  // getFilterVariables,
  saveFilterTab
} from "./filter";
import { getSortQueryVariables } from "./sort";

interface CategoryListProps {
  params: StoreListUrlQueryParams;
}

export const CategoryList: React.FC<CategoryListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    params.ids
  );
  const { updateListSettings, settings } = useListSettings(
    ListViews.CATEGORY_LIST
  );
  const intl = useIntl();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      // filter: getFilterVariables(params),
      search: params.query,
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data, loading, refetch } = useRootCategoriesQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const changeFilterField = (filter: StoreListUrlFilters) => {
    reset();
    navigate(
      storesListUrl({
        ...getActiveFilters(params),
        ...filter,
        activeTab: undefined
      })
    );
  };

  const [openModal, closeModal] = createDialogActionHandlers<
    StoreListUrlDialog,
    StoreListUrlQueryParams
  >(navigate, storesListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      storesListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(storesListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.stores.pageInfo),
    paginationState,
    params
  );

  const handleCategoryBulkDelete = (data: CategoryBulkDelete) => {
    if (data.storeBulkdelete.storeErrors.length === 0) {
      navigate(storesListUrl(), true);
      refetch();
      reset();
    }
  };

  const [
    categoryBulkDelete,
    categoryBulkDeleteOpts
  ] = useCategoryBulkDeleteMutation({
    onCompleted: handleCategoryBulkDelete
  });

  const handleSort = createSortHandler(navigate, storesListUrl, params);

  return (
    <>
      <CategoryListPage
        categories={maybe(
          () => data.stores.edges.map(edge => edge.node),
          []
        )}
        currentTab={currentTab}
        initialSearch={params.query || ""}
        onSearchChange={query => changeFilterField({ query })}
        onAll={() => navigate(storesListUrl())}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal("delete-search")}
        onTabSave={() => openModal("save-search")}
        tabs={tabs.map(tab => tab.name)}
        settings={settings}
        sort={getSortParams(params)}
        onAdd={() => navigate(storeAddUrl())}
        onRowClick={id => () => navigate(storesUrl(id))}
        onSort={handleSort}
        disabled={loading}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        pageInfo={pageInfo}
        paramsProps={params}
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
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
        }
      />
      <ActionDialog
        confirmButtonState={categoryBulkDeleteOpts.status}
        onClose={() =>
          navigate(
            storesListUrl({
              ...params,
              action: undefined,
              ids: undefined
            })
          )
        }
        onConfirm={() =>
          categoryBulkDelete({
            variables: {
              ids: params.ids
            }
          })
        }
        open={params.action === "delete"}
        title={intl.formatMessage({
          defaultMessage: "Delete Store",
          description: "dialog title"
        })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete this store?} other{Are you sure you want to delete {displayQuantity} stores?}}"
            values={{
              counter: maybe(() => params.ids.length),
              displayQuantity: <strong>{maybe(() => params.ids.length)}</strong>
            }}
          />
        </DialogContentText>
        {/* <DialogContentText>
          <FormattedMessage defaultMessage="Remember this will also delete all products assigned to this category." />
        </DialogContentText> */}
      </ActionDialog>
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabDelete}
        tabName={maybe(() => tabs[currentTab - 1].name, "...")}
      />
    </>
  );
};
export default CategoryList;
