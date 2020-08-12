import gql from "graphql-tag";

import { TypedMutation } from "@saleor/mutations";
import { TypedQuery } from "../queries";
import { Home } from "./types/Home";

import { ClaimBusiness, ClaimBusinessVariables } from "./types/ClaimBusiness";
import { CreateBusiness, CreateBusinessVariables } from "./types/CreateBusiness";
import { CreateStore, CreateStoreVariables } from "./types/CreateStore";
import { EmployeeAccess, EmployeeAccessVariables } from "./types/EmployeeAccess";
import { ProductBulkCreate, ProductBulkCreateVariables } from "./types/ProductBulkCreate";

const home = gql`
  query Home {
    businesses(first: 100) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

// salesToday: ordersTotal(period: TODAY) {
//   gross {
//     amount
//     currency
//   }
// }
// ordersToday: orders(created: TODAY) {
//   totalCount
// }
// ordersToFulfill: orders(status: READY_TO_FULFILL) {
//   totalCount
// }
// ordersToCapture: orders(status: READY_TO_CAPTURE) {
//   totalCount
// }
// productsOutOfStock: products(stockAvailability: OUT_OF_STOCK) {
//   totalCount
// }
// productTopToday: reportProductSales(period: TODAY, first: 5) {
//   edges {
//     node {
//       id
//       revenue(period: TODAY) {
//         gross {
//           amount
//           currency
//         }
//       }
//       attributes {
//         values {
//           id
//           name
//         }
//       }
//       product {
//         id
//         name
//         thumbnail {
//           url
//         }
//       }
//       quantityOrdered
//     }
//   }
// }
// activities: homepageEvents(last: 10) {
//   edges {
//     node {
//       amount
//       composedId
//       date
//       email
//       emailType
//       id
//       message
//       orderNumber
//       oversoldItems
//       quantity
//       type
//       user {
//         id
//         email
//       }
//     }
//   }
// }

export const HomePageQuery = TypedQuery<Home, {}>(home);

export const claimBusinessMutation = gql`
  mutation ClaimBusinessMutation($input: RequestClaimBusinessInput!) {
    requestClaimBusiness(input: $input) {
      message
      businessErrors {
        field
        message
      }
    }
  }
`;
export const ClaimBusinessMutation = TypedMutation<
  ClaimBusiness,
  ClaimBusinessVariables
>(claimBusinessMutation);

export const employeeAccessMutation = gql`
  mutation EmployeeAccessMutation($input: RequestEmployeeAccessInput!) {
    requestEmployeeAccess(input: $input) {
      message
      businessErrors {
        field
        message
      }
    }
  }
`;
export const EmployeeAccessMutation = TypedMutation<
  EmployeeAccess,
  EmployeeAccessVariables
>(employeeAccessMutation);

export const createBusinessMutation = gql`
  mutation CreateBusinessMutation($input: BusinessCreateInput!) {
    businessCreate(input: $input) {
      business {
        id
        name
        description
      }
      businessErrors {
        field
        code
        message
      }
    }
  }
`;
export const CreateBusinessMutation = TypedMutation<
  CreateBusiness,
  CreateBusinessVariables
>(createBusinessMutation);

export const createStoreMutation = gql`
  mutation CreateStoreMutation($input: StoreCreateInput!) {
    storeCreate(input: $input) {
      store{
        id
        name
      }
      errors{
        field
        message
      }
    }
  }
`;
export const CreateStoreMutation = TypedMutation<
  CreateStore,
  CreateStoreVariables
>(createStoreMutation);

export const productBulkCreateMutation = gql`
  mutation ProductBulkCreateMutation($input: ProductBulkCreateInput!) {
    productBulkCreate(input: $input) {
      message
      productErrors {
        field
        message
      }
    }
  }
`;
export const ProductBulkCreateMutation = TypedMutation<
  ProductBulkCreate,
  ProductBulkCreateVariables
>(productBulkCreateMutation);
