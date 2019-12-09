const DDB = require('aws-sdk/clients/dynamodb');
const ddb = new DDB.DocumentClient();

const getPosts = async () => {

  const params = {
    TableName: process.env["CONTENT_TABLE"],
    KeyConditionExpression: 'ContentType = :ctype',
    ExpressionAttributeValues: {
      ':ctype': 'blog'
    }
  }

  try {
    const resp = await ddb.query(params).promise();
    return apiResponse(resp.Items)
  } catch(err) {
    console.log('dynamo error');
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
      return getPosts();
    case 'POST':
      return getPosts();
  }
}
