const { projectApiRoot } = require("../common/config/client");
const fetch =require('node-fetch');
const { log } = require("../common/utils/logger");



const pushOrderToSellerPortal = async (order) =>{
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
  let updatedOrder = await setOrderSyncFlag(order,status);
  log('updated order '+updatedOrder.body);
  return updatedOrder;
}

module.exports.getOrderById = (ID) =>
  projectApiRoot
    .orders()
    .withId({ ID })
    .get()
    .execute();

const setOrderSyncFlag = async(order, status) => {
  let syncedOrder = await projectApiRoot
      .orders()
      .withId({ ID: order.id })
      .post({
        body: {
          version: order.version,
          actions: [{
            action: "setCustomField",
            name: "sentToSellerPortal",
            value: status
          }]
        }
      })
      .execute();
      log("Status updated for order "+syncedOrder.id);
      return syncedOrder;
    }

const createOrderFromCart = async(cartId,version) =>
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
 let order =  await createOrderFromCart(cartId,version);
 log("Order id "+order.body.id);
 let updatedOrder = await pushOrderToSellerPortal(order.body);
 
 return updatedOrder;
}
