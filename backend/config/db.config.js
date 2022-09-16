module.exports = {
    HOST: "postgres_translate",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "translate_platform",
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }