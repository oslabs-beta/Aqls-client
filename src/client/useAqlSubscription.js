import { useSubscription } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import * as timesync from 'timesync';

function useAqlSubscription(query, options, subscriptionResolver) {
  //synchronize time with timesync server
  const ts = timesync.create({
    server: '/aqlsanalytics/timesync',
    interval: 10000,
  });

  function sendAqlToAnalytics(client, subscriptionResolver) {
    // create final properties on Aql
    const aqlToSendToDB =
      client.subscriptionData.data[subscriptionResolver].aql;
    aqlToSendToDB.subscriberReceived = ts.now();
    aqlToSendToDB.roundtripTime = `${
      aqlToSendToDB.subscriberReceived - aqlToSendToDB.mutationSendTime
    }`;

    // extract variable names for post request
    const {
      mutationSendTime,
      mutationReceived,
      subscriberReceived,
      roundtripTime,
      mutationId,
      resolver,
      userToken,
    } = aqlToSendToDB;

    // create options object for post request that will send Aql to analytics endpoint
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: uuidv4(),
        mutationSendTime,
        mutationReceived,
        subscriberReceived,
        roundtripTime,
        mutationId,
        resolver,
        userToken,
      }),
    };

    // send Aql to /analytics
    fetch(`/aqlsanalytics`, options).catch((err) => console.log(err));
  }
  // make copy of options object
  const newOptions = { ...options };
  // if functions are declared in the onSubscriptionData property
  if (newOptions.onSubscriptionData) {
    // save the functions and call sendAqlToAnalytics first
    const holder = newOptions.onSubscriptionData;
    newOptions.onSubscriptionData = (client) => {
      sendAqlToAnalytics(client, subscriptionResolver);
      //holder function to be called
      holder(client);
    };
  } else {
    // otherwise call sendAqlToAnalytics
    newOptions.onSubscriptionData = (client) => {
      sendAqlToAnalytics(client, subscriptionResolver);
    };
  }
  // call useSubscription, passing newOptions object
  const { data, loading, error } = useSubscription(query, newOptions);

  // return data, loading, error object
  return {
    data,
    loading,
    error,
  };
}

export default useAqlSubscription;
