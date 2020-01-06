const DDB = require('aws-sdk/clients/dynamodb');
const AWS = require('aws-sdk');
const ddb = new DDB.DocumentClient();
const ses = new AWS.SES();

const randId = () => {
  return Math.random().toString(36).slice(2);
}

const postEnrollment = async (event) => {

  let body = new Buffer(event.body, 'base64').toString('ascii');
  let formdata = JSON.parse(body);
  formdata.ContentType = 'enroll'
  formdata.id = randId();

  const params = {
    TableName: process.env["CONTENT_TABLE"],
    Item: formdata
  }

  try {
    const resp = await ddb.put(params).promise();
    await sendEmail(formdata);
    return apiResponse({message: 'Enrollment Submitted!'})
  } catch(err) {
    console.log('dynamo error', err);
    return apiResponse({message: 'Database operation error'}, 410);
  }
}

const getEnrollments = async (event) => {

  const params = {
    TableName: process.env["CONTENT_TABLE"],
    KeyConditionExpression: 'ContentType = :ctype',
    ExpressionAttributeValues: {
      ':ctype': 'enroll'
    }
  }

  try {
    const resp = await ddb.query(params).promise();
    return apiResponse(resp.Items);
  } catch (err) {
    console.log('Error getting enrollments', err);
    return apiResponse({message: 'Error getting enrollments'}, 410)
  }
}

const apiResponse = (data, code=200) => {
  return  {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data)
  };
};

const sendEmail = async (formData) => {

  const { Name, Email } = formData;

  const allFormData = () => {
    let text = ``;
    Object.keys(formData).map(key => {
      text += `<strong>${key}:</strong> ${formData[key]}<br/>`;
    })
    return text;
  }

  let emailText = `
    <body>
      <h4>Enrollment confirmation for: ${Name}</h4>
      <p>${allFormData()}</p>
    </body>
  `;

  const sesParams = {
    Destination: {
      ToAddresses: [process.env['ADMIN_EMAIL']]
    },
    Message: {
      Subject: {
        Data: `FlamencoTulsa Class Enrollment for ${Name}`
      },
      Body: {
        Html: {
          Data: emailText
        }
      }
    },
    Source: process.env["SITE_EMAIL"]
  };

  let response;
  try {
    response = await ses.sendEmail(sesParams).promise();
    console.log(response);
  } catch (err) {
    console.log(err);
    return `Email not sent`;
  }

  sesParams.Destination.ToAddresses = Email

  try {
    confirmation = await ses.sendEmail(sesParams).proimise();
    console.log(confirmation);
    return true;
  } catch (err) {
    console.log('Confirmation email failure', err);
    return 'Confirmation email failure';
  }

}

module.exports.handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 2));
  switch(event.httpMethod) {
    case 'POST':
      return postEnrollment(event);
    case 'GET':
      return getEnrollments(event);
    default:
      return apiResponse({
        message: 'invalid input'
      })
  }
}
