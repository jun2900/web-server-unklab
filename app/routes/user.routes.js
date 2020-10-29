const { authJWT, verifyDatabase } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/student", authJWT.verifyToken, controller.studentBoard);

    app.post("/logout", controller.logout);

    app.put(
        "/student",
        [
            verifyDatabase.checkStudentRegNumberExisted,
            authJWT.verifyToken,
            authJWT.isAdmin
        ],
        controller.updateUser
    );

    app.delete(
        "/student",
        [
            verifyDatabase.checkStudentRegNumberExisted,
            authJWT.verifyToken,
            authJWT.isAdmin
        ],
        controller.deleteUser
    );
};
