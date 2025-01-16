# Node + TypeScript

`Clone it`: git clone https://github.com/ipdmartins/backend-ts.git

`Intall packages`: npm install

`Run fake DB`: npx json-server db.json (in one terminal)

`Run backend`: npm run dev (in another terminal)

## Directories structure

- **`tests`**: Contains unit tests for the services and other components of the application, ensuring the functionality works as expected.

- **`controllers`**: Includes controllers that handle the incoming HTTP requests, process them, and return responses. They act as the middle layer between routes and services.

- **`entities`**: Contains the core business models or classes that represent the entities in the application (e.g., `User`, etc.).

- **`repositories`**: Responsible for interacting with the data layer. It includes methods for CRUD operations and database communication.

- **`routes`**: Defines the endpoints of the application. It maps incoming HTTP requests to the appropriate controller methods.

- **`services`**: Contains the business logic of the application. It processes data, handles use cases, and interacts with repositories to fetch or persist data.

- **`utils`**: Provides utility functions, helpers, or shared modules, such as configuration for external services (e.g., database connections, email setups).

create a container pg:
sudo docker run -d --name node-postgres-demo -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=test_db_pg -p 5432:5432 postgres
docker-compose up -d : start service
docker ps : list service
psql -h localhost -U myuser -d mydatabase -W or
browser and go to http://localhost:5050 for pgadmin
docker-compose down - stop service
docker-compose down --volumes : to remove volumes
