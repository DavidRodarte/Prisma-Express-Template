import bcryptjs from 'bcryptjs'

/**
 * Generates a hash from received string 
 * @param {string} str 
 * @returns {Promise<string>}
 */
export const hash = async (str: string ): Promise<string> => {
  const salt = bcryptjs.genSaltSync()
  return bcryptjs.hashSync( str, salt )
}

