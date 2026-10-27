const Joi = require('joi');

const joiTodoSchema = Joi.object({
    title: Joi.string().trim().required(),
})

module.exports = joiTodoSchema;

//* ---------------------------------------------------------------*

// const joiTaskSchema = Joi.object({
//     tasks: Joi.string()
// })

// module.exports = joiTaskSchema;

//*---------------------------------------------------------------------*

const joiUserSchema = Joi.object({
    username: Joi.string().required().trim(),

    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),

    password: Joi.string().trim().required()
})

module.exports = joiUserSchema;