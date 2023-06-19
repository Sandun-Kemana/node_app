// const { projectApiRoot } = require("../common/config/client");
// const fetch = require("node-fetch");
// const { log } = require("../common/utils/logger");

// const pushProductToSellerPortal = async (product) => {
//   const response = await fetch(
//     "https://commercetools.kemanamagento.web.id/product/",
//     {
//       method: "POST",
//       body: product,
//       headers: { "Content-Type": "application/json" },
//     }
//   );
//   let status;
//   if (response && response.status !== 200) {
//     log(
//       "Unexpected response for sending product to Seller portal: " +
//         `${response.status}`
//     );
//     status = false;
//   } else if (response && response.status === 200) {
//     log("Successfully sent product to seller portal.");
//     status = true;
//   }
//   let updatedProduct = await setProductSyncFlag(product, status);
//   log("updated product " + updatedProduct.body);
//   return updatedProduct;
// };

// module.exports.getProductById = (ID) =>
//   projectApiRoot.products().withId({ ID }).get().execute();

// module.exports.pushAllProductsToSellerPortal = async () => {
//   const products = await projectApiRoot.products().get().execute();
//   const response = await fetch("http://localhost:3600/product/", {
//     method: "POST",
//     body: JSON.stringify(products.body),
//     headers: { "Content-Type": "application/json" },
//   });
//   let status;
//   if (response && response.status !== 200) {
//     log(
//       "Unexpected response for sending products to Seller portal: " +
//         `${response.status}`
//     );
//     status = false;
//   } else if (response && response.status === 200) {
//     console.log(response);
//     log("Successfully sent products to seller portal.");
//     status = true;
//   }
//   let updatedProducts = await Promise.all(
//     products.body.results.map((product) =>
//       this.setProductSyncFlag(product, status)
//     )
//   );
//   log("updated products " + updatedProducts);
//   return updatedProducts;
// };

// const setProductSyncFlag = async (product, status) => {
//   let syncedProduct = await projectApiRoot
//     .products()
//     .withId({ ID: product.id })
//     .post({
//       body: {
//         version: product.version,
//         actions: [
//           {
//             action: "setCustomField",
//             name: "sentToSellerPortal",
//             value: status,
//           },
//         ],
//       },
//     })
//     .execute();
//   log("Status updated for product " + syncedProduct.id);
//   return syncedProduct;
// };

// module.exports.createProduct = async (productDraft) =>
//   projectApiRoot
//     .products()
//     .post({
//       body: productDraft,
//     })
//     .execute();

// module.exports.createAndPushProductToSellerPortal = async (productDraft) => {
//   let product = await module.exports.createProduct(productDraft);
//   log("Product id " + product.body.id);
//   let updatedProduct = await pushProductToSellerPortal(product.body);

//   return updatedProduct;
// };

// module.exports.doGetProducts = () => projectApiRoot.products().get().execute();

// module.exports.doGetProductsByProductKey = (key) =>
//   projectApiRoot.products().withKey({ key }).get().execute();

const { projectApiRoot } = require("../common/config/client");
const fetch = require("node-fetch");
const { log } = require("../common/utils/logger");

const pushProductToSellerPortal = async (product) => {
  const response = await fetch(
    "https://commercetools.kemanamagento.web.id/product/",
    {
      method: "POST",
      body: product,
      headers: { "Content-Type": "application/json" },
    }
  );
  let status;
  if (response && response.status !== 200) {
    log(
      "Unexpected response for sending product to Seller portal: " +
        `${response.status}`
    );
    status = false;
  } else if (response && response.status === 200) {
    log("Successfully sent product to seller portal.");
    status = true;
  }
  let updatedProduct = await setProductSyncFlag(product, status);
  log("updated product " + updatedProduct.body);
  return updatedProduct;
};

module.exports.getProductById = (ID) =>
  projectApiRoot.products().withId({ ID }).get().execute();

module.exports.pushAllProductsToSellerPortal = async () => {
  const products = await module.exports.doGetProductsByProductKey();
  const response = await fetch("http://localhost:3600/product/", {
    method: "POST",
    body: JSON.stringify(products.body),
    headers: { "Content-Type": "application/json" },
  });
  let status;
  if (response && response.status !== 200) {
    log(
      "Unexpected response for sending products to Seller portal: " +
        `${response.status}`
    );
    status = false;
  } else if (response && response.status === 200) {
    console.log(response);
    log("Successfully sent products to seller portal.");
    status = true;
  }
  let updatedProducts = await Promise.all(
    products.body.results.map((product) =>
      this.setProductSyncFlag(product, status)
    )
  );
  log("updated products " + updatedProducts);
  return updatedProducts;
};

const setProductSyncFlag = async (product, status) => {
  let syncedProduct = await projectApiRoot
    .products()
    .withId({ ID: product.id })
    .post({
      body: {
        version: product.version,
        actions: [
          {
            action: "setCustomField",
            name: "sentToSellerPortal",
            value: status,
          },
        ],
      },
    })
    .execute();
  log("Status updated for product " + syncedProduct.id);
  return syncedProduct;
};

module.exports.createProduct = async (productDraft) =>
  projectApiRoot
    .products()
    .post({
      body: productDraft,
    })
    .execute();

module.exports.createAndPushProductToSellerPortal = async (productDraft) => {
  let product = await module.exports.createProduct(productDraft);
  log("Product id " + product.body.id);
  let updatedProduct = await pushProductToSellerPortal(product.body);

  return updatedProduct;
};

module.exports.doGetProducts = () => projectApiRoot.products().get().execute();

module.exports.doGetProductsByProductKey = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const products = await projectApiRoot
    .products()
    .get({
      where: `createdAt >= "${oneHourAgo}"`,
    })
    .execute();
  return products;
};
