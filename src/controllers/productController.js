const {
    pushProductToSellerPortal
  } = require("../services/productService");
  const { log } = require("../common/utils/logger");
  
  exports.syncProduct = async(req, res) => {
     const productSynced = await pushProductToSellerPortal(req.params.productId);
     if(productSynced.statusCode === 200) {
        res.status(200).send(productSynced.body);
     }
     else{
        res.status(productSynced.statusCode).send("Error sending product to Seller Portal");
     }
            
  };
  