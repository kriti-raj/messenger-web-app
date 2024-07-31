
# Messenger Web App

## Introduction
Messenger Web App is a real-time chatting application similar to Facebook Messenger. It features user authentication and hashed password storage to ensure secure communication.
## Demo

[Messenger Web App](https://messenger-web-app.onrender.com/)
## Tech Stack

**Client:** React, TailwindCSS, Daisy UI, Socket.io

**Server:** Node, Express, MongoDB, Redis, Socket.io, JWT, cookie-parser


## Features


- Real-time messaging using Socket.IO
- User authentication with JWT
- Password hashing with bcrypt
- MongoDB for data storage
- Redis for data caching
## Dependencies

The project uses the following major dependencies:

- Vite for the development server and build tool
- React for building the user interface
- Socket.IO for real-time communication
- JWT for authentication
- MongoDB for database management
- bcrypt for password hashing
- Redis for data cahcing
## Deployment

To deploy the Messenger Web App, follow these steps:
1. Clone the repository:
```bash
  git clone https://github.com/kriti-raj/messenger-web-app.git
```
2. Navigate to the project directory:
```bash
  cd messenger-web-app
```
3. Install the dependencies:
```bash
  npm install
```
4. start the development server:
```bash
  npm run dev
```
This will start the server at `http://localhost:5000`. Open your browser and navigate to this URL to see the application in action.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `PORT`
- `MONGO_DB_URI`
- `JWT_SECRET`
- `NODE_ENV`
- `REDIS_PASSWORD`
- `REDIS_HOST`
- `REDIS_PORT`
## Documentation

The project documentation is currently maintained in this README file. For more detailed information on specific topics, please refer to the respective official documentation of the tools and libraries used.

## Examples
To see examples of how to use various features of the Messenger Web App, refer to the source code in the src directory.

## Troubleshooting
If you encounter any issues, please check the following:

Ensure all dependencies are installed correctly by running npm install.
Verify that the development server is running on the correct port (http://localhost:5000).
Check the browser console for any error messages.

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Contributing

We welcome contributions from the community. If you'd like to contribute, please fork the repository and submit a pull request.
## Feedback

If you have any feedback, please reach out to us at 6517kritiraj@gmail.com
