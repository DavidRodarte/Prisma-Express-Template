import "reflect-metadata";
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './routes/UserRoutes'

dotenv.config()
/**
 * Server class 
 */
class Server {
  
  private app: express.Application
  private port: Number

  /**
   * Specify routes with their path names within the array
   * example: {prefix: '/api/example', path: exampleRoute}
   */
  private routePaths = [
    { prefix: '/api/user', path: userRoutes },
  ]
  
  /**
   * Server constructor 
   * @returns void
   */
  public constructor() {
    this.app = express()
    this.port = Number(process.env.PORT) || 3000

    // Initialize middlewares
    this.middlewares()
    
    // Initialize routes
    this.routes()
    
  }
  /**
   * Server middlewares
   * @returns void
   */
  private middlewares() {
    // CORS
    this.app.use( cors() )
    // Parse to json 
    this.app.use( express.json() )
  }
  /**
   * Server routes 
   * It's reccommended to configure your routes within the this.routePaths array
   * Otherwhise you can just add your rotes like: this.app.use('/api/prefix', examplePath)
   * @returns void
   */
  private routes() {
    this.routePaths.map(route => (
      this.app.use(route.prefix, route.path)
    ))
  }
  /**
   * Listen method
   * @returns void
   */
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

/**
 * Instance of Server class
 */
const server = new Server()
/**
 * Start server
 */
server.listen()
