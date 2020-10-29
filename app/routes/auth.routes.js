const { verifyDatabase, authJWT } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        ),
            next();
    });

    app.post(
        "/signup",
        [
            verifyDatabase.checkDuplicateEmail,
            authJWT.verifyToken,
            authJWT.isAdmin
        ],
        controller.signup
    );

    app.post("/signin", controller.signin);
};