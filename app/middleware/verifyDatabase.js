require("dotenv").config();
const { db } = require("../models");
const Account = db.account;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    Account.findOne({
        where: {
            EMAIL: req.body.email
        }
    }).then(account => {
        if (account || req.body.email == process.env.ADMIN_EMAIL) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};

checkStudentRegNumberExisted = (req, res, next) => {
    User.findOne({
        where: {
            STUDENT_REG_NUMBER:
                req.body.student_reg_number || req.body.initial_stud_reg_num
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "User not existed"
            });
            return;
        }
    });
    next();
};

checkAccountEmailExist = (req, res, next) => {
    Account.findOne({
        where: {
            EMAIL: req.body.email || req.body.initial_email
        }
    }).then(account => {
        if (!account) {
            res.status(400).send({
                message: "Account not existed"
            });
            return;
        }
    });
    next();
};

const verifyDatabase = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkStudentRegNumberExisted: checkStudentRegNumberExisted,
    checkAccountEmailExist: checkAccountEmailExist
};

module.exports = verifyDatabase;
