import { commonMessages, sectionNames } from "@saleor/intl";
import { IntlShape } from "react-intl";

import Building from "@assets/images/building.svg";
import catalogIcon from "@assets/images/menu-catalog-icon.svg";
import Cart from "@assets/images/cart.svg";
import Store from "@assets/images/store.svg";
import Shapes from "@assets/images/shapes.svg";
import configureIcon from "@assets/images/menu-configure-icon.svg";
import Home from "@assets/images/home.svg";
// import Setting from "@assets/images/setting.svg";
// import customerIcon from "@assets/images/menu-customers-icon.svg";
import discountsIcon from "@assets/images/menu-discounts-icon.svg";
// import homeIcon from "@assets/images/menu-home-icon.svg";
// import ordersIcon from "@assets/images/menu-orders-icon.svg";
// import translationIcon from "@assets/images/menu-translation-icon.svg";
import useUser from "@saleor/hooks/useUser";
import { taxSection } from "@saleor/linkePOS/urls";
import { staffMemberDetailsUrl, staffListUrl } from "@saleor/staff/urls";
import { permissionGroupListUrl } from "@saleor/permissionGroups/urls";
// import { usersListUrl } from "@saleor/users/urls";
import { businessesListUrl } from "../../businesses/urls";
import { categoryListUrl } from "../../categories/urls";
// import { collectionListUrl } from "../../collections/urls";
// import { customerListUrl } from "../../customers/urls";
// import { orderDraftListUrl, orderListUrl } from "../../orders/urls";
// import { notificationsListUrl } from "../../notifications/urls";
import { productListUrl } from "../../products/urls";
import { storesListUrl } from "../../stores/urls";
import { saleListUrl, voucherListUrl } from "../../discounts/urls";
// import { languageListUrl } from "../../translations/urls";
import { PermissionEnum } from "../../types/globalTypes";

export interface IMenuItem {
  ariaLabel: string;
  children?: IMenuItem[];
  icon?: any;
  label: string;
  permission?: PermissionEnum;
  url?: string;
}

