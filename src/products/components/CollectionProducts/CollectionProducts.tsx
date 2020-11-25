import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
// import StatusLabel from "@saleor/components/StatusLabel";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { maybe, renderCollection } from "../../../misc";
import { ListActions, PageListProps } from "../../../types";
import { CollectionDetails_collection } from "../../types/CollectionDetails";

const useStyles = makeStyles(
  theme => ({
    colActions: {
      "&:last-child": {
        paddingRight: 0
      },
      width: 76 + theme.spacing(0.5)
    },
    colName: {
      paddingLeft: 0,
      width: "auto"
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN
    },
    colPublished: {
      width: 400
    },
    colType: {
      width: 200
    },
    table: {
      tableLayout: "fixed"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "CollectionProducts" }
);

export interface CollectionProductsProps extends PageListProps, ListActions {
  collection: CollectionDetails_collection;
  onProductUnassign: (id: string, event: React.MouseEvent<any>) => void;
}

const numberOfColumns = 4;

const CollectionProducts: React.FC<CollectionProductsProps> = props => {
  const {
    collection,
    disabled,
    onAdd,
    onNextPage,
    onPreviousPage,
    onProductUnassign,
    onRowClick,
    pageInfo,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar
  } = props;

  const classes = useStyles(props);
  // const intl = useIntl();
  return (
    <Card>
      <CardTitle
        title={"Stores Availability"
          // !!collection ? (
          //   intl.formatMessage(
          //     {
          //       defaultMessage: "Products in {name}",
          //       description: "products in collection"
          //     },
          //     {
          //       name: maybe(() => collection.name, "...")
          //     }
          //   )
          // ) : (
          //   <Skeleton />
          // )
        }
        toolbar={
          <Button
            disabled={disabled}
            variant="text"
            color="primary"
            onClick={onAdd}
          >
            <FormattedMessage
              defaultMessage="Add Store"
              description="button"
            />
          </Button>
        }
      />
      <ResponsiveTable className={classes.table}>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={maybe(() => collection.storess.edges.map(edge => edge.node))}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={classes.colName}>
            <span>
              <FormattedMessage
                defaultMessage="Name"
                description="store name"
              />
            </span>
          </TableCell>
          {/* <TableCell className={classes.colType}>
            <FormattedMessage
              defaultMessage="Type"
              description="product type"
            />
          </TableCell> */}
          <TableCell className={classes.colPublished}>
            <FormattedMessage
              defaultMessage="Address"
              description="store address"
            />
          </TableCell>
          <TableCell className={classes.colActions} />
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={numberOfColumns}
              hasNextPage={maybe(() => pageInfo.hasNextPage)}
              onNextPage={onNextPage}
              hasPreviousPage={maybe(() => pageInfo.hasPreviousPage)}
              onPreviousPage={onPreviousPage}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            maybe(() => collection.storess.edges.map(edge => edge.node)),
            product => {
              const isSelected = product ? isChecked(product.id) : false;

              return (
                <TableRow
                  className={classes.tableRow}
                  hover={!!product}
                  onClick={!!product ? onRowClick(product.id) : undefined}
                  key={product ? product.id : "skeleton"}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                  <TableCell
                    className={classes.colName}
                  >
                    {maybe<React.ReactNode>(() => product.name, <Skeleton />)}
                  </TableCell>
                  {/* <TableCellAvatar
                    className={classes.colName}
                    thumbnail={maybe(() => product.thumbnail.url)}
                  >
                    {maybe<React.ReactNode>(() => product.name, <Skeleton />)}
                  </TableCellAvatar> */}
                  {/* <TableCell className={classes.colType}>
                    {maybe<React.ReactNode>(
                      () => product.productType.name,
                      <Skeleton />
                    )}
                  </TableCell> */}
                  <TableCell className={classes.colPublished}>
                    {maybe<React.ReactNode>(
                      () => (
                        product.address.streetAddress + "," + product.address.streetAddress2 + "," + product.address.city + "," + product.address.country.code
                        // <StatusLabel
                        //   label={
                        //     product.isPublished
                        //       ? intl.formatMessage({
                        //         defaultMessage: "Published",
                        //         description: "product is published"
                        //       })
                        //       : intl.formatMessage({
                        //         defaultMessage: "Not published",
                        //         description: "product is not published"
                        //       })
                        //   }
                        //   status={product.isPublished ? "success" : "error"}
                        // />
                      ),
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colActions}>
                    <IconButton
                      disabled={!product}
                      onClick={event => onProductUnassign(product.id, event)}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                {/* <TableCell /> */}
                <TableCell style={{ textAlign: "center" }} colSpan={numberOfColumns}>
                  <FormattedMessage defaultMessage="No stores found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

CollectionProducts.displayName = "CollectionProducts";
export default CollectionProducts;
