import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import { ListActions, PageListProps } from "../../../types";
// import { CategoryDetails_category_products_edges_node } from "../../types/CategoryDetails";
import CategoryProductList from "../CategoryProductList";

interface CategoryProductsProps extends PageListProps, ListActions {
  products: any;
  categoryName: string;
  onProductUnassign: (id: string, event: React.MouseEvent<any>) => void;
}

export const CategoryProducts: React.FC<CategoryProductsProps> = ({
  products,
  disabled,
  pageInfo,
  onAdd,
  onNextPage,
  onPreviousPage,
  onRowClick,
  categoryName,
  isChecked,
  onProductUnassign,
  selected,
  toggle,
  toggleAll,
  toolbar
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(
          {
            // defaultMessage: "Products in {categoryName}",
            defaultMessage: "Products available",
            description: "header"
          },
          { categoryName }
        )}
        toolbar={
          <Button color="primary" variant="text" onClick={onAdd}>
            <FormattedMessage
              defaultMessage="Add product"
              description="button"
            />
          </Button>
        }
      />
      <CategoryProductList
        products={products}
        disabled={disabled}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowClick={onRowClick}
        selected={selected}
        isChecked={isChecked}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={toolbar}
        onProductUnassign={onProductUnassign}
      />
    </Card>
  );
};

CategoryProducts.displayName = "CategoryProducts";
export default CategoryProducts;
