const { projectApiRoot } = require("../common/config/client");
const fetch =require('node-fetch');
const { log } = require("../common/utils/logger");

module.exports.getCustomerById = (ID) =>
  projectApiRoot
    .customers()
    .withId({ ID })
    .get()
    .execute();

    
    
module.exports.pushCustomerToSellerPortal = async (customerId) =>{
  const customer = await this.getCustomerById(customerId);
  const response = await fetch('https://commercetools.kemanamagento.web.id/customer/', {
            method: 'POST',
            body: customer.body,
            headers: { 'Content-Type': 'application/json' }
        });
    let status;
    if (response && response.status !== 200) {
      log('Unexpected response for sending customer to Seller portal: ' +
      `${response.status}`);
      status = false;
    } else if (response && response.status === 200) {
      log('Successfully sent customer to seller portal.');
      status = true;
    }
    let updatedCustomer = await this.setCustomerSyncFlag(customer,status);
    log('updated customer '+updatedCustomer.body);
    return updatedCustomer;
}

module.exports.setCustomerSyncFlag = async(customer, status) => {
  let updatedCustomer = await projectApiRoot
    .customers()
    .withId({ ID: customer.body.id })
    .post({
      body: {
        version: customer.body.version,
        actions: [{
          action: "setCustomField",
          name: "sentToSellerPortal",
          value: status
        }]
      }
    })
    .execute();
    log("Status updated for order "+updatedCustomer.body.id);
    return updatedCustomer;
  }
