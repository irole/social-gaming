// require('module-alias/register');
//
// // Socket
// const socket = require('socket.io');
// const SocketFactory = require('@socket/SocketFactory');
// /**
//  * Module dependencies.
//  */
// const Server = require('@typeScript/server');
// const http = require('http');
// const config = require('config');
//
// const {app} = Server;
// const debug = require('debug')('iRole-Express-Api:server');
//
// /**
//  * Normalize a port into a number, string, or false.
//  */
//
// function normalizePort(val) {
//     const port = parseInt(val, 10);
//
//     if (Number.isNaN(port)) {
//         // named pipe
//         return val;
//     }
//
//     if (port >= 0) {
//         // port number
//         return port;
//     }
//
//     return false;
// }
//
// /**
//  * Event listener for HTTP server "error" event.
//  */
// /**
//  * Get port from environment and store in Express.
//  */
// const port = normalizePort(config.ApplicationPort || '3000');
//
// function onError(error) {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }
//
//     const bind = typeof port === 'string'
//         ? `pipe ${port}`
//         : `Port ${port}`;
//
//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//         case 'EACCES':
//             console.error(`${bind} requires elevated privileges`);
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(`${bind} is already in use`);
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// }
//
// /**
//  * Event listener for HTTP server "listening" event.
//  */
//
// /**
//  * Create HTTP server.
//  */
//
//
// function setUpSocket(server) {
//     let io = socket(server);
//     new SocketFactory(io);
// }
//
// const server = http.createServer(app);
// setUpSocket(server);
//
// function onListening() {
//     const addr = server.address();
//     const bind = typeof addr === 'string'
//         ? `pipe ${addr}`
//         : `port ${addr.port}`;
//     debug(`Listening on ${bind}`);
//     debug(`Listening on ${bind}`);
// }
//
// /**
//  * Listen on provided port, on all network interfaces.
//  */
//
// server.listen(process.env.PORT || port, () => console.log(`Listening on port ${port} Mode = ${process.env.NODE_ENV}`));
// server.on('error', onError);
// server.on('listening', onListening);

import mongoose from 'mongoose';
import {Server, app} from '../../server';
import SocketFactory from "../socket/SocketFactory";
const http = require('http');
const config = require('config');
const socket = require('socket.io');

class Application {

    mangoDbName: any = config.DatabaseUrl;
    port = this.normalizePort(config.ApplicationPort || '3000');
    server;
    debug = require('debug')('iRole-Express-Api:server');

    constructor() {
        this.setMongoConnection();
        this.setServer();
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mangoDbName, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('connect to mongoDb Database!');
        });
    }
     setUpSocket(server) {
        let io = socket(server);
        new SocketFactory(io);
    }

    setServer() {
        new Server();
        /**
         * Create HTTP server.
         */
        this.server = http.createServer(app);
        this.setUpSocket(this.server);
        this.server.listen(process.env.PORT || this.port, () => console.log(`Listening on port ${this.port} Mode = ${process.env.NODE_ENV}`));
        this.server.on('error', this.onError);

    }

    /**
     * Normalize a port into a number, string, or false.
     */
    normalizePort(val) {
        const port = parseInt(val, 10);

        if (Number.isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof this.port === 'string'
            ? `pipe ${this.port}`
            : `Port ${this.port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

new Application();
