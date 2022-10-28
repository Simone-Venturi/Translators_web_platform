module.exports = {
    development: {
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 20,
        min: 1,
        acquire: 60000,
        idle: 10000
      },
    },
    test: {
      database: process.env.DB_NAME_TEST,
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      host: process.env.DB_HOST_TEST,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 20,
        min: 1,
        acquire: 60000,
        idle: 10000
      },
    },
    production: {}
};