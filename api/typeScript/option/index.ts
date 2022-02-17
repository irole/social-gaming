const fileExt = require('./fileExt');
const layout = require('./layout');
const session = require('./session');
const httpStatus = require('./httpStatus');
const service = require('./service');
const namespace = require('./namespace');

module.exports = {
    fileExt,
    layout,
    session,
    httpStatus,
    service,
    namespace,
    jwt: {
        secret_key: process.env.JWT_SECRETKEY,
    },
};
