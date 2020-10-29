require("dotenv").config();
const { db } = require("../models");
const User = db.user;
const Account = db.account;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
    //Save user to database
    User.create({
        STUDENT_REG_NUMBER: req.body.student_reg_number,
        RESIDENCE_ID: req.body.residence_id,
        LAST_NAME: req.body.last_name,
        FIRST_NAME: req.body.first_name,
        NAMA_SESUAI_IJAZAH: req.body.nama_sesuai_ijazah,
        HIGH_SCHOOL_ID: req.body.high_school_id,
        FINANCE_NUMBER: req.body.finance_number,
        DOB: req.body.dob,
        POB: req.body.pob,
        NIM: req.body.nim,
        REG_TRANS_ID: req.body.reg_trans_id,
        SEMESTER_ID: req.body.semester_id,
        GENDER: req.body.gender,
        MARITAL_STATUS: req.body.marital_status,
        NATIONALITY_ID: req.body.nationality_id,
        RELIGION_ID: req.body.religion_id,
        FACULTY_CODE: req.body.faculty_code,
        PROGRAM_STUDY_CODE: req.body.program_study_code,
        MINOR_CODE: req.body.minor_code,
        PHONE: req.body.phone,
        HANDPHONE: req.body.handphone
    }).then(user => {
        Account.create({
            EMAIL: req.body.email,
            PASSWORD: bcrypt.hashSync(req.body.password, 10),
            USER_ID: user.ID
        })
            .then(() => {
                res.send({ message: "User was registered successfully" });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    });
};

exports.signin = (req, res) => {
    if (
        req.body.email == process.env.ADMIN_EMAIL &&
        req.body.password == process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            { id: req.body.email },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        );
        return res.status(200).send({
            message: `Token successfully created`,
            accessToken: token
        });
    }
    Account.findOne({
        where: {
            EMAIL: req.body.email
        }
    })
        .then(account => {
            if (!account && req.body.email !== process.env.ADMIN_EMAIL) {
                return res.status(404).send({ message: `account not found` });
            }
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                account.PASSWORD
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: `Invalid Password!`
                });
            }
            const token = jwt.sign(
                { id: account.id },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "15m"
                }
            );
            res.status(200).send({
                message: `Token sucessfuly created`,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
