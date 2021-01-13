import * as net from "net";
import { Logger } from "../../tools/Logger";
import { PacketRouter } from "../routers/PacketRouter";
import { Session } from "../Session";

export abstract class Server {

    protected server: net.Server;
    protected host: string;
    protected port: number;
    protected packetRouter: PacketRouter;
    protected sessionCounter: number;

    public constructor(name: string, host: string, port: number, packetRouter: PacketRouter) {
        this.server = net.createServer();
        this.host = host;
        this.port = port;
        this.packetRouter = packetRouter;
        this.sessionCounter = 0;

        Logger.log(`${name}Server started at ${host}:${port}`);

        this.start();
    }

    public async start(): Promise<boolean> {
        this.server.on("connection", socket => {
            this.onConnection(socket);
        });
        this.server.listen(this.port, this.host);
        this.onStart();
        return true;
    }

    protected abstract onConnection(socket: net.Socket): void;
    protected abstract onClose(session: Session, hadError: boolean): void;
    protected abstract onData(session: Session, data: Buffer): void;
    protected abstract onError(session: Session, error: Error): void;
    protected abstract onStart(): void;
    protected abstract onShutdown(): void;
}