function createMenuStructure(intl: IntlShape): IMenuItem[] {
  const { user } = useUser();
  const menuItemsWithCollections = [
    {
      ariaLabel: "home",
      icon: Home,
      label: intl.formatMessage(sectionNames.home),
      url: "/"
    },
    {
      ariaLabel: "businesses",
      icon: Building,
      label: intl.formatMessage(sectionNames.businesses),
      permission: PermissionEnum.MANAGE_MENUS,
      url: businessesListUrl()
    },
    {
      ariaLabel: "stores",
      icon: Store,
      label: intl.formatMessage(sectionNames.stores),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      url: storesListUrl()
    },
    {
      ariaLabel: "products",
      icon: Cart,
      label: intl.formatMessage(sectionNames.products),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      url: productListUrl()
    },
    {
      ariaLabel: "categories",
      icon: Shapes,
      label: intl.formatMessage(sectionNames.categories),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      url: categoryListUrl()
    }
    // {
    //   ariaLabel: "users",
    //   icon: configureIcon,
    //   label: intl.formatMessage(sectionNames.users),
    //   url: usersListUrl()
    // },
    // {
    //   ariaLabel: "collections",
    //   icon: catalogIcon,
    //   label: intl.formatMessage(sectionNames.collections),
    //   permission: PermissionEnum.MANAGE_PRODUCTS,
    //   url: collectionListUrl(),
    // },
    // {
    //   ariaLabel: "catalogue",
    //   children: [
    //     {
    //       ariaLabel: "products",
    //       label: intl.formatMessage(sectionNames.products),
    //       url: productListUrl()
    //     },
    //     {
    //       ariaLabel: "categories",
    //       label: intl.formatMessage(sectionNames.categories),
    //       url: categoryListUrl()
    //     },
    //     {
    //       ariaLabel: "collections",
    //       label: intl.formatMessage(sectionNames.collections),
    //       url: collectionListUrl()
    //     }
    //   ],
    //   icon: catalogIcon,
    //   label: intl.formatMessage(commonMessages.catalog),
    //   permission: PermissionEnum.MANAGE_PRODUCTS
    // },
    // {
    //   ariaLabel: "discounts",
    //   children: [
    //     {
    //       ariaLabel: "sales",
    //       label: intl.formatMessage(sectionNames.sales),
    //       url: saleListUrl()
    //     },
    //     {
    //       ariaLabel: "vouchers",
    //       label: intl.formatMessage(sectionNames.vouchers),
    //       url: voucherListUrl()
    //     }
    //   ],
    //   icon: discountsIcon,
    //   label: intl.formatMessage(commonMessages.discounts),
    //   permission: PermissionEnum.MANAGE_DISCOUNTS
    // },
    // {
    //   ariaLabel: "notifications",
    //   icon: configureIcon,
    //   label: intl.formatMessage(sectionNames.notifications),
    //   url: notificationsListUrl()
    // },
    // {
    //   ariaLabel: "staffSettings",
    //   children: [
    //     {
    //       ariaLabel: "staff",
    //       label: intl.formatMessage(sectionNames.staff),
    //       url: staffListUrl()
    //     },
    //     {
    //       ariaLabel: "permissionGroups",
    //       label: intl.formatMessage(sectionNames.permissionGroups),
    //       url: permissionGroupListUrl()
    //     }
    //   ],
    //   icon: configureIcon,
    //   label: intl.formatMessage(sectionNames.staffSettings),
    // },
    // {
    //   ariaLabel: "accountSettings",
    //   icon: configureIcon,
    //   label: intl.formatMessage(sectionNames.accountSettings),
    //   url: staffMemberDetailsUrl(user.id)
    // },
    // {
    //   ariaLabel: "orders",
    //   children: [
    //     {
    //       ariaLabel: "orders",
    //       label: intl.formatMessage(sectionNames.orders),
    //       permission: PermissionEnum.MANAGE_ORDERS,
    //       url: orderListUrl()
    //     },
    //     {
    //       ariaLabel: "order drafts",
    //       label: intl.formatMessage(commonMessages.drafts),
    //       permission: PermissionEnum.MANAGE_ORDERS,
    //       url: orderDraftListUrl()
    //     }
    //   ],
    //   icon: ordersIcon,
    //   label: intl.formatMessage(sectionNames.orders),
    //   permission: PermissionEnum.MANAGE_ORDERS
    // },
    // {
    //   ariaLabel: "customers",
    //   icon: customerIcon,
    //   label: intl.formatMessage(sectionNames.customers),
    //   permission: PermissionEnum.MANAGE_USERS,
    //   url: customerListUrl()
    // },
    // {
    //   ariaLabel: "translations",
    //   icon: translationIcon,
    //   label: intl.formatMessage(sectionNames.translations),
    //   permission: PermissionEnum.MANAGE_TRANSLATIONS,
    //   url: languageListUrl
    // }
  ];
  const menuItemsWithoutCollections = [
    {
      ariaLabel: "home",
      icon: Home,
      label: intl.formatMessage(sectionNames.home),
      url: "/"
    },
    {
      ariaLabel: "products",
      icon: Cart,
      label: intl.formatMessage(sectionNames.products),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      url: productListUrl()
    },
    {
      ariaLabel: "categories",
      icon: Shapes,
      label: intl.formatMessage(sectionNames.categories),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      url: categoryListUrl()
    },
    {
      ariaLabel: "stores",
      icon: Store,
      label: intl.formatMessage(sectionNames.stores),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      url: storesListUrl()
    },
    // {
    //   ariaLabel: "catalogue",
    //   children: [
    //     {
    //       ariaLabel: "products",
    //       label: intl.formatMessage(sectionNames.products),
    //       url: productListUrl()
    //     },
    //     {
    //       ariaLabel: "categories",
    //       label: intl.formatMessage(sectionNames.categories),
    //       url: categoryListUrl()
    //     },
    //   ],
    //   icon: catalogIcon,
    //   label: intl.formatMessage(commonMessages.catalog),
    //   permission: PermissionEnum.MANAGE_PRODUCTS
    // },
    {
      ariaLabel: "discounts",
      children: [
        {
          ariaLabel: "sales",
          label: intl.formatMessage(sectionNames.sales),
          url: saleListUrl()
        },
        {
          ariaLabel: "vouchers",
          label: intl.formatMessage(sectionNames.vouchers),
          url: voucherListUrl()
        }
      ],
      icon: discountsIcon,
      label: intl.formatMessage(commonMessages.discounts),
      permission: PermissionEnum.MANAGE_DISCOUNTS
    },
    {
      ariaLabel: "linkePOS",
      icon: catalogIcon,
      label: intl.formatMessage(sectionNames.linkePOS),
      url: taxSection
    },
    {
      ariaLabel: "staffSettings",
      children: [
        {
          ariaLabel: "staff",
          label: intl.formatMessage(sectionNames.staff),
          url: staffListUrl()
        },
        {
          ariaLabel: "permissionGroups",
          label: intl.formatMessage(sectionNames.permissionGroups),
          url: permissionGroupListUrl()
        }
      ],
      icon: configureIcon,
      label: intl.formatMessage(sectionNames.staffSettings),
      permission: PermissionEnum.MANAGE_STAFF
    },
    {
      ariaLabel: "accountSettings",
      icon: configureIcon,
      label: intl.formatMessage(sectionNames.accountSettings),
      url: staffMemberDetailsUrl(user.id)
    }
  ];
  if (user.isSuperuser) {
    return menuItemsWithCollections;
  }
  return menuItemsWithoutCollections;
}

export default createMenuStructure;
