import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import dotenv from 'dotenv'
import { UserController } from './controllers/UserController'
import { createConnection } from 'typeorm'

dotenv.config()

class Server {
  // {any} app
  private app: any
  // {number} port
  private port: number
  
  /**
   * Server constructor 
   * initializes express server 
   * and sets listening port
   */
  public constructor() {
    this.app = createExpressServer({
      cors: true,
      controllers: [UserController],
    })

    this.port = Number(process.env.PORT) || 3000
    
    this.database()
  }

  public async database() {
    await createConnection()
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
// {Server} server
const server = new Server()
server.listen()

