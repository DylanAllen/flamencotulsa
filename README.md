# [FlamencoTulsa.com](https://new.flamencotulsa.com)


> This is a website that I built for my wife (and it is not done yet). A bit over the top I admit, and I could have done all this with a CMS, but what would I have learned with that?

**Stack:**
- React
- AWS API Gateway
- AWS Lambda
- AWS Cognito
- AWS DynamoDB
- Serverless Framework

**Prerequisites:**
- AWS Account
- AWS CLI on your machine
- NodeJS
- [Serverless Framework](https://serverless.com) installed on your machine

## Installation

```bash
# Clone the repo
git clone git@github.com:DylanAllen/flamencotulsa.git

# Install serverless globally if you don't already have it
npm i -g serverless

# Install serverless dependencies
npm i

# Install web app dependencies
cd apps/website
npm i

# Go back to project root
cd ../..
```

### Configure your serverless project

Open `config/dev.yml` in your editor and update the values for your project:

```yml
cognitoDomain: 'yourdomainname' # A globally unique name for your cognito domain
identityProviderName: 'COGNITO' # Unless you want to use a 3rd party idp (you probably don't) leave this as is.
webDomain: http://localhost:3000 # you can put your websites eventual domain name here, or leave as localhost for dev testing.
authCallbackUrl: http://localhost:3000 # same as above
samlLogin: false # If you are using a SAML auth service (again, you probably aren't) change this to true.
cors: true # Leave this as true for dev, and change to false for prod. Affects API accesibility
adminEmail: 'name@domain.com' # The email address automated emails should go to.
siteEmail: 'name@domain.com' # The email address automated emails should come from.
```

### Deploy the project

In the root level of your project run:
```
sls deploy --stage dev
# If you have a defined AWS profile you want to deploy from you can add '--profile profilename' to the end of this command
```

After deployment you will need to:
- Create a user in the newly created cognito user pool in your AWS account.
- Verify the email addresses (or domain) of the addresses listed in your config file
- Wait a while for the CDN to propagate before visting the newly created cloudfront distribution

You can run the app locally from `apps/website/`:
```
npm ci
npm start
```
