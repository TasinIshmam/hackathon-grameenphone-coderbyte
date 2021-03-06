# Booking API

## GP Hackathon Problem Statement

Develop a hotel booking system using REST API. The hotel has 10 rooms, customers need to be registered. Customers can book one room with arrival & checkout time. During booking, the customer can pay the partial or full amount. Later during checkout, will pay any due amounts. Another customer cannot book the same room between the existing arrival & checkout time. There should be a booking list with customer name, booked room number with arrival, checkout date time, and total paid amount.

- These are the basic DB tables with minimum fields. You can add/modify table and columns according to your design.


## Run Server

1. Set Project Directory as Current Working Directory
2. Install the Dependencies

   ```sh
   npm install --save
   ```

3. Create .env file and keep it in the Project Root

   ```sh
   # .env file

    NODE_ENV=<development | production>
    AUTH_SECRET_KEY=<secret_key>
    MONGODB_URI_LOCAL=<mongo_local_uri>
    MONGODB_URI_ATLAS=<mongo_atlas_uri>
   ```

4. a. For starting server in **development** mode, run

   ```sh
   npm run dev
   ```

   or

   ```sh
   npm run start-dev
   ```

   b. For starting server in **production** mode, run (env files must be provided manually)

   ```sh
   npm run start
   ```

## Dependencies

### dependencies

- app-root-path: ^3.0.0,
- bcrypt: ^5.0.0,
- cookie-parser: ~1.4.4,
- debug: ~2.6.9,
- ejs: ~2.6.1,
- express: ~4.16.1,
- helmet: ^3.22.0,
- http-errors: ~1.6.3,
- jsonwebtoken: ^8.5.1,
- moment: ^2.29.1,
- mongoose: ^5.9.7,
- mongoose-beautiful-unique-validation: ^7.1.1,
- mongoose-validator: ^2.1.0,
- morgan: ~1.9.1,
- node-cache: ^5.1.2,
- passport: ^0.4.1,
- passport-jwt: ^4.0.0,
- passport-local: ^1.0.0,
- rate-limiter-flexible: ^2.1.3,
- split: ^1.0.1,
- swagger-jsdoc: ^6.0.0-rc.5,
- swagger-ui-express: ^4.1.5,
- validator: ^10.11.0,
- winston: ^3.2.1

### devDependencies:

- cross-env: ^7.0.2,
- dotenv: ^8.2.0,
- eslint: ^5.16.0,
- nodemon: ^2.0.4

### engines

- node: 12.x.x
