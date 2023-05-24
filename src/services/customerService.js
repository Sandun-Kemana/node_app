const { projectApiRoot } = require("../common/config/client");
const fetch =require('node-fetch');
const { log } = require("../common/utils/logger");

const getCustomerById = (ID) =>
  projectApiRoot
    .customers()
    .withId({ ID })
    .get()
    .execute();    
  

const pushCustomerToSellerPortal = async (customer) =>{
  const response = await fetch('https://commercetools.kemanamagento.web.id/customer/', {
            method: 'POST',
            body: customer,
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
    let updatedCustomer = await setSyncFlag(customer,status);
    log('updated customer '+updatedCustomer.body);
    return updatedCustomer;
}

const setCustomerSyncFlag = async(customer, status) => {
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

 const setSyncFlag = async(customer, status) => {
    let updatedCustomer = await projectApiRoot
      .customers()
      .withId({ ID: customer.id })
      .post({
        body: {
          version: customer.version,
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

  const 
  retryCustomers = async() =>{
    let items = await projectApiRoot
    .customers()
    .get({
      queryArgs: {
        where: "custom(fields(sentToSellerPortal=false))"
      }
    }).execute();
    return items.body.results;
  }
  

    
module.exports.pushCustomerIdToSellerPortal = async (customerId) =>{
  const customer = await getCustomerById(customerId);
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
    let updatedCustomer = await setCustomerSyncFlag(customer,status);
    log('updated customer '+updatedCustomer.body);
    return updatedCustomer;
}

module.exports.syncCustomers = async() =>{
  let customers = await retryCustomers();
  customers.forEach(element => {
      pushCustomerToSellerPortal(element);
  });
}

const createCustomerDraft = async(reqBody) => {
  const {
    email,
    password,
    firstName,
    lastName,
    companyName,
  } = reqBody;
  return {
    email,
    password,
    firstName,
    lastName,
    companyName,
    custom :
      {
        type: {
        "key": "customer-custom-type"
        }
    }
};
};

const createCustomer =async(customerDataDraft)=>{
  try{
    console.log("customerdraft", JSON.stringify(customerDataDraft))
    let customer =   await projectApiRoot
    .customers()
    .post({
      body: customerDataDraft,
    })
    .execute();
    return customer;
  }
  catch(error){
    console.log(error);
  }
}
module.exports.createCustomer = async(reqBody) =>{
  try{
  const CustomerData = await createCustomerDraft(reqBody);
  let customerRes = await createCustomer(CustomerData);
  log("Customer id "+customerRes.body.customer.id);
  let updatedCustomer = await pushCustomerToSellerPortal(customerRes.body.customer);
  return updatedCustomer;
  }catch(error){
    console.log(error);
  }
}
