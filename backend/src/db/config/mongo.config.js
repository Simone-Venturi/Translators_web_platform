module.exports = {
    development: {        
        HOST: process.env.MONGO_HOST,
        PORT: process.env.MONGO_PASSWORD,
        USER: process.env.MONGO_USER,
        PASSWORD: MONGO_PASSWORD,
        DB: MONGO_DB
    },
    test: {        
        HOST: process.env.MONGO_HOST_TEST,
        PORT: process.env.MONGO_PASSWORD_TEST,
        USER: process.env.MONGO_USER_TEST,
        PASSWORD: MONGO_PASSWORD_TEST,
        DB: MONGO_DB_TEST
    }
  }