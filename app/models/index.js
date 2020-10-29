require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: false,
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const redis = require("redis");
const redisPort = process.env.REDIS_CLIENT_PORT;
const redisClient = redis.createClient(redisPort);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.account = require("./account.model.js")(sequelize, Sequelize);

//db.user.hasOne(db.account );
db.account.belongsTo(db.user, {
    foreignKey: "USER_ID",
    onDelete: "CASCADE",
    as: "student"
});

const model = {
    db: db,
    redisClient: redisClient
};

module.exports = model;
