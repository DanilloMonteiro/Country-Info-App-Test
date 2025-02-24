<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/>
  </a>
</p>

## Description

Country Info & Calendar App is a backend application built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/) that integrates external APIs to provide detailed country information (such as available countries, borders, flags, and historical population data) and allows users to add national holidays to their personal calendars.

## Project Setup

This project uses PostgreSQL as the database. It also integrates with external APIs:

- **Date Nager API** for country and public holiday data.
- **Countries Now API** for population data and flag images.

### Prerequisites

- Node.js (>= 20)
- npm or yarn
- PostgreSQL

## Installation and Configuration

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DanilloMonteiro/Country-Info-App---Test.git
   cd country-info-app
   ```

   ```bash
   npm install
   ```

# Database configuration

<br>DATABASE_HOST=localhost<br>
<br>DATABASE_PORT=5432<br>
<br>DATABASE_USERNAME=your_db_username<br>
<br>DATABASE_PASSWORD=your_db_password<br>
<br>DATABASE_DB=your_db_name<br>

# External API URLs

DATE_NAGER_BASE_URL=https://date.nager.at/api/v3
POPULATION_API_URL=https://countriesnow.space/api/v0.1/countries/population
FLAG_API_URL=https://countriesnow.space/api/v0.1/countries/flag/images

### Configure TypeORM:

The file data-source.ts is set up to load the connection settings from the .env file using the ConfigModule. Ensure that your PostgreSQL instance is running and accessible with the provided credentials.

### Migrations and Database Setup

This project uses TypeORM migrations to create the necessary tables and seed sample data (including 3 example users).

### Run the migrations:

```bash
npm run migration:up
```

Note: Ensure your database is correctly configured and running before executing migrations.

### Available Routes Countries API

GET -> /countries/available

- Retrieves the list of available countries from the Date Nager API.

GET -> /countries/:countryCode

- Retrieves detailed information for a specific country, including:

- Border countries Flag URL (filtered based on the country code)
- Historical population data (suitable for charting)
- Calendar API

POST -> /users/:userId/calendar/holidays

- Adds national holidays to the calendar of a user.
- Request Body Example:

{
"countryCode": "US",
"year": 2025,
"holidays": ["New Year's Day", "Independence Day"]
}

### Users API

GET -> /users/:id

- Retrieves user details by their UUID.

# Development mode with hot-reloading

npm run start:dev

# Production mode

npm run start:prod

# Resources

<br>NestJS Documentation: https://docs.nestjs.com<br>
<br>Discord Channel: https://discord.gg/G7Qnnhy<br>
<br>NestJS Devtools: https://devtools.nestjs.com<br>
<br>Official Courses: https://courses.nestjs.com/<br>
<br>Jobs Board: https://jobs.nestjs.com<br>

## Support

Country Info & Calendar App is an open source project licensed under the MIT License. Contributions and support are welcome! If you like this project, consider sponsoring us.

### Stay in Touch

- Author: Danillo Monteiro
- GitHub: https://[github.com/DanilloMonteiro/Country-Info-App-Test.git](https://github.com/DanilloMonteiro/Country-Info-App-Test.git)
