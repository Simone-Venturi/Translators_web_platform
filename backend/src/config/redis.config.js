module.exports = {
  development: {
    HOST: process.env.REDIS_HOST,
    PASSWORD: process.env.REDIS_PASSWORD,
    PORT: process.env.REDIS_PORT
  },
  test: {
    HOST: process.env.REDIS_HOST_TEST,
    PASSWORD: process.env.REDIS_PASSWORD_TEST,
    PORT: process.env.REDIS_PORT_TEST
  }
}