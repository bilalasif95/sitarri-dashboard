import React from "react";
import Helmet from "react-helmet";

import appleTouchIcon from "@assets/favicons/Group 9690.svg";
// import favicon16 from "@assets/favicons/Group 9690.svg";
// import favicon32 from "@assets/favicons/Group 9690.svg";
import safariPinnedTab from "@assets/favicons/safari-pinned-tab.svg";
import { TypedShopInfoQuery } from "./query";
import { ShopInfo_shop } from "./types/ShopInfo";

type ShopContext = ShopInfo_shop;

export const ShopContext = React.createContext<ShopContext>(undefined);

export const ShopProvider: React.FC = ({ children }) => (
  <TypedShopInfoQuery>
    {({ data }) => (
      <>
        <Helmet>
          <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="16x16" href={appleTouchIcon} />
          <link rel="mask-icon" href={safariPinnedTab} />
        </Helmet>
        <ShopContext.Provider value={data ? data.shop : undefined}>
          {children}
        </ShopContext.Provider>
      </>
    )}
  </TypedShopInfoQuery>
);
export const Shop = ShopContext.Consumer;
export default Shop;
