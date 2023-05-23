const { projectApiRoot } = require("../common/config/client");
const fetch =require('node-fetch');
const { log } = require("../common/utils/logger");

module.exports.getProductById = (ID) =>
  projectApiRoot
    .products()
    .withId({ ID })
    .get()
    .execute();

    
    
module.exports.pushProductToSellerPortal = async (productId) =>{
  const product = await this.getProductById(productId);
  const response = await fetch('https://localhost:3600/product/', {
            method: 'POST',
            body: product.body,
            headers: { 'Content-Type': 'application/json' }
        });
    let status;
    if (response && response.status !== 200) {
      log('Unexpected response for sending product to Seller portal: ' +
      `${response.status}`);
      status = false;
    } else if (response && response.status === 200) {
      log('Successfully sent product to seller portal.');
      status = true;
    }
    let updatedProduct = await this.setProcustSyncFlag(product,status);
    log('updated product '+updatedProduct.body);
    return updatedProduct;
}

module.exports.setProductSyncFlag = async(product, status) => {
  let updatedProduct = await projectApiRoot
    .products()
    .withId({ ID: product.body.id })
    .post({
      body: {
        version: product.body.version,
        actions: [{
          action: "setProductField",
          name: "sentToSellerPortal",
          value: status
        }]
      }
    })
    .execute();
    log("Status updated for order "+updatedProduct.body.id);
    return updatedProduct;
  }
