# Prisma Express Server

<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

Base Express server template with Prisma ORM (v3), routing-controllers, JWT authentication & TypeScript

## Features

- TypeScript
- Prisma ORM
- Routing controllers
- JWT Authentication
- Authorization and roles
- Eslint
- Prettier
- DTO pattern
- Validations
- Global error handler
- Dotenv config

## Project structure

```
📦src # Main folder of code
 ┣ 📂controllers # Folder for handlers functions called from routes
 ┣ 📂dtos # DTO pattern for handling data
 ┣ 📂exceptions # Global handle error
 ┣ 📂interfaces # Interfaces for greater abstraction
 ┣ 📂middleware # Folder for express middlewares
 ┣ 📂server # Express server instance with routing-controllers config
 ┣ 📂services # Services for write core code bussiness
 ┣ 📂utils # Utils for usage in the application
 ┗ 📜app.ts # Main file
```

## Install

Install required packages with

```
npm install
```

or

```
yarn install
```

## Initial configuration

Create an `.env` file and setup the variables

```
cp .env.example .env
```

Migrate with prisma in order to create the required database tables

```
npx prisma migrate deploy
```

or

```
yarn prisma migrate deploy
```

## Development

While editing your code, you probably want to automatically build your application and watch for changes with nodemon, in order to achieve that, just run `npm run dev` and `npm run dev:watch` or `yarn dev` and `yarn dev:watch`

## Production

Build your application with `npm run build` or `yarn build` and then run it with `node start` or `yarn start`

## Author

**David Rodarte**

- Website: https://davidrodarte.vercel.app
- Github: [@DavidRodarte](https://github.com/DavidRodarte)

## Licence

MIT
