# Aqls-Client


## Overview
GraphQL analytics toolkit and dashboard that integrate with Apollo Client and Apollo Server Express. It is an easy to use analytics suite that monitors GraphQL subscriptions concurrency, latency, errors, and resolver frequency. Our integrated dashboard displays your GraphQL analytics on dynamic and interactive charts. 

This package is for setting up your client-side. For the server-side package please refer to the [Aqls-server](https://github.com/oslabs-beta/Aqls-server) package.

**Note:** Aqls is currently in BETA and improvements will continue to be implemented. If any issues are encountered while using our application, please submit a PR. 


## Requirements
- **React** *version* 16.8+
- **apollo-client** *version* 3.2.1+

## Install
With npm:

```
npm install --save @aqls/client
```

## Tracking GraphQL Subscriptions

####
- [ ] **1**. Import useqAqlSubscription:

```javascript
import { useAqlSubscription } from '@aqls/client';
```
####
- [ ] **2**. Include aql in GraphQL query:
```javascript
const colorSubscription = gql`
    subscription {
      updatedColor {
        cssColor
        aql {
          mutationSendTime
          mutationReceived
          subscriberReceived
          mutationId
          resolver
          userToken
        }
      }
    }
  `;
```
####
- [ ] **3**. Invoke useAqlSubscription hook:
```javascript
 const { data, loading, error } = useAqlSubscription(
    graphQLQuery,
    { optionsObject },
    subscriptionResolver,
  );
```
**Note:** optionsObject accepts any options available in the [Apollo-client useSubscription](https://www.apollographql.com/docs/react/data/subscriptions/#options) hook
###
**useAqlSubscription hook example:** 
```javascript
 const { data, loading, error } = useAqlSubscription(
    colorSubscription,
    {
      onSubscriptionData: (client) => {
        setColor(client.subscriptionData.data.updatedColor.cssColor);
      },
    },
    'updatedColor',
  );
 ```
####
## Tracking GraphQL Mutations

####
- [ ] **1**. Import useqAqlMutation:

```javascript
import { useAqlMutation } from '@aqls/client';
```
####
- [ ] **2**. Invoke useAqlMutation hook:
```javascript
useAqlMutation(query)
```
This hook takes a GraphQL query and automatically injects analytics into it. You can use `.then()` if you want to access async functionality. Below is an example using the hook as part of a click handler.

```javascript
const handleClick = (chosenColor) => {
    const colorQuery = `mutation{newColor(colorArg: "${chosenColor}"){id cssColor}}`;
    useAqlMutation(colorQuery)
      .then((data) =>
        setColor(data.chosenColor)
      )
      .catch((err) => setError(err));
```
####
####

- [ ] **Lastly, Connect with the Aqls Team!**

Visit our website: [Aqls.io](https://www.aqls.io/)

Contact us: aqlorgteam@gmail.com

Case Simmons: [Case's Github](https://github.com/casesimmons) and [Case's LinkedIn](https://www.linkedin.com/in/case-simmons/)

Julie Pinchak: [Julie's Github](https://github.com/jpinchak) and [Julie's LinkedIn](https://www.linkedin.com/in/julie-pinchak/)

Michael O'Halloran: [Michael's Github](https://github.com/LordRegis22) and [Michael's LinkedIn](https://www.linkedin.com/)

Rocio Infante: [Rocio's Github](https://github.com/Rocio-Infante) and [Rocio's LinkedIn](https://www.linkedin.com/in/rocio-infante/)
