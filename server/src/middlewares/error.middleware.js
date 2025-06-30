import { ApiError } from "../utils/api-error.js"

export const errorHandler = (err, req,res,next) => {
    if (err instanceof ApiError){
        if (err.statusCode && err.message) {
            return res.status(err.statusCode).jason({
                statusCode: err.statusCode,
                success: err.success,
                message: err.message,
            });
        }
    }
};