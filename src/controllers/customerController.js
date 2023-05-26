const {
   pushCustomerToSellerPortal,
   createCustomer
 } = require("../services/customerService");
 const { log } = require("../common/utils/logger");
 
 exports.syncCustomer = async(req, res) => {
  //wrap inside try catch
  try{
    const customerSynced = await pushCustomerToSellerPortal(req.params.customerId);
    if(customerSynced.statusCode === 200) {
       res.status(200).send(customerSynced.body);
    }
    else{
       res.status(customerSynced.statusCode).send("Error sending customer to Seller Portal");
    }
  }catch(error){
     console.log(error);
     res.status(400).send("Error sending customer to Seller Portal");
  }      
 };

exports.customers = async(req, res) => {
 try{
   const customerSynced = await createCustomer(req.body);
   if(customerSynced.statusCode === 200) {
      res.status(200).send(customerSynced.body);
   }
   else{
      res.status(customerSynced.statusCode).send("Error sending customer to Seller Portal");
   }
 }catch(error){
    res.status(400).send("Error sending customer to Seller Portal");
 }
};
