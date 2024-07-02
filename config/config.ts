import * as process from 'process'

export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  corsOrigin: process.env.CORS_ORIGIN,

  mongo: {
    uri: 'mongodb://'
      + `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
      + `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`
      + `${process.env.MONGO_DBNAME}?${process.env.MONGO_OPTIONS}`,
  },
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY,
    password: process.env.SHOPIFY_PASSWORD,
    baseUrl: `https://${process.env.SHOPIFY_STORE}.myshopify.com/admin/api/${process.env.SHOPIFY_API_VERSION}`
  },
})
