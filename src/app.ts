import 'reflect-metadata';
import { Server } from './server/Server';

/**
 * Instantiates Server
 */
const server: Server = new Server();

/** Starts listening */
server.listen();
