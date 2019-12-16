const DDB = require('aws-sdk/clients/dynamodb');
const ddb = new DDB.DocumentClient();

const randId = () => {
  return Math.random().toString(36).slice(2);
};

const getPosts = async () => {

  const params = {
    TableName: process.env["CONTENT_TABLE"],
    KeyConditionExpression: 'ContentType = :ctype',
    ExpressionAttributeValues: {
      ':ctype': 'blog'
    }
  };

  try {
    const resp = await ddb.query(params).promise();
    return apiResponse(resp.Items);
  } catch(err) {
    console.log('dynamo error');
    return apiResponse(null);
  }
};

const b64DecodeUnicode = (str) => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    let decode = new Buffer(str, 'base64').toString('ascii');
    return decodeURIComponent(decode.split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
};

const postPost = async (event) => {


  let postData = JSON.parse(event.body);
  if (!postData.id) {
    postData.id = randId();
  }

  const params = {
    TableName: process.env["CONTENT_TABLE"],
    Item: postData
  };

  try {
    const resp = await ddb.put(params).promise();
    console.log('Blog posted', resp);
    return apiResponse(resp);
  } catch(err) {
    console.error('Error posting blog to db', err);
    return apiResponse({message: 'Error posting to db.'});
  }
};

const deletePost = async (event) => {
  let { id } = JSON.parse(event.body);

  const params = {
    TableName: process.env["CONTENT_TABLE"],
    Key: {
      id: id,
      ContentType: 'blog'
    }
  };

  try {
    const resp = await ddb.delete(params).promise();
    console.log('Blog deleted', resp);
    return apiResponse(resp);
  } catch(err) {
    console.error('Error deleting blog from db', err);
    return apiResponse({message: 'Error deleting blog from db.'});
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
  console.log(JSON.stringify(event, null, 2));
  switch(event.httpMethod) {
    case 'GET':
      return getPosts();
    case 'POST':
      return postPost(event);
    case 'DELETE':
      return deletePost(event);
    default:
      return apiResponse({
        message: 'invalid input'
      });
  }
};
