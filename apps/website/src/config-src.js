export default {
  s3: {
    REGION: "%CF:Region%",
    BUCKET: "NOBUCKETNOW"
  },
  apiGateway: {
    REGION: "%CF:Region%",
    URL: "%CF:ServiceEndpoint%"
  },
  cognito: {
    REGION: "%CF:Region%",
    USER_POOL_ID: "%CF:CognitoUserPoolId%",
    APP_CLIENT_ID: "%CF:CognitoUserPoolClientId%",
    IDENTITY_POOL_ID: "%CF:CognitoIdentityPoolId%"
  }
};
