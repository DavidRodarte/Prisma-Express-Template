import { Action, UnauthorizedError } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import { UserService } from '../services';

interface JwtPayload {
  userId: string;
}
/**
 * Authorization checker
 * @param {Action} action
 * @param {string[]} roles
 * @returns {Promise<boolean>}
 */
export const authCheck = async (
  action: Action,
  roles: string[],
): Promise<boolean> => {
  // Get token from headers
  const authorization = action.request.headers['authorization'];
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedError('Missing token');
  }

  // Verify jwt and get userId from payload
  const { userId } = jwt.verify(
    token,
    process.env.SECRET_KEY || '',
  ) as JwtPayload;

  // Search user by userId
  const userService = new UserService();
  const user = await userService.getByUUID(userId);

  // User not found
  if (!user) {
    throw new UnauthorizedError('Invalid user');
  }
  // User is not active
  if (!user.isActive) {
    throw new UnauthorizedError('Blocked user');
  }

  // Active user and no role required
  if (user && !roles.length) return true;
  // Active user and role admited

  if (user && roles.find((role) => user.role.name === role)) return true;

  // Not authorized
  throw new UnauthorizedError("You're not authorized");
};
