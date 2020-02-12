const DDB = require('aws-sdk/clients/dynamodb');
const ddb = new DDB.DocumentClient();

const getProducts = async () => {
  const params = {
    TableName: process.env["PRODUCT_TABLE"],
  }
  try {
    const resp = await ddb.scan(params).promise();
    return apiResponse(resp.Items)
  } catch(err) {
    console.log('dynamo error');
    return apiResponse(null);
  }
}

const postProduct = async (product) => {
  const params = {
    TableName: process.env["PRODUCT_TABLE"],
    Item: product
  }
  try {
    const resp = await ddb.put(params).promise();
    return apiResponse(resp)
  } catch(err) {
    console.log('put error', err);
    return apiResponse(null);
  }
}

const apiResponse = (data) => {
  return  {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data)
  };
};

module.exports.handler = async (event, context) => {
  switch(event.httpMethod) {
    case 'GET':
      return await getProducts();
    case 'POST':
      return await postProduct(JSON.parse(event.body));
    default:
      return apiResponse({
        message: 'invalid input'
      })
  }
}
