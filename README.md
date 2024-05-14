# Learnify Online Learning Platform Backend

## Environment Variables

Before running the application, ensure you have the following environment variables set:

- `PORT`: The port number on which the application will run.
- `MONGO_URI`: The MongoDB connection string.
- `ACCESS_TOKEN_SECRET`: The secret key used for signing access tokens.
- `REFRESH_TOKEN_SECRET`: The secret key used for signing refresh tokens.

You can create a `.env` file in the root directory of your project with the following content:

PORT=your_port_number
MONGO_URI=your_mongo_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret


Replace `your_port_number`, `your_mongo_uri`, `your_access_token_secret`, and `your_refresh_token_secret` with your actual values.

## Running the Application

To run the application using Docker Compose, use the following command:

```sh
docker-compose up --build
```
This command will build the Docker images and start the containers as specified in your docker-compose.yml file
