export const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Oops Server Issue !!!"); // it means: err.message = err.message || "";
    err.statusCode || (err.statusCode = 500);
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
