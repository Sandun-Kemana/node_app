const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
const { ClientBuilder } = require("@commercetools/sdk-client-v2");
const fetch = require("node-fetch");
const { Prefix, readConfig } = require("../utils/config");

const createApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(Prefix.DEV);

  const authMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const projectApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return projectApiRoot;

}
const createMyApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    username,
    password
  } = readConfig(Prefix.ME);

  const passwordAuthMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password
      }
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const projectMyApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return projectMyApiRoot;

}
module.exports.projectApiRoot = createApiClient();
module.exports.projectMyApiRoot = createMyApiClient();