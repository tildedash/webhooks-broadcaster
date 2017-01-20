# Lambda Webhooks Forwarding

This lambda function forward all (JSON) webhooks received (via AWS API Gateway) to a list of endpoints defined in an environment variable.

## Setup

### On Amazon Lambda

* Go to Amazon Lambda and create a new blank function. Keep node.js 4.3 as runtime.
* Clone this repository, run ```npm install request``` and then ```zip -r lambda.zip *```
* Upload this zip to Amazon Lambda
* Add the environment variable ENDPOINTS and set all forwarded endpoints as value (separated by a pipe | )
* Create a new role and use it
* Create the function


### On AWS API Gateway

* Go to AWS API Gateway and create an API. You only have to choose a name (ie. webhook-redirector)
* Create a resource (= the path) (ie. /webhook)
* Create a method (POST)
* Choose the region of your lambda function
* Type the name of the function and save
* Deploy the API (Actions / Deploy API), create a new stage (ie. production or beta)
* You will find the webhook URL, which looks like https://<identifier>.execute-api.<region>.amazonaws.com/<your resource>
* Use this endpoint for every webhooks you want to forward to multiple endpoints
