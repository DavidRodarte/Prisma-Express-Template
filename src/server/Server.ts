import express from 'express';
import { createExpressServer } from 'routing-controllers';
import dotenv from 'dotenv';
import path from 'path';
import { ErrorHandler } from '../middleware/ErrorHandler';
import { authCheck } from '../utils/authorizationChecker';

dotenv.config();

/**
 * Server class
 * @class
 */
export class Server {
  /** @type {express.Application} */
  private app: express.Application;
  /** @type {number} */
  private port: number;

  /**
   * Server constructor
   * initializes express server
   * and sets listening port
   * @constructor
   * @returns void
   */
  public constructor() {
    this.app = createExpressServer({
      cors: true,
      defaultErrorHandler: false,
      middlewares: [ErrorHandler],
      authorizationChecker: authCheck,
      controllers: [path.join(__dirname + '/../controllers/*.js')],
    });

    this.port = Number(process.env.PORT) || 3000;
  }

  /**
   * Listen method
   * @memberof Server
   * @returns void
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
