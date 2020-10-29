module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define(
        "account",
        {
            ACCOUNT_ID: {
                type: Sequelize.INTEGER(10),
                primaryKey: true,
                autoIncrement: true
            },
            EMAIL: {
                type: Sequelize.STRING(45),
                field: "EMAIL"
            },
            PASSWORD: {
                type: Sequelize.STRING(80),
                field: "PASSWORD"
            }
        },
        {
            freezeTableName: true
        }
    );
    return Account;
};
