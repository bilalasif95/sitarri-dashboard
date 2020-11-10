// import { decimal } from "@saleor/misc";
// import useUser from "@saleor/hooks/useUser";
// import { ProductUpdatePageSubmitData } from "@saleor/products/components/ProductUpdatePage";
import { ProductDetails_product } from "@saleor/products/types/ProductDetails";
import { ProductImageCreateVariables } from "@saleor/products/types/ProductImageCreate";
import { ProductImageReorderVariables } from "@saleor/products/types/ProductImageReorder";
// import { SimpleProductUpdateVariables } from "@saleor/products/types/SimpleProductUpdate";
import { ReorderEvent } from "@saleor/types";
import { arrayMove } from "react-sortable-hoc";
// import { mapFormsetStockToStockInput } from "@saleor/products/utils/data";
import { ProductUpdateVariables } from "../../types/ProductUpdate";

export function createUpdateHandler(
  product: ProductDetails_product,
  updateProduct: (variables: ProductUpdateVariables) => void,
  // updateSimpleProduct: (variables: SimpleProductUpdateVariables) => void
) {
  // const { user } = useUser();

  return (data: any) => {
    const productVariables: ProductUpdateVariables = {
      businesscategory: product.businesscategory.id,
      facebookUrl: "https://www.facebook.com/" + data.facebookUrl,
      id: product.id,
      instagramUrl: "https://www.instagram.com/" + data.instagramUrl,
      logo: data.logo,
      twitterUrl: "https://www.twitter.com/" + data.twitterUrl,
      websiteUrl: "https://www." + data.websiteUrl,
      // attributes: data.attributes.map(attribute => ({
      //   id: attribute.id,
      //   values: attribute.value[0] === "" ? [] : attribute.value
      // })),
      // basePrice: decimal(data.basePrice),
      // category: data.category,
      // chargeTaxes: data.chargeTaxes,
      // collections: data.collections,
      // description: data.description,
      // id: product.id,
      // isPublished: data.isPublished,
      // name: data.name,
      // publicationDate:
      //   data.publicationDate !== "" ? data.publicationDate : null,
      // seo: {
      //   description: data.seoDescription,
      //   title: data.seoTitle
      // },
      // store: user.businessUser.edges && user.businessUser.edges[0] && user.businessUser.edges[0].node.businessStore.edges && user.businessUser.edges[0].node.businessStore.edges[0] && user.businessUser.edges[0].node.businessStore.edges[0].node.id,
    };

    // if (product.productType.hasVariants) {
    updateProduct(productVariables);
    // } else {
    //   updateSimpleProduct({
    //     ...productVariables,
    //     addStocks: data.addStocks.map(mapFormsetStockToStockInput),
    //     deleteStocks: data.removeStocks,
    //     productVariantId: product.variants[0].id,
    //     productVariantInput: {
    //       sku: data.sku,
    //       trackInventory: data.trackInventory
    //     },
    //     updateStocks: data.updateStocks.map(mapFormsetStockToStockInput)
    //   });
    // }
  };
}

export function createImageUploadHandler(
  id: string,
  createProductImage: (variables: ProductImageCreateVariables) => void
) {
  return (file: File) =>
    createProductImage({
      alt: "",
      image: file,
      product: id
    });
}

export function createImageReorderHandler(
  product: ProductDetails_product,
  reorderProductImages: (variables: ProductImageReorderVariables) => void
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    let ids = product.images.map(image => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);
    reorderProductImages({
      imagesIds: ids,
      productId: product.id
    });
  };
}
