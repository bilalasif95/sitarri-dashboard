import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import Checkbox from "@saleor/components/Checkbox";
// import Money from "@saleor/components/Money";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import StatusLabel from "@saleor/components/StatusLabel";
import TableCellAvatar, {
  AVATAR_MARGIN
} from "@saleor/components/TableCellAvatar";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { ProductListColumns } from "@saleor/config";
import useNavigator from "@saleor/hooks/useNavigator";
import { maybe, renderCollection } from "@saleor/misc";
import {
  getAttributeIdFromColumnValue,
  isAttributeColumnValue
} from "@saleor/products/components/ProductListPage/utils";
import { AvailableInGridAttributes_grid_edges_node } from "@saleor/products/types/AvailableInGridAttributes";
import { ProductList_products_edges_node } from "@saleor/products/types/ProductList";
import { ProductListUrlSortField } from "@saleor/products/urls";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import TDisplayColumn, {
  DisplayColumnProps
} from "@saleor/utils/columns/DisplayColumn";
import { getArrowDirection } from "@saleor/utils/sort";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";

import {
  businessesListUrl,
  ProductListUrlQueryParams,
  ProductListUrlDialog
} from "../../urls";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colPrice: {
        width: 200
      },
      colPublished: {
        width: 200
      },
      colType: {
        width: 200
      }
    },
    colAttribute: {
      width: 150
    },
    colFill: {
      padding: 0,
      width: "100%"
    },
    colName: {
      "&$colNameFixed": {
        width: 250
      }
    },
    colNameFixed: {},
    colNameHeader: {
      marginLeft: AVATAR_MARGIN
    },
    colPrice: {
      textAlign: "right"
    },
    colPublished: {},
    colType: {},
    link: {
      cursor: "pointer"
    },
    table: {
      tableLayout: "fixed"
    },
    tableContainer: {
      overflowX: "scroll"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    }
  }),
  { name: "ProductList" }
);

const DisplayColumn = TDisplayColumn as React.FunctionComponent<
  DisplayColumnProps<ProductListColumns>
>;

interface ProductListProps
  extends ListProps<ProductListColumns>,
  ListActions,
  SortPage<ProductListUrlSortField> {
  activeAttributeSortId: string;
  gridAttributes: AvailableInGridAttributes_grid_edges_node[];
  products: ProductList_products_edges_node[];
  params: ProductListUrlQueryParams;
}

