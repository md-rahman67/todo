const Joi = require("joi");

module.exports.joiTodoSchema = Joi.object({
    title: Joi.string().trim().required(),
})

//* ---------------------------------------------------------------*

// module.exports.joiTaskSchema = Joi.object({
//     tasks: Joi.string()
// })

//*---------------------------------------------------------------------*

module.exports.joiUserSchema = Joi.object({
    username: Joi.string().required().trim(),

    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),

    password: Joi.string().trim().required()
})

// module.exports = {joiUserSchema};