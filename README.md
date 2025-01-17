# Node + TypeScript + clean architecture

`Clone it`: git clone https://github.com/ipdmartins/backend-ts.git

`Intall packages`: npm install

`Run DB`: docker run -d --name node-postgres-demo -e POSTGRES_PASSWORD=_ -e POSTGRES_USER=_ -e POSTGRES_DB=name -p 5432:5432 postgres -**start service**: docker-compose up -d -**stop service**: docker-compose down

`Run backend`: npm run dev (in another terminal)

## Directories structure

- **`tests`**: Contains unit and integration tests for the services and other components of the application, ensuring the functionality works as expected.

- **`controllers`**: Includes controllers that handle the incoming HTTP requests, process them, and return responses. They act as the middle layer between routes and services.

- **`entities`**: Contains the core business models or classes that represent the entities in the application (e.g., `User`, etc.).

- **`infra`**: Contains the DB connection, routes and typeorm schemas (e.g., `User`, etc.). Routes defines the endpoints of the application. It maps incoming HTTP requests to the appropriate controller methods.

- **`repositories`**: Responsible for interacting with the data layer. It includes methods for CRUD operations and database communication.

- **`services`**: Contains the business logic of the application. It processes data, handles use cases, and interacts with repositories to fetch or persist data.

- **`utils`**: Provides utility functions, helpers, or shared modules, such as configuration for external services (e.g., database connections, email setups).
