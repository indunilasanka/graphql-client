"use strict";

const aws_exports = require('./aws-exports').default;

const AppSync = {
    "graphqlEndpoint": aws_exports.ENDPOINT,
    "region": aws_exports.REGION,
    "authenticationType": aws_exports.AUTHENTICATION_TYPE,
    "apiKey": aws_exports.API_KEY,
};

global.WebSocket = require('ws');

global.window = global.window || {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    WebSocket: global.WebSocket,
    ArrayBuffer: global.ArrayBuffer,
    addEventListener: function () { },
    navigator: { onLine: true }
};

global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    }
};

require('es6-promise').polyfill();
require('isomorphic-fetch');

const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

const client = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: AppSync.apiKey
    }
});

const gql = require('graphql-tag');

const Query = gql(`
 query getNotificationsByRecipient($recipient: String!) {
     getNotificationsByRecipient(recipient:$recipient){
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
        additionalUser {
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

client.hydrated().then(function (client) {

    const vari = {
        "recipient": "12345"
    };


    client.query({ query: Query, variables: {recipient: "12345"}})
        .then(function log(data) {
            data = JSON.stringify(data);
            data = JSON.parse(data);
            if(data.data.getNotificationsByRecipient) {
                console.log(data.data.getNotificationsByRecipient)
            }
            else {
                console.log("Error while fetching data");
            }
        })
        .catch(console.error);
});
