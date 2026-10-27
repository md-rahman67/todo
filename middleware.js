const {joiTodoSchema, joiTaskSchema} = require("./joiSchema.js");
const ExpressError = require("./utils/express-error.js");

module.exports.validateTodos = ((req, res, next) => {
    let { error } = joiTodoSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
})

module.exports.validateTasks = ((req, res, next) => {
    let { error } = joiTaskSchema.validate(req,body);

    if(error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
})