import express from 'express';
import { createExpressServer } from 'routing-controllers';
import dotenv from 'dotenv';
import path from 'path';
import { ErrorHandler } from '../middleware/ErrorHandler';
import { authCheck } from '../utils/authorizationChecker';

dotenv.config();

export class Server {
  // {any} app
  private app: express.Application;
  // {number} port
  private port: number;

  /**
   * Server constructor
   * initializes express server
   * and sets listening port
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
   * @returns void
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
