const {
  placeCustomerOrder
} = require("../services/orderService");
const { log } = require("../common/utils/logger");

exports.createOrder = async(req, res) => {
  try{
   const submittedOrder = await placeCustomerOrder(req.body.cart.id,req.body.version);
   log('Submitted Order '+submittedOrder.body.id);
   if(submittedOrder.statusCode === 200) {
    res.status(200).send(submittedOrder.body);
   }
   else{
    res.status(submittedOrder.statusCode).send("Error creating order");
   }
  }catch(error){
    console.log(error);
    res.status(400).send("Error creating order");
  }          
};
