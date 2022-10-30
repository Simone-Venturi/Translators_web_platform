module.exports = {
    development: {        
        HOST: process.env.MONGO_HOST,
        PORT: process.env.MONGO_PORT,
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD,
        DB: process.env.MONGO_DB
    },
    test: {        
        HOST: process.env.MONGO_HOST_TEST,
        PORT: process.env.MONGO_PORT_TEST,
        USER: process.env.MONGO_USER_TEST,
        PASSWORD: process.env.MONGO_PASSWORD_TEST,
        DB: process.env.MONGO_DB_TEST
    }
  }