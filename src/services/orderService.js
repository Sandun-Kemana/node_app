const { projectApiRoot } = require("../common/config/client");
const fetch =require('node-fetch');
const { log } = require("../common/utils/logger");



module.exports.pushOrderToSellerPortal = async (order) =>{
  const response = await fetch('https://commercetools.kemanamagento.web.id/order/', {
        method: 'POST',
        body: order,
        headers: { 'Content-Type': 'application/json' }
    });
let status;
if (response && response.status !== 200) {
      log('Unexpected response for sending order to Seller portal: ' +
    `${response.status}`);
      status =  false;
  } else if (response && response.status === 200) {
      log('Successfully sent order to seller portal.');
      status =  true;
  }
  return status;
}

module.exports.getOrderById = (ID) =>
  projectApiRoot
    .orders()
    .withId({ ID })
    .get()
    .execute();

module.exports.setOrderSyncFlag = async(orderId, status) => {
    let order = await this.getOrderById(orderId);
   order = await projectApiRoot
      .orders()
      .withId({ ID: order.body.id })
      .post({
        body: {
          version: order.body.version,
          actions: [{
            action: "setCustomField",
            name: "sentToSellerPortal",
            value: status
          }]
        }
      })
      .execute();
      log("Status updated for order "+order.body.id);
      return order;
    }

module.exports.createOrderFromCart = async(cartId,version) =>
    projectApiRoot
      .orders()
      .post({
        body:{
          id: cartId,
          version: version
        },
      })
      .execute();

module.exports.placeCustomerOrder = async(cartId,version) => {
 let order =  await this.createOrderFromCart(cartId,version);
 log("Order id "+order.body.id);
 let status = await this.pushOrderToSellerPortal(order.body);
 let updatedOrder = await this.setOrderSyncFlag(order.body.id,status);
 return updatedOrder;
}