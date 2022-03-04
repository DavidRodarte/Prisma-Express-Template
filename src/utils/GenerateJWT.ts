import jwt from 'jsonwebtoken';

/**
 * Generate JWT
 * @param {any} userId
 * @returns {Promise<any>}
 */
export const generateJWT = async (userId: any): Promise<any> => {
  // Promise
  return new Promise<any>((resolve, reject) => {
    // Received user id as payload
    const payload = { userId };
    // Sign JWT
    jwt.sign(
      payload,
      process.env.SECRET_KEY || '',
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          reject('Error while generating token');
        }
        resolve(token);
      },
    );
  });
};
