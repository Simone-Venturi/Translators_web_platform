module.exports = {
    HOST: "postgres_translate",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "translate_platform",
    dialect: "postgres",
    pool: {
      max: 20,
      min: 1,
      acquire: 60000,
      idle: 10000
    }
  }