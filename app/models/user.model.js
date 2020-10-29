module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "student",
        {
            ID: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            LAST_NAME: {
                type: Sequelize.STRING(255),
                field: "LAST_NAME"
            },
            FIRST_NAME: {
                type: Sequelize.STRING(255),
                field: "FIRST_NAME"
            },
            NAMA_SESUAI_IJAZAH: {
                type: Sequelize.STRING(255),
                field: "NAMA_SESUAI_IJAZAH"
            },
            HIGH_SCHOOL_ID: {
                type: Sequelize.INTEGER(11),
                field: "HIGH_SCHOOL_ID"
            },
            FINANCE_NUMBER: {
                type: Sequelize.STRING(45),
                field: "FINANCE_NUMBER"
            },
            DOB: {
                type: Sequelize.DATE,
                field: "DOB"
            },
            POB: {
                type: Sequelize.STRING(45),
                field: "POB"
            },
            NIM: {
                type: Sequelize.STRING(45),
                field: "NIM"
            },
            REG_TRANS_ID: {
                type: Sequelize.STRING(45),
                field: "REG_TRANS_ID"
            },
            SEMESTER_ID: {
                type: Sequelize.STRING(45),
                field: "SEMESTER_ID"
            },
            GENDER: {
                type: Sequelize.STRING(3),
                field: "GENDER"
            },
            MARITAL_STATUS: {
                type: Sequelize.INTEGER(2),
                field: "MARITAL_STATUS",
                comment:
                    "1 = SINGLE 2 = MARRIED 3 = DIVORCE 4 = WIDOW 5 = WIDOWER"
            },
            NATIONALITY_ID: {
                type: Sequelize.STRING(45),
                field: "NATIONALITY_ID"
            },
            RELIGION_ID: {
                type: Sequelize.STRING(45),
                field: "RELIGION_ID"
            },
            FACULTY_CODE: {
                type: Sequelize.STRING(45),
                field: "FACULTY_CODE"
            },
            PROGRAM_STUDY_CODE: {
                type: Sequelize.STRING(45),
                field: "PROGRAM_STUDY_CODE"
            },
            MINOR_CODE: {
                type: Sequelize.STRING(45),
                field: "MINOR_CODE"
            },
            PHONE: {
                type: Sequelize.STRING(45),
                field: "PHONE"
            },
            HANDPHONE: {
                type: Sequelize.STRING(45),
                field: "HANDPHONE"
            },

            STUDENT_REG_NUMBER: {
                type: Sequelize.STRING(45),
                allowNull: false,
                field: "STUDENT_REG_NUMBER"
            },
            RESIDENCE_ID: {
                type: Sequelize.STRING(45),
                allowNull: false,
                field: "RESIDENCE_ID"
            }
        },
        {
            freezeTableName: true
        }
    );

    return User;
};
