import express from "express";
import { SERVER_PORT } from '../global/environment';
import socketIO from "socket.io";
import http from "http";
import * as socket from "../sockets/sockets";

export default class Server {
    private static _instence: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get _() { return this._instence || (this._instence = new this()); }  //instence

    private escucharSockets() {
        console.log('Escuchando coneiones - sockets');
        this.io.on('connect', cliente => {
            console.log('Cliente conectado');
            socket.mensaje(cliente, this.io);
            socket.desconectar(cliente); // Desconectar
        });
    }

    start(cb: Function) {
        this.httpServer.listen(this.port, cb());
    }

}
