// const {
//   pushProductToSellerPortal,
//   pushAllProductsToSellerPortal,
//   doGetProducts,
//   doGetProductsByProductKey,
//   // getRecentProducts,
// } = require("../services/productService");
// const { log } = require("../common/utils/logger");

// exports.syncProduct = async (req, res) => {
//   const productSynced = await pushProductToSellerPortal(req.params.productId);
//   if (productSynced.statusCode === 200) {
//     res.status(200).send(productSynced.body);
//   } else {
//     res
//       .status(productSynced.statusCode)
//       .send("Error sending product to Seller Portal");
//   }
// };

// exports.syncAllProducts = async (req, res) => {
//   const productsSynced = await pushAllProductsToSellerPortal();
//   res.status(200).send(productsSynced);
// };

// exports.getProducts = async (req, res) => {
//   const products = await doGetProducts();
//   console.log(products);
//   if (products.statusCode === 200) {
//     res.status(200).send(products.body);
//   } else {
//     res.status(products.statusCode).send("Error getting all producs");
//   }
// };

// exports.getProductsByProductKey = async (req, res) => {
//   const { key } = req.params;

//   const product = await key;
//   console.log(product);
//   if (product.statusCode === 200) {
//     res.status(200).send(product.body);
//   } else {
//     doAddNewVariations;
//     res.status(product.statusCode).send("Error getting product details");
//   }
// };

// exports.syncAllProducts = async (req, res) => {
//   const products = await doGetProductsByProductKey();
//   const productsSynced = await Promise.all(
//     products.body.results.map((product) => pushProductToSellerPortal(product))
//   );
//   res.status(200).send(productsSynced);
// };

const {
  pushProductToSellerPortal,
  pushAllProductsToSellerPortal,
  doGetProducts,
  doGetProductsByProductKey,
  // getRecentProducts,
} = require("../services/productService");
const { log } = require("../common/utils/logger");

exports.syncProduct = async (req, res) => {
  const productSynced = await pushProductToSellerPortal(req.params.productId);
  if (productSynced.statusCode === 200) {
    res.status(200).send(productSynced.body);
  } else {
    res
      .status(productSynced.statusCode)
      .send("Error sending product to Seller Portal");
  }
};

exports.syncAllProducts = async (req, res) => {
  const products = await doGetProductsByProductKey();
  const productsSynced = await Promise.all(
    products.body.results.map((product) => pushProductToSellerPortal(product))
  );
  res.status(200).send(productsSynced);
};

exports.getProducts = async (req, res) => {
  const products = await doGetProducts();
  console.log(products);
  if (products.statusCode === 200) {
    res.status(200).send(products.body);
  } else {
    res.status(products.statusCode).send("Error getting all producs");
  }
};

exports.getProductsByProductKey = async (req, res) => {
  const { key } = req.params;

  const product = await key;
  console.log(product);
  if (product.statusCode === 200) {
    res.status(200).send(product.body);
  } else {
    doAddNewVariations;
    res.status(product.statusCode).send("Error getting product details");
  }
};
