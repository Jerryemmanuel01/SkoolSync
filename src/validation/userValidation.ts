import Joi from 'joi';

export const registerValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.'
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.'
    }),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password does not match.'
    }),
    firstName: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.'
    }),
    lastName: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.'
    }),
    role: Joi.string().valid('student', 'teacher', 'admin').default('student').messages({
        'any.only': 'Role must be one of student, teacher, or admin.'
    }),
});

export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.'
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.'
    }),
});

export const emailVerificationSchema = Joi.object({
	authCode: Joi.number().required().messages({
		'string.empty': 'Verification code is required.'
	})
});

export const logoutValidationSchema = Joi.object({
	refreshToken: Joi.string().required().messages({
		'string.empty': 'Refresh token is required.'
	})
});