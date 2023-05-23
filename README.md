To start checkout the repo in local follow below steps- 
1. add CT connection details in .env file
2. run npm init from the project folder
3. run the node server using npm start
4. Server should start in 3600 port
5. Use below Urls to test the order and customer service -


Customer : do below steps using API, execute the customer_custom_type.json under payloads in your project using create type 
end point.
NOTE - change url in json file as per your project
1. Create customer using Create Customer end point
	{
		"email": <email>,
		"firstName": <first name>,
		"lastName": <last name>,
		"password": <Password>
	   
		"companyName": <company name>,
		"custom":{
		  "type":{
			  "key":"customer-custom-type"
		  }
	  }
	}
2. Send customer info to seller portal using  - localhost:3600/api/syncCustomer/<customer-id from step 1> 
   NOTE- this will be later changed to create customer


Order :  do below steps using API, execute the cart_custom_type.json under payloads in your project using create type end point
NOTE - change url in json file as per your project
  1. Create cart using create cart end point
       {
		  "currency" : "USD",
		  "customerId":<customer id>,
		  "custom":{
			  "type":{
				  "key":"cart-custom-type"
			  }
		  }
		}
  2. Add item to cart using AddLineItem update Action
  3. Add shipping to cart using SetShippingAddress update Action
  4. Use url localhost:3600/api/createOrder to create order from cart# node_app
