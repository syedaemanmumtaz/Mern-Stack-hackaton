import chalk from 'chalk';

export const errorHandler = (err, req, res, next) => {
    console.error(chalk.red.bold(`[SERVER ERROR]: ${err.message}`));
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
