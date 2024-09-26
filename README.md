# Inventory Management API

A RESTful API built with Node.js and TypeScript to manage a list of items and their locations within a 2D space. This API supports CRUD operations for items and locations.

## :ledger: Index

- [About](#beginner-about)
- [Tech Stack](#-tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
  - [Commands](#package-commands)
- [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [Development Environment](#nut_and_bolt-development-environment)
  - [File Structure](#file_folder-file-structure)
  - [Build](#hammer-build)  
- [API Endpoints](#api-endpoints)
- [Contributing](#cherry_blossom-contributing)
- [License](#lock-license)

##  :beginner: About
This API allows management of items (physical goods, equipment, tools, etc.) and their locations within a 2D space. Locations are identified by x and y coordinates on a graph and can have names. The API supports creating, reading, updating, and deleting both items and locations, as well as moving items between locations.

## 💻 Tech Stack
- Node.js
- TypeScript
- Express.js
- PostgreSQL

## Architecture

This project implements a three-layer architecture, also known as the multitier architecture. This design pattern separates the application into three logical layers:

1. **Presentation Layer (Controllers)**: Handles HTTP requests and responses. It's responsible for parsing incoming request data, calling appropriate service methods, and formatting the response.

2. **Business Logic Layer (Services)**: Contains the core business logic of the application. It processes data, applies business rules, and coordinates between the presentation and data access layers.

3. **Data Access Layer (Repositories)**: Manages data persistence and retrieval from the database. It encapsulates the logic required to access data sources.

This architecture provides several benefits:
- Separation of concerns
- Improved maintainability and testability
- Flexibility to change implementations in one layer without affecting others
- Better organization of code

## Database Schema

The application uses PostgreSQL with the following schema:

```sql
-- Create locations table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    x DECIMAL(10, 6) NOT NULL,
    y DECIMAL(10, 6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Key points:
- The `locations` table stores the name and coordinates (x, y) of each location.
- The `items` table has a foreign key `location_id` referencing the `locations` table, establishing a relationship between items and their locations.
- Both tables include `created_at` and `updated_at` timestamps for tracking record history.
- The `ON DELETE CASCADE` ensures that when a location is deleted, all associated items are also removed.

## :zap: Usage
This section outlines how to use the Inventory Management API.

###  :electric_plug: Installation & Instructions
1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd [your-repo-name]
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your specific configuration, including PostgreSQL database connection details.
   An env.example has been provided in the repository.

5. Set up the database:
   ```
   npx ts-node src/scripts/setupDatabase.ts
   ```
   This will create the necessary tables in your PostgreSQL database.
6. Seeding database:
   ```
   npx ts-node src/scripts/setupDatabase.ts
   ```
   Change the file name in main to seed_data.sql for data seeding. You should be able to view datas and tables creation in PgAdmin4 locally.
   

###  :package: Commands
- To run the project in development mode:
  ```
  npm run dev
  ```
- To build the project:
  ```
  npm run build
  ```
- To run the project in production mode:
  ```
  npm start
  ```

## :wrench: Development

### :notebook: Pre-Requisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- PostgreSQL (v12.0 or later) https://www.w3schools.com/postgresql/postgresql_install.php
- PGAdmin4 : For local database set up: https://www.w3schools.com/postgresql/postgresql_pgadmin4.php

###  :nut_and_bolt: Development Environment
1. Fork and clone the repository.
2. Install dependencies using `npm install`.
3. Set up your local PostgreSQL database and update the `.env.example` file with the connection details.
4. Run the database setup script using `npx ts-node src/scripts/setupDatabase.ts`.
5. Start the development server using `npm run dev`.

###  :file_folder: File Structure
```
src/
├── config/
│   ├── config.ts - Contains configuration files for the application, such as database configurations and environment settings.
│   └── db.ts - Database connection configurations, including setup for database pools.
├── controllers/ - Houses the controller files that handle incoming requests, manage business logic, and interact with services.
│   ├── itemController.ts
│   └── locationController.ts
├── errors/ - Contains custom error classes for structured error handling in the application.
│   ├── HttpError.ts
│   ├── NotFoundError.ts
│   └── ValidationError.ts
├── middleware/ - Contains middleware functions that process requests before they reach the controller or after the response is sent.
│   ├── errorHandler.ts
│   ├── itemSchema.ts
│   ├── locationSchema.ts
│   └── validationMiddleware.ts
├── models/ - Defines the data models for the application, representing the data structure.
│   ├── itemModel.ts
│   └── locationModel.ts
├── repositories/ - Encapsulates data access logic, interacting with the database or data source.
│   ├── itemRepository.ts
│   └── locationRepository.ts
├── routes/ -  Defines the routing configuration, connecting endpoints to their respective controllers.
│   └── itemRoutes.ts
│   └── locationRoutes.ts
├── scripts/ - Contains database scripts and utility scripts for setting up and maintaining the database.
│   ├── delete_table.sql
│   ├── insert_items.sql
│   ├── insert_locations.sql
│   ├── insert_table.sql
│   └── setupDatabase.ts
├── services/ - Contains business logic and services that interact with the repositories and perform operations.
│   ├── itemService.ts
│   └── locationService.ts
└── app.ts
.env
.env.example
.gitignore
package-lock.json
package.json
tsconfig.json
```

### :hammer: Build
To build the project:
1. Run `npm run build`
2. The compiled JavaScript files will be output to the `dist/` directory.

## API Endpoints

### Items
- `GET /v1/api/items`: Get all items
- `GET /v1/api/items/:id`: Get a specific item
- `POST /v1/api/items`: Create a new item
- `PUT /v1/api/items/:id`: Update an item
- `DELETE /v1/api/items/:id`: Delete an item

### Locations
- `GET /v1/api/locations`: Get all locations
- `GET /v1/api/locations/:id`: Get a specific location
- `POST /v1/api/locations`: Create a new location
- `PUT /v1/api/locations/:id`: Update a location
- `DELETE /v1/api/locations/:id`: Delete a location


## :lock: License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
