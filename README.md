### Technologies Used
- `Reactjs` client and `Nodejs` server with `Apollo-GraphQL` API for data exchange
- `Sequelize` ORM connected to a `SQLite` database
- `Bootstrap` for UI components
- `Jest` for testing

### Running the project
- start two shells in the main folder (Konf)
- `cd server` then `npm install` then `npm start`
- `cd client` then `npm install` then `npm start`
- go to `http://localhost:3000` in your browser

### Running Tests
- `cd server` then `npm test`
tests are written in `server/src/test.js`

### Areas to improve
- Add validations for form inputs
- Reformat and resize uploaded photos for less space consumption and more consistant app display
- If user uploaded multiple photos sequentially, only keep last one
- Display feedback messages and improve user experience
- Write more tests on both client and server
