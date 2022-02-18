export default {
   "type": process.env.TYPEORM_CONNECTION,
   "host": process.env.TYPEORM_HOST,
   "port": process.env.TYPEORM_PORT,
   "username": process.env.TYPEORM_USERNAME,
   "password": process.env.TYPEORM_PASSWORD,
   "database": process.env.TYPEORM_DATABASE,
   "synchronize": process.env.TYPEORM_SYNCHRONIZE,
   "logging": process.env.TYPEORM_LOGGING,
   "entities": [
     process.env.TYPEORM_ENTITIES
   ],
   "migrations": [
     process.env.TYPEORM_MIGRATONS
   ],
   "subscribers": [
     process.env.TYPEORM_SUBSCRIBERS
   ],
   "cli": {
     "entitiesDir": process.env.TYPEORM_ENTITIES_DIR,
     "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR,
     "subscribersDir": process.env.TYPEORM_SUBSCRIBERS_DIR
   }
}
