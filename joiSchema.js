const Joi = require('joi');

const joiTodoSchema = Joi.object({
    title: Joi.string().trim().required(),
})

module.exports = joiTodoSchema;

//* ---------------------------------------------------------------*

const joiTaskSchema = Joi.object({
    tasks: Joi.string().trim().required(),

    checked: Joi.boolean().default(false)
})

module.exports = joiTaskSchema;