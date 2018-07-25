// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const { Mongoose } = require('mongoose');
const inflection = require('inflection');

module.exports = async (on, config) => {
  // Make env vars available to cypress tests via `Cypress.env()`
  config.env = process.env;

  config.baseUrl = `http://localhost:${process.env.PORT}`;

  const mongoose = new Mongoose();
  await mongoose.connect(`mongodb://localhost/${inflection.dasherize(process.env.PROJECT_NAME).toLowerCase()}`);

  const dbConnection = mongoose.connection.db;

  on('task', {
    'mongoFind': ({ collection, query }) => {
      const mongoQuery = dbConnection.collection(collection).find(query);
      return new Promise((resolve, reject) => mongoQuery.toArray((error, items) => {
        if (error) {
          return reject(error);
        }
        // eslint-disable-next-line no-underscore-dangle
        resolve(items.map(item => Object.assign({}, item, { id: item._id })));
      }));
    },

    'mongoInsertOne': ({ collection, document }) =>
      dbConnection.collection(collection).insertOne(document)
        .then(({ insertedId }) => ({ id: insertedId })),
  });

  return config;
};
