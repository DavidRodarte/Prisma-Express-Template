import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers';
import { Request, Response } from 'express';
/**
 * ErrorHandler middleware class
 * @class
 * @decorator `Middleware({ type: "after" })`
 */
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  /**
   * Error handler method
   * @param {any} error
   * @param {Request} request
   * @param {Response} response
   * @param {any} next
   * @returns {any}
   */
  public error(
    error: any,
    request: Request,
    response: Response,
    next: (err: any) => any,
  ): any {
    if (response.headersSent) {
      return;
    }

    response.status(error.httpCode || 500).json(error);
  }
}
