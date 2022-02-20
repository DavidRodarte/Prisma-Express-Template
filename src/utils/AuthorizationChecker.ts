import { Action, UnauthorizedError } from "routing-controllers"
import {getConnection} from "typeorm";
import {User} from "../entity/User";
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
}
export const check = async (action: Action, roles: string[]): Promise<boolean> => {

  const token = action.request.headers['token'];

  const { userId } = jwt.verify(token, process.env.SECRET_KEY || '') as JwtPayload

  const userRepository = getConnection().getRepository(User)
  const user = await userRepository.findOne({
    where: { id: userId },
    select: [ 'id', 'isActive' ],
    relations: [ 'role' ]
  })

  if( !user ) {
    throw new UnauthorizedError("You're not authorized");
  
  }

  if( !user.isActive ) {
    throw new UnauthorizedError("You're not authorized");
  }


  if (user && !roles.length) return true;
  if (user && roles.find(role => user.role.name === role)) return true;

  throw new UnauthorizedError("You're not authorized");
}
