import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { FormattedMessage } from "react-intl";

// import { CategoryFragment } from "@saleor/categories/types/CategoryFragment";
// import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import useNavigator from "@saleor/hooks/useNavigator";
import { maybe, renderCollection } from "@saleor/misc";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { CategoryListUrlSortField } from "@saleor/categories/urls";
import TableCellHeader from "@saleor/components/TableCellHeader";
import { getArrowDirection } from "@saleor/utils/sort";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";

import {
  storesListUrl,
  StoreListUrlQueryParams,
  StoreListUrlDialog
} from "../../../stores/urls";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        // width: 200
      },
      colProducts: {
        // width: 530
      },
      colSubcategories: {
        width: 530
      }
    },
    colName: {
      paddingLeft: 0
    },
    colProducts: {
      "& div": {
        "& div": {
          paddingRight: "1.5rem",
          width: "100%",
        }
      },
      textAlign: "right",
    },
    colSubcategories: {
      // textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "CategoryList" }
);

interface CategoryListProps
  extends ListProps,
  ListActions,
  SortPage<CategoryListUrlSortField> {
  categories?: any[];
  isRoot: boolean;
  params: StoreListUrlQueryParams;
  onAdd?();
}

const numberOfColumns = 3;

const CategoryList: React.FC<CategoryListProps> = (props, { params }) => {
  const {
    categories,
    disabled,
    settings,
    sort,
    pageInfo,
    isChecked,
    isRoot,
    selected,
    // toggle,
    toggleAll,
    toolbar,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort
  } = props;

  const classes = useStyles(props);
  const navigate = useNavigator();
  const [openModal] = createDialogActionHandlers<
    StoreListUrlDialog,
    StoreListUrlQueryParams
  >(navigate, storesListUrl, params);

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={[]}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          className={classes.colName}
          disableClick={!isRoot}
          onClick={() => isRoot && onSort(CategoryListUrlSortField.name)}
        >
          <FormattedMessage defaultMessage="Name" />
        </TableCellHeader>
        <TableCellHeader
          // direction={
          //   isRoot && sort.sort === CategoryListUrlSortField.subcategoryCount
          //     ? getArrowDirection(sort.asc)
          //     : undefined
          // }
          className={classes.colSubcategories}
        // disableClick={!isRoot}
        // onClick={() =>
        //   isRoot && onSort(CategoryListUrlSortField.subcategoryCount)
        // }
        >
          <FormattedMessage defaultMessage="Address" />
        </TableCellHeader>
        {/* <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.subcategoryCount
              ? getArrowDirection(sort.asc)
              : undefined
          }
          className={classes.colProducts}
          disableClick={!isRoot}
          onClick={() =>
            isRoot && onSort(CategoryListUrlSortField.subcategoryCount)
          }
        >
          <FormattedMessage defaultMessage="Business" />
        </TableCellHeader> */}
        <TableCellHeader
          // direction={
          //   isRoot && sort.sort === CategoryListUrlSortField.productCount
          //     ? getArrowDirection(sort.asc)
          //     : undefined
          // }
          className={classes.colProducts}
        // disableClick={!isRoot}
        // onClick={() =>
        //   isRoot && onSort(CategoryListUrlSortField.productCount)
        // }
        >
          <FormattedMessage
            defaultMessage="Actions"
            description="number of products"
          />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          categories,
          category => {
            const isSelected = category ? isChecked(category.id) : false;

            return (
              <TableRow
                className={classes.tableRow}
                hover={!!category}
                // onClick={category ? onRowClick(category.id) : undefined}
                key={category ? category.id : "skeleton"}
                selected={isSelected}
                data-tc="id"
                data-tc-id={maybe(() => category.id)}
              >
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(category.id)}
                  />
                </TableCell> */}
                <TableCell className={classes.colName} data-tc="name">
                  {category && category.name ? category.name : <Skeleton />}
                </TableCell>
                <TableCell className={classes.colSubcategories}>
                  {(category && category.address !== undefined) ||
                    category.address !== null ? (
                      category.address &&
                      category.address.streetAddress && (
                        <>
                          {category.address.streetAddress +
                            ", " + category.address.streetAddress2 + ", " +
                            category.address.city + ", " + category.address.country.code}
                        </>
                      )
                    ) : (
                      <Skeleton />
                    )}
                </TableCell>
                {/* <TableCell className={classes.colProducts}>
                  {(category && category.business !== undefined) || (category && category.business !== null) ? (
                    category && category.business && category.business.name
                  ) : (
                      <Skeleton />
                    )}
                </TableCell> */}
                <TableCell className={classes.colProducts}>
                  <IconButton
                    color="primary"
                    onClick={category ? onRowClick(category.id) : undefined}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      openModal("delete", {
                        ids: [category.id]
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* {category &&
                  category.products &&
                  category.products.totalCount !== undefined ? (
                    category.products.totalCount
                  ) : (
                    <Skeleton />
                  )} */}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {/* {isRoot ? ( */}
                <FormattedMessage defaultMessage="No stores found" />
                {/* ) : (
                  <FormattedMessage defaultMessage="No subcategories found" />
                )} */}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};

CategoryList.displayName = "CategoryList";
export default CategoryList;
