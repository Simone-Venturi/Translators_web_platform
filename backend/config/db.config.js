module.exports = {
    HOST: "host.docker.internal",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "translate_platform",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }