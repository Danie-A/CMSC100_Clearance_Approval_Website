
# CMSC 100 Lecture - Basic Token-based authentication

## To run:

  1. Make sure your MongoDB server is running
  2. run `npm install` in both backend/ and frontend/ 
  3. run `npm start` in backend/ to start the backend API
  4. run `npm start` in frontend/ to start the ReactJS app


## Packages used:

### Backend API
  1. bcrypt - for encrypting user passord
  2. cookie-parser - for reading cookies sent from the frontend
  3. express - web server framework
  4. jsonwebtoken - for passing tokens between entities
  5. mongoose - Object document mapping between JavaScript and MongoDB

### Frontend (aside from bundled with create-react-app)
  1. react-router-dom - client-side routing for ReactJS apps
  2. universal-cookie - for managing cookies on the frontend

## References:

Browser routers were discussed in the lab but here's a link to the documentation. As well as a link to loader documentation.

react-router 6.4

Browser router: https://reactrouter.com/en/main/routers/create-browser-router
Loader: https://reactrouter.com/en/main/route/loader
