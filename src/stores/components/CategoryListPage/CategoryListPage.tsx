// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import { useIntl } from "react-intl";

import { CategoryFragment } from "@saleor/categories/types/CategoryFragment";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import SearchBar from "@saleor/components/SearchBar";
import { sectionNames } from "@saleor/intl";
import {
  ListActions,
  PageListProps,
  SearchPageProps,
  TabPageProps,
  SortPage
} from "@saleor/types";
import { CategoryListUrlSortField } from "@saleor/categories/urls";
import CategoryList from "../CategoryList";

export interface CategoryTableProps
  extends PageListProps,
  ListActions,
  SearchPageProps,
  SortPage<CategoryListUrlSortField>,
  TabPageProps {
  categories: CategoryFragment[];
  paramsProps: any;
}

export const CategoryListPage: React.FC<CategoryTableProps> = ({
  categories,
  currentTab,
  disabled,
  paramsProps,
  initialSearch,
  isChecked,
  pageInfo,
  selected,
  settings,
  tabs,
  toggle,
  toggleAll,
  toolbar,
  onAdd,
  onAll,
  onNextPage,
  onPreviousPage,
  onRowClick,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onUpdateListSettings,
  ...listProps
}) => {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.stores)}>
        {/* <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create Store"
            description="button"
          />
        </Button> */}
      </PageHeader>
      <Card>
        <SearchBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "Stores",
            description: "tab name"
          })}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Store"
          })}
          tabs={tabs}
          onAll={onAll}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <CategoryList
          categories={categories}
          disabled={disabled}
          isChecked={isChecked}
          isRoot={true}
          params={paramsProps}
          pageInfo={pageInfo}
          selected={selected}
          settings={settings}
          toggle={toggle}
          toggleAll={toggleAll}
          toolbar={toolbar}
          onAdd={onAdd}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onRowClick={onRowClick}
          onUpdateListSettings={onUpdateListSettings}
          {...listProps}
        />
      </Card>
    </Container>
  );
};
CategoryListPage.displayName = "CategoryListPage";
export default CategoryListPage;
