// Packages
import express from 'express';

const RateLimit = require('express-rate-limit');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger.json');

// Errors
import {NotFoundError} from '../errors/NotFoundError';
import {errorHandler} from '../middlewares/errorHandler';
import {ClientError} from '../errors/ClientError';
import AuthenticateApi from "../middlewares/AuthenticateApi";
import {publicRouter} from "./public";
import {semiPrivateRouter} from "./semi-private";
import {privateRouter} from "./private";


const router = express.Router();

// ------------- Api Limiter -------------------
let max: number = 40;
if (process.env.NODE_ENV === 'test') max = 1000;
const apiLimiter = new RateLimit({
    windowMs: 1000 * 60 * 5,
    max,
    handler: function (req, res) {
        throw new ClientError('Your request is too much. Please try again in 15 minutes later', 408);
    },
});
//----------------------------------------------

router.use(AuthenticateApi.public);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// APIs
router.use('/api', cors(), apiLimiter, publicRouter);
router.use('/api', cors(), AuthenticateApi.semiPrivate, apiLimiter, semiPrivateRouter);
router.use('/api', cors(), AuthenticateApi.private, apiLimiter, privateRouter);

// Error 404
router.all('*', (req: any, res: any, next: any) => {
    throw new NotFoundError('Not Found');
});
router.use(errorHandler);

export {router as Router};
