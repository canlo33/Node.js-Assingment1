var SERVER_NAME = 'Can-api'
var PORT = 8000;
var HOST = '127.0.0.1';
var getcounter = 0;
var postcounter = 0;


var restify = require('restify')

  // Get a persistence engine for the products
  , productsSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /products')
  console.log(' /products/:id')  
  console.log("----- Requests -------------------------");
  console.log("http://127.0.0.1:8000/products METHOD: Get");
  console.log("http://127.0.0.1:8000/products METHOD: POST");
  console.log("http://127.0.0.1:8000/products METHOD: Delete");
 

})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all products in the system
server.get('/products', function (req, res, next) {

  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {

    // Return all of the products in the system
    res.send(products)
	getcounter+=1;
	 console.log("PostRequestNumber:"+postcounter +" GetRequestNumber:"+getcounter);
  })
})

// Get a single product by their product id
server.get('/products/:id', function (req, res, next) {

  // Find a single product by their id within save
  productsSave.findOne({ _id: req.params.id }, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (product) {
      // Send the product if no issues
      res.send(product)
	  getcounter+=1;
	  console.log("PostRequestNumber:"+postcounter +" GetRequestNumber:"+getcounter);
    } else {
      // Send 404 header if the product doesn't exist
      res.send(404)
    }
  })
})

// Create a new product
server.post('/products', function (req, res, next) {

  // Make sure name is defined
  if (req.params.product === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('product must be supplied'))
  }
  if (req.params.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }
  
    if (req.params.condition === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('condition must be supplied'))
  }
  var newProduct = {
		product: req.params.product, 
		price: req.params.price,
		condition: req.params.condition
	}
	
	

  // Create the product using the persistence engine
  productsSave.create( newProduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the product if no issues
    res.send(201, product)
	postcounter+=1;
	console.log("PostRequestNumber:"+postcounter +" GetRequestNumber:"+getcounter);
  })
})

// Update a product by their id
server.put('/products/:id', function (req, res, next) {

  // Make sure name is defined
  if (req.params.product === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('product must be supplied'))
  }
  if (req.params.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }
    if (req.params.condition === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('condition must be supplied'))
  }
  
  var newProduct = {
		_id: req.params.id,
		product: req.params.product, 
		price: req.params.price,
		condition: req.params.condition
	}
  
  // Update the product with the persistence engine
  productsSave.update(newproduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
	getcounter+=1;
	console.log("PostRequestNumber:"+postcounter +" GetRequestNumber:"+getcounter);
  })
})

// Delete product with the given id
server.del('/products/:id', function (req, res, next) {

  // Delete the product with the persistence engine
  productsSave.delete(req.params.id, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})

// Delete all the product
server.del('/products', function (req, res, next) {

  // Find every entity within the given collection
   productsSave.deleteMany({}, function (error, products) {

    // Return all of the products in the system
    res.send(products)
  })
})


