"use strict";

require('cross-fetch/polyfill');
const aws_exports = require('./aws-exports').default;
const gql = require('graphql-tag');
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

const AppSync = {
    "graphqlEndpoint": aws_exports.ENDPOINT,
    "region": aws_exports.REGION,
    "authenticationType": aws_exports.AUTHENTICATION_TYPE,
    "apiKey": aws_exports.API_KEY,
};

const client = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {

        type: AUTH_TYPE.API_KEY,
        apiKey: AppSync.apiKey
    },
    disableOffline: true
});

const Mutation = gql(`mutation CreateNotification(
  $recipient: String!
  $notificationType: String!
  $sender: String
  $additionalUser: String
  $ask: String
  $skill: String
  $action: String
  $isRead: Boolean
  $isDeleted: Boolean
) {
  createNotification(
    recipient: $recipient
    notificationType: $notificationType
    sender: $sender
    recommendedUser: $recommendedUser
    ask: $ask
    skill: $skill
    action: $action
    isRead: $isRead
    isDeleted: $isDeleted
  ) {
    id
    createdAt
    isDeleted
    isRead
    notificationType {
      id
      name
      template
    }
    recipient {
      userId
      email
      firstName
      lastName
      profileImageUrl
    }
    sender {
      userId
      email
      firstName
      lastName
      profileImageUrl
    }
    recommendedUser {
      userId
      email
      firstName
      lastName
      profileImageUrl
    }
    ask {
      id
      skill
      location
      description
      findBy
    }
    skill {
      id
      name
    }
    action
  }
}`);


/*const conversation = async (args) => {

    if (!isEmpty(args)) {

        const { conversationId } = args

        const record = await get(conversationId)

        return record
    }
}*/

/*const run = async (args) => {
    await client.hydrated();

    const result = await client.query({
        query: Query,
        variables: {recipient: "12345"}
    });
    console.log(result.data);
};*/

client.hydrated().then(function (client) {
    // Now run a mutation
    const params = {
        recipient: '12346',
        sender: '12345',
        notificationType: '10000',
        isRead: false,
        isDeleted: false,
    };

    client.mutate({ mutation: Mutation, variables:params })
        .then(function logData(data) {
            if(data) {
                console.log('(Mutate): updating Data ----------->', data);
            }
            else {
                console.log('Error!');
            }

        })
        .catch(console.error);
});



/*(async () => {
    await client.hydrated();

    const result = await client.query({
        query: Query,
        variables: {recipient: "12345"}
    });
    console.log(result.data);
})();*/

