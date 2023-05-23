const {
    pushCustomerToSellerPortal
  } = require("../services/customerService");
  const { log } = require("../common/utils/logger");
  
  exports.syncCustomer = async(req, res) => {
     const customerSynced = await pushCustomerToSellerPortal(req.params.customerId);
     if(customerSynced.statusCode === 200) {
        res.status(200).send(customerSynced.body);
     }
     else{
        res.status(customerSynced.statusCode).send("Error sending customer to Seller Portal");
     }
            
  };
  