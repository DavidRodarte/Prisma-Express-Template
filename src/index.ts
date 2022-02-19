import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import dotenv from 'dotenv'
import cors from 'cors'
import { UserController } from './controllers/UserController'

dotenv.config()

class Server {
  
  private app: any
  private port: Number
  
  /**
   * Server constructor 
   * @returns void
   */
  public constructor() {
    this.app = createExpressServer({
      controllers: [UserController],
      middlewares: [cors()]
    })

    this.port = Number(process.env.PORT) || 3000
  }

  /**
   * Listen method
   * @returns void
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

const server = new Server()
server.listen()

