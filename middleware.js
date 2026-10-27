const {joiTodoSchema, joiTaskSchema, joiUserSchema} = require("./joiSchema.js");
const ExpressError = require("./utils/express-error.js");

//* check if user is logged in or not
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "User must be logged in to perform this action");
        return res.redirect("/login");
    }
    next();
}

module.exports.validateTodos = ((req, res, next) => {
    let { error } = joiTodoSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
})

// module.exports.validateTasks = ((req, res, next) => {
//     let { error } = joiTaskSchema.validate(req,body);

//     if(error) {
//         throw new ExpressError(400, error.details[0].message);
//     } else {
//         next();
//     }
// })

module.exports.validateUsers = ((req, res, next) => {
    let { error } = joiUserSchema.validate(req.body);

    if(error){
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
})