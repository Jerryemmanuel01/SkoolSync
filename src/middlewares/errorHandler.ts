import { logErrorToFile } from "../utils/errorLogger.ts";
import { Request, Response, NextFunction } from "express";

interface SequelizeErrorItem {
    path: string;
    message: string;
}

interface CustomError extends Error {
    status?: number;
    name: string;
    errors?: SequelizeErrorItem[];
    code?: string;
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logErrorToFile(err);

    // Sequelize unique constraint error
    if (err.name === "SequelizeUniqueConstraintError" && err.errors) {
        const field = err.errors[0].path;
        return res.status(400).json({
            status: "error",
            message: `${field} already exists`,
        });
    }

    // Sequelize validation error
    if (err.name === "SequelizeValidationError" && err.errors) {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return res.status(400).json({
            status: "error",
            message: "Validation error",
            errors,
        });
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            status: "error",
            message: "Invalid token",
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            status: "error",
            message: "Token expired",
        });
    }

    // Multer errors
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            status: "error",
            message: "File size too large",
        });
    }

    // Default error if no other error code was found.
    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal server error",
    });
};

export default errorHandler;