export const ProductList: React.FC<ProductListProps> = (props, { params }) => {
  const {
    activeAttributeSortId,
    settings,
    disabled,
    isChecked,
    gridAttributes,
    pageInfo,
    products,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const gridAttributesFromSettings = settings.columns.filter(
    isAttributeColumnValue
  );
  const numberOfColumns = 3 + settings.columns.length;
  const navigate = useNavigator();
  const [openModal] = createDialogActionHandlers<
    ProductListUrlDialog,
    ProductListUrlQueryParams
  >(navigate, businessesListUrl, params);

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <colgroup>
          <col />
          <col className={classes.colName} />
          <DisplayColumn column="productType" displayColumns={settings.columns}>
            <col className={classes.colType} />
          </DisplayColumn>
          <DisplayColumn column="isPublished" displayColumns={settings.columns}>
            <col className={classes.colPublished} />
          </DisplayColumn>
          {gridAttributesFromSettings.map(gridAttribute => (
            <col className={classes.colAttribute} key={gridAttribute} />
          ))}
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <col className={classes.colPrice} />
          </DisplayColumn>
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={products}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            arrowPosition="right"
            className={classNames(classes.colName, {
              [classes.colNameFixed]: settings.columns.length > 4
            })}
            direction={
              sort.sort === ProductListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ProductListUrlSortField.name)}
          >
            <span className={classes.colNameHeader}>
              <FormattedMessage defaultMessage="Name" description="business" />
            </span>
          </TableCellHeader>
          <DisplayColumn column="productType" displayColumns={settings.columns}>
            <TableCellHeader
              className={classes.colType}
            // direction={
            //   sort.sort === ProductListUrlSortField.productType
            //     ? getArrowDirection(sort.asc)
            //     : undefined
            // }
            // onClick={() => onSort(ProductListUrlSortField.productType)}
            >
              <FormattedMessage
                defaultMessage="Website"
                description="business website"
              />
            </TableCellHeader>
          </DisplayColumn>
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <TableCellHeader
              className={classes.colPrice}
            // direction={
            //   sort.sort === ProductListUrlSortField.price
            //     ? getArrowDirection(sort.asc)
            //     : undefined
            // }
            // textAlign="right"
            // onClick={() => onSort(ProductListUrlSortField.price)}
            >
              <FormattedMessage
                defaultMessage="Business Owner"
                description="business owner"
              />
            </TableCellHeader>
          </DisplayColumn>
          <DisplayColumn column="isPublished" displayColumns={settings.columns}>
            <TableCellHeader
              className={classes.colPublished}
            // direction={
            //   sort.sort === ProductListUrlSortField.status
            //     ? getArrowDirection(sort.asc)
            //     : undefined
            // }
            // onClick={() => onSort(ProductListUrlSortField.status)}
            >
              <FormattedMessage
                defaultMessage="Status"
                description="business status"
              />
            </TableCellHeader>
          </DisplayColumn>
          {gridAttributesFromSettings.map(gridAttributeFromSettings => {
            const attributeId = getAttributeIdFromColumnValue(
              gridAttributeFromSettings
            );

            return (
              <TableCellHeader
                className={classes.colAttribute}
                direction={
                  sort.sort === ProductListUrlSortField.attribute &&
                    attributeId === activeAttributeSortId
                    ? getArrowDirection(sort.asc)
                    : undefined
                }
                onClick={() =>
                  onSort(ProductListUrlSortField.attribute, attributeId)
                }
                key={gridAttributeFromSettings}
              >
                {maybe<React.ReactNode>(
                  () =>
                    gridAttributes.find(
                      gridAttribute => attributeId === gridAttribute.id
                    ).name,
                  <Skeleton />
                )}
              </TableCellHeader>
            );
          })}
          {/* <DisplayColumn column="isPublished" displayColumns={settings.columns}> */}
          <TableCellHeader
            className={classes.colPublished}
          >
            <FormattedMessage
              defaultMessage="Actions"
              description="business actions"
            />
          </TableCellHeader>
          {/* </DisplayColumn> */}
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
            products,
            product => {
              const isSelected = product ? isChecked(product.id) : false;
              return (
                <TableRow
                  selected={isSelected}
                  hover={!!product}
                  key={product ? product.id : "skeleton"}
                  // onClick={product && onRowClick(product.id)}
                  className={classes.link}
                  data-tc="id"
                  data-tc-id={maybe(() => product.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                  <TableCellAvatar
                    className={classes.colName}
                    thumbnail={maybe(() => product.logo)}
                    data-tc="name"
                  >
                    {maybe<React.ReactNode>(() => product.name, <Skeleton />)}
                  </TableCellAvatar>
                  <DisplayColumn
                    column="productType"
                    displayColumns={settings.columns}
                  >
                    <TableCell
                      className={classes.colType}
                      data-tc="product-type"
                    >
                      {product && product.websiteUrl ? (
                        <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer">{product.websiteUrl.slice(8)}</a>
                      ) : (
                          <Skeleton />
                        )}
                    </TableCell>
                  </DisplayColumn>
                  <DisplayColumn
                    column="price"
                    displayColumns={settings.columns}
                  >
                    <TableCell className={classes.colType}>
                      {maybe(() => product.user.edges.length > 0) ? (
                        maybe(() => product.user.edges[0].node.isSuperuser) ? (
                          <span>Super Admin</span>
                          // <Money money={product.basePrice} />
                        ) : <span>{maybe(() => product.user.edges[0].node.email)}</span>
                      ) : (
                          <Skeleton />
                        )}
                    </TableCell>
                  </DisplayColumn>
                  <DisplayColumn
                    column="isPublished"
                    displayColumns={settings.columns}
                  >
                    <TableCell
                      className={classes.colPublished}
                      data-tc="isPublished"
                      data-tc-is-published={maybe(() => product.isVerified)}
                    >
                      {product &&
                        maybe(() => product.isVerified !== undefined) ? (
                          <StatusLabel
                            label={
                              product.isVerified
                                ?
                                intl.formatMessage({
                                  defaultMessage: "Verified",
                                  description: "business status"
                                })
                                : intl.formatMessage({
                                  defaultMessage: "Not Verified",
                                  description: "business status"
                                })
                            }
                            status={
                              product.isVerified ?
                                "success"
                                : "error"
                            }
                          />
                        ) : (
                          <Skeleton />
                        )
                      }
                    </TableCell>
                  </DisplayColumn>
                  {gridAttributesFromSettings.map(gridAttribute => (
                    <TableCell
                      className={classes.colAttribute}
                      key={gridAttribute}
                      data-tc="attribute"
                      data-tc-attribute={getAttributeIdFromColumnValue(
                        gridAttribute
                      )}
                    >
                      {maybe<React.ReactNode>(() => {
                        const attribute = product.attributes.find(
                          attribute =>
                            attribute.attribute.id ===
                            getAttributeIdFromColumnValue(gridAttribute)
                        );
                        if (attribute) {
                          return attribute.values
                            .map(value => value.name)
                            .join(", ");
                        }
                        return "-";
                      }, <Skeleton />)}
                    </TableCell>
                  ))}
                  <TableCell className={classes.colPublished}>
                    <IconButton
                      color="primary"
                      onClick={product ? onRowClick(product.id) : undefined}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        openModal("delete", {
                          ids: [
                            product.id
                          ]
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage defaultMessage="No businesses found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};
ProductList.displayName = "ProductList";
export default ProductList;
