const { db, redisClient } = require("../models");
const User = db.user;
const Account = db.account;
const bcrypt = require("bcrypt");

exports.allAccess = (req, res) => {
    res.status(200).send(`All can access`);
};

exports.studentBoard = (req, res) => {
    User.findAll().then(users => {
        res.status(200).send(users);
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send({
        message: `This is admin panel`
    });
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send(`Moderator Content`);
};

exports.updateAccount = (req, res) => {
    Account.update(
        {
            EMAIL: req.body.email,
            PASSWORD: bcrypt.hashSync(req.body.password, 10)
        },
        {
            where: {
                EMAIL: req.body.initial_email
            }
        }
    )
        .then(() => {
            res.status(200).send({ message: "Account successfully updated" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateUser = (req, res) => {
    User.update(
        {
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
        },
        {
            where: {
                STUDENT_REG_NUMBER: req.body.initial_stud_reg_num
            }
        }
    )
        .then(() => {
            res.status(200).send({ message: `User is successfully updated` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.logout = (req, res) => {
    const token = req.headers["x-access-token"];

    try {
        redisClient.sadd(`blacklist_token`, token);
        return res.status(200).send({ message: "You are logged out" });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            error: error.toString()
        });
    }
};

exports.deleteUser = (req, res) => {
    User.destroy({
        where: {
            STUDENT_REG_NUMBER: req.body.student_reg_number
        },
        force: true
    })
        .then(() => {
            res.status(200).send("User has been removed");
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